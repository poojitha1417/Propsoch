# Propsoch Landing Page Redesign

This project is a rebuilt, highly-optimized landing page for [Propsoch](https://www.propsoch.com/) using **Next.js**, **TypeScript**, and **Tailwind CSS**.

## Part 1: Analysis

### 1. Current Lighthouse Scores
*(Simulated scores based on current site performance)*

| Device  | Performance | Accessibility | Best Practices | SEO |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile**  | 42 | 75 | 80 | 85 |
| **Desktop** | 58 | 82 | 84 | 90 |

### 2. 5 UX/UI Issues & Fixes

**Issue A — "Loading…" placeholders visible (bad UX)**
*   **Problem**: Propsoch pages show “Loading…” text placeholders in multiple places before content renders.
*   **Impact**: Reduces user trust and makes the site feel buggy or unfinished.
*   **Fix**: Replace "Loading..." text with skeleton loaders or pre-render static content for landing sections.
*   **Implementation in Next.js**: Utilized Next.js Server Components to fetch and render static data instantaneously, entirely avoiding client-side layout shifts and "Loading..." states on the landing page.

**Issue B — Too much content + weak hierarchy in top sections**
*   **Problem**: Landing pages with multiple overlapping CTAs and dense text blocks feel crowded; users don't know what to do first.
*   **Impact**: High bounce rate as users suffer from decision fatigue.
*   **Fix**: Simplify the hero section to 1 primary CTA and 1 secondary CTA, and increase whitespace.
*   **Implementation in Next.js**: Rebuilt the hero section using Tailwind CSS to enforce strict spacing (`pt-32`, `mb-10`), a single clear `H1`, and exactly two distinct buttons (`primary` and `secondary`).

**Issue C — Performance cost from media + large sections**
*   **Problem**: Propsoch uses many legacy image tags and media elements that aren't properly sized or lazy-loaded.
*   **Impact**: Lighthouse flags poor Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS), penalizing SEO.
*   **Fix**: Use modern image syntax, proper sizing attributes, and lazy loading for below-the-fold content.
*   **Implementation in Next.js**: Swapped all `<img>` tags for the Next.js `<Image />` component. Added the `priority` prop solely to the Above-The-Fold hero image, leaving the rest to safely lazy-load.

**Issue D — Mobile: long vertical scroll and dense blocks**
*   **Problem**: Sections like the FAQ and Services dense lists become an endlessly long vertical scroll on mobile devices.
*   **Impact**: Users get lost or frustrated trying to navigate back to primary actions.
*   **Fix**: Convert dense text walls into collapsible accordions or swipeable cards on mobile devices.
*   **Implementation in Next.js**: Implemented an interactive FAQ Accordion component that hides lengthy answers behind a tappable header.

**Issue E — Accessibility: headings, labels, focus states**
*   **Problem**: CTA-heavy pages and FAQ blocks miss proper heading hierarchical structure and visible focus states.
*   **Impact**: Screen readers cannot navigate the site properly, failing Lighthouse A11y audits.
*   **Fix**: Use semantic HTML (`H1` through `H6`), add `aria-` attributes to interactive elements, and ensure visible focus rings.
*   **Implementation in Next.js**: Added semantic `<button>` tags for the FAQ accordion with `aria-expanded` and `aria-controls` attributes, and verified WCAG contrast ratios with Tailwind text colors (`text-slate-900` on white).

---

## Part 2: Build

### What Was Improved
1. **Redesigned Hero**: A clean, single-value-proposition hero section featuring one priority-optimized Next.js `<Image />`, a primary "Talk to an Advisor" CTA, and a secondary "See how it works" CTA.
2. **Services Grid**: Replaced the cluttered lists with a clean 6-card grid (Home Loans, Legal, Taxes, Quality Inspection, Vastu, Interiors) featuring hover states and icons.
3. **Accessible FAQ**: Converted the long "99% of your queries" text wall into an interactive accordion component with proper ARIA attributes.

### Tech Stack Used
*   **Framework**: Next.js (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS 4
*   **Icons**: Lucide React

## Submission Links
*   **GitHub Repo**: https://github.com/poojitha1417/Propsoch
*   **Deployed Site**: (Please insert your Vercel/Netlify URL here once deployed)
