# Notification Prioritization Engine

## Overview
A high-throughput, low-latency system designed to classify incoming notifications into `Now`, `Later`, or `Never` to prevent alert fatigue, handle duplicate events, and respect user preferences and global rules.

## High-Level Architecture

1. **Ingestion API (Gateway)**: A fast lightweight service (e.g., FastAPI/Go) that receives events, validates payloads, and pushes them into the rules evaluation pipeline.
2. **State Store (Redis)**: Extremely low-latency KV store used for deduplication keys, counting recent notifications (alert fatigue caps), and caching user preferences.
3. **Core Rules Engine**: The central worker that executes the Now/Later/Never classification logic without querying the main database on the critical path.
4. **Data Store (PostgreSQL)**: The source-of-truth for user preferences, global frequency rules, and detailed decision audit logs.
5. **Message Broker (Kafka / RabbitMQ)**: 
   - **Delivery Topic**: For notifications classified as `Now`.
   - **Delay/Retry Queue**: For notifications classified as `Later`.
6. **Delivery Service / Push Workers**: Consumers that actually dispatch webhooks, emails, SMS, or pushes. If delivery fails or is rate-limited externally, it can requeue to `Later`.

## Data Flow
```text
[Downstream Services] --> (Ingestion API) --> (Rules Engine)
                                                |--> [Redis] (Dedupe check, Rate Limit check)
                                                |--> [PostgreSQL] (Audit log write - Async)
       |--> If 'Never' -> Discard (Audit logged)
       |--> If 'Now'   -> [Message Broker: Delivery Queue] -> (Delivery Workers) -> [User]
       |--> If 'Later' -> [Message Broker: Delay Queue] ---> (Delay Workers) --+
                                     ^                                         |
                                     +---- (Re-evaluated when delay expires) <-+
```

## Decision Logic Strategy (Now / Later / Never)

The decision engine runs a strict funnel of rules:
1. **Deduplication (Exact & Near)**: 
   - Check if `dedupe_key` exists in Redis (TTL = 24h). 
   - If missing, generate a hash of `user_id + event_type + message`.
   - Result: `Never` (Reason: Duplicate).
2. **Hard Suppressions (Opt-outs & Quiet Hours)**:
   - Does the user have "Do Not Disturb" (DND) active?
   - Has the user disabled this `event_type`?
   - Result: `Never` or `Later` (Schedule for morning if DND).
3. **Priority Overrides**:
   - Is `priority_hint` == `urgent`?
   - Result: `Now` (Bypass fatigue caps).
4. **Alert Fatigue / Rate Limiting**:
   - Check Redis counters for the user (e.g., max 3 notifications / hour).
   - If capped out: Result: `Later` (defer until next hour).
5. **Contextual & Configurable Rules**:
   - E.g., Promotional messages during working hours are deferred.
6. **Expiration Check**:
   - If `expires_at` is present and we decided `Later`, is the deferral time > `expires_at`? If so -> `Never`.

## Duplicate Prevention Approach
- **Exact**: Primary reliance on the `dedupe_key` provided by the downstream service. Stored in Redis `SETNX` with a 24-48 hour TTL.
- **Near-Duplicate**: If `dedupe_key` is unreliable, the system generates a surrogate key using `MD5(user_id + event_type + lowercase(alphanumeric_only(message)))`. This catches identical content sent multiple times. For similar semantic content, a fast locality-sensitive hash (LSH) or short text embedding could be used asynchronously, but simple text normalization is best for low-latency limits.

## Alert Fatigue Strategy
We implement a **Token Bucket** or **Sliding Window** rate limit per user in Redis:
- **Global Cap**: Max 10 messages per day per user.
- **Channel Cap**: Max 2 pushes per hour.
- **Batching/Digest**: If a user hits their cap, subsequent non-urgent notifications are routed to a `digest_queue`. A nightly cron job aggregates these into a single "Daily Summary" email, transforming multiple `Later` events into one `Now` digest.

## Fallback Strategy (When AI / Services are unavailable)
- **Degraded Mode**: If Redis is down, we operate on a "Fail Open for Critical, Fail Closed for Promo" strategy. 
- **Timeouts**: The rule engine enforces a strict 50ms timeout for external preference fetches. 
- **Static Configurations**: We maintain an in-memory fallback cache of global default rules (loaded at startup) to ensure we can still prioritize even if PostgreSQL goes down.

## Metrics & Monitoring
- **Volume Metrics**: Events Ingestion Rate, Decision Breakdown (Count of Now/Later/Never), Delivery Latency.
- **System Health**: Redis hit/miss ratios, PostgreSQL write latency for audit logs, API p99 latency (< 100ms goal).
- **Business Metrics**: User unsubscription rate (helps measure if alert fatigue strategy is working), Deduplication drop percentage.

## AI-Native Enhancements Roadmap
To evolve this rules-based engine into a fully AI-native system, the following architectural upgrades can be implemented:

1. **Semantic Deduplication via Vector Embeddings**
   - *Current*: `MD5` hashing catches exact string matches.
   - *AI-Native*: Embed incoming notification text using lightweight models (e.g., `text-embedding-3-small` or local `all-MiniLM-L6-v2`) and store them in a vector database (e.g., Pinecone, Qdrant, or `pgvector` in PostgreSQL). Calculate cosine similarity against recent events to drop semantically identical alerts (e.g., "Server is down" vs "The server has crashed").
   
2. **Predictive Delivery Timing (ML Inference)**
   - *Current*: Hardcoded Optimal Business Hours (10:00 - 20:00).
   - *AI-Native*: Train a predictive model on the `audit_logs` and historical engagement data (when did the user click/read?) to predict the optimal minute to send a `Later` notification. Pass the timestamp back to the Message Broker delay queue.

3. **Dynamic Alert Fatigue Thresholds**
   - *Current*: Static cap of 10 messages per day.
   - *AI-Native*: Implement an anomaly detection algorithm that watches a user's engagement rate. If they ignore 5 notifications in a row, the AI agent automatically lowers their daily cap to 3 to prevent churn.

4. **Context-Aware Priority Scoring (LLM Evaluation)**
   - *Current*: Relies on upstream services sending `priority_hint = "urgent"`.
   - *AI-Native*: For events lacking a priority hint, utilize a fast, small LLM (e.g., Llama 3 8B) to infer the urgency and tonality of the `message` content in real-time before making a Now/Later/Never decision.
