# Design Philosophy — Ramirez Hospitality Group

> Three approaches were sketched. The chosen direction is **The Reserve** (Approach 1). Approaches 2 and 3 are documented for future reference.

---

## Chosen — *The Reserve* (Emerald Reserve, dark members-club editorial)

**Design Movement.** Editorial Art Deco meets contemporary luxury hospitality. Reference points: David Collins Studio interiors (Fontainebleau, Claridge's bar), the magazine layouts of *Cereal* and *Drift*, the brand systems of Aman, The Carlyle, and 1 Hotels. Dark mode treated as the default, not a toggle.

**Core Principles.**
1. **Authority through restraint.** Quiet confidence beats noise. Generous space. No more than two voices on screen at once.
2. **Editorial cadence.** The site reads like a hospitality monograph — sections feel like turning pages, not scrolling.
3. **Materials, not just colors.** Brass, walnut, marble, and emerald green are surfaces. Wherever a flat color lives, a subtle material texture is layered over it.
4. **Conversion as hospitality.** Every CTA reads as an invitation, not a demand. "Reserve a Free Audit." "Begin the Conversation." "Step Inside."

**Color Philosophy.**
A near-black obsidian foundation makes the brass and emerald feel like jewelry. Cream is used sparingly — only for body text and one signature accent line — so it carries weight when it appears. The emerald shifts between deep velvet (`#0E3A2F`) for backgrounds and a glimmer green (`#1B5C49`) for hovers. Champagne gold (`#D4B062`) is the brand line — used for hairlines, monogram, and pull-quote opens.

| Token | Value | Use |
|---|---|---|
| Obsidian | `#0A0A0A` | Page background, page footer |
| Deep Emerald | `#0E3A2F` | Section backgrounds, cards, panels |
| Glimmer Green | `#1B5C49` | Hovers, active states |
| Champagne Gold | `#D4B062` | Brand mark, hairlines, pull-quote opens, accents |
| Oak Walnut | `#4A2E1E` | Wood-grain texture overlays, divider blocks |
| Champagne Cream | `#EFE4C9` | Body copy on dark, card body text |
| Bone | `#F5EFE0` | Off-white reserved for one signature module |

**Layout Paradigm.** Asymmetric editorial. Left-rail brand monogram on desktop. Hero uses a 12-column grid where the type takes 7 columns and the image takes the remaining 5 — the type is anchored to the left rule, not centered. Section transitions are not centered cards — they alternate between a full-bleed image module, a two-column type-on-color module, and a numbered list module that recalls the table of contents in a printed magazine.

**Signature Elements.**
1. **The Brass Hairline.** A single 1px champagne-gold line, often offset to a section break or used as a left rule beside small caps labels. It is the brand's signature mark.
2. **Material Texture Overlays.** Subtle walnut wood grain and brushed brass, applied at 6–10% opacity over emerald and obsidian backgrounds. Sections literally feel like rooms made of materials.
3. **Numbered Roman Markers.** Sections are marked with small-caps roman numerals (I, II, III) styled as if from a hotel's printed brand book.

**Interaction Philosophy.** Slow, confident, never bouncy. Hover states glow rather than shift. Buttons get a thin brass underline that draws on hover. Cards lift 4px on hover with a soft shadow that warms slightly. Links never use a generic underline — they use a champagne-gold hairline.

**Animation.**
- Page entrance: type fades in from 8px below over 600ms with a staggered delay between word-blocks and images.
- Section reveals: 5% scale-in on images, 200ms fade on type.
- Marquee for the property logos strip — slow continuous left-scroll, 60s loop.
- A single dramatic moment: the Free Audit CTA section uses a parallax shift on its emerald background as the section enters viewport.

**Typography System.**
- **Display:** *Playfair Display* — used for H1 and H2 only. Weights 400 and 700. Tight letter-spacing on H1.
- **Body:** *Inter* — used for body copy, navigation, captions. Weights 400, 500, 600.
- **Eyebrow / small caps:** *Inter* uppercase, 10–12px, letter-spacing 0.2em — used for section labels ("I · The Method," "II · The Subscription").
- **Pull quotes:** *Playfair Display Italic* in champagne-cream, 28–36px.
- Hierarchy: H1 64–96px / H2 40–56px / H3 24–28px / Body 16–18px / Eyebrow 10–12px.

---

## Rejected — *Approach 2: Desert Sun*
A warmer, more lifestyle-forward approach using sand, terracotta, and brass. Probability 0.06. Rejected because the audience (investors, asset managers, owner-operators) responds better to dark-mode authority than to lifestyle warmth.

## Rejected — *Approach 3: Civic Modern*
A Swiss-inspired editorial system in cream, charcoal, and a single olive accent. Probability 0.04. Rejected because it lacks the sensory richness Adam wants ("elements should feel like areas of cool hotel rooms").

---

## Style reminder for every component file

> **Ramirez Hospitality Group — The Reserve**
> Dark mode default. Obsidian / Emerald / Brass / Walnut / Cream. Playfair Display + Inter. Brass hairlines. Material texture overlays. Asymmetric editorial layouts. Slow confident motion. Eyebrow labels in small caps with roman numerals. Conversion as hospitality.
