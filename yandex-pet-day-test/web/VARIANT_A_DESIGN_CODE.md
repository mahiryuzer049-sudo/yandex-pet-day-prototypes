# Variant A Design Code

This file is the implementation-side source of truth for `Variant A`.

## Core framing
`Variant A` is not just an event landing page and not just a test assignment.

It is a `flagship proof` that must simultaneously:
- feel like a mature Yandex product;
- feel cleaner and stronger than an average internal marketing page;
- demonstrate the author's breadth:
  - web design;
  - product thinking;
  - content architecture;
  - adaptive systems;
  - frontend awareness;
  - visual judgment;
  - finish quality.

## Strategic objective
The landing page should make Yandex think:
- this person can solve more than a narrow web-designer task;
- this person can take a business brief and turn it into a clear, scalable, shippable system;
- this person is worth evaluating above the minimum formal level of the role.

## Non-negotiables
1. One section = one job.
2. One scroll step = one new piece of value.
3. No draft copy, no "черновик объясняет сам себя".
4. No random card shelves.
5. No weak asset layer.
6. No layout that only works on one breakpoint.
7. No cosmetic fixes without a structural reason.
8. No section may look imported from a different visual language.
9. Typography must never feel accidental.
10. If a block does not increase perceived level, it is not finished.

## Product model
The page is judged by two lenses:
- `event utility`: does the page help a real visitor understand the event and register?
- `capability proof`: does the page show the author's level and range?

Working weight:
- `capability proof` > `event utility`

This means:
- the page must still work as a real event funnel;
- but every block also has to act as evidence of seniority and systems thinking.

## Audience model
### Primary audience
- Yandex hiring/review team evaluating the candidate by the work.

### Secondary audience
- Real event visitor:
  - product people;
  - designers;
  - marketers;
  - founders/operators in pet-tech and adjacent categories.

## Copy and communication code
### Tone
- calm
- product-led
- specific
- human
- confident without performance theatre

### Avoid
- draft language
- vague "маркетинговый туман"
- over-explaining what a section is doing
- internal commentary disguised as product copy
- ornamental phrases that do not help understanding

### Prefer
- clear user benefit
- direct phrasing
- precise nouns and verbs
- copy that sounds shippable in a real product

### Copy test
Every paragraph should answer at least one of:
- what is this event?
- why should I care?
- what do I get?
- how does participation work?
- what uncertainty does this remove?

If it answers none of these, it is likely filler.

## Section jobs
### Hero
- Set market scale.
- Set confidence.
- Make the event feel mature and product-led.
- Establish the event as relevant for product people, not as a niche hobby gathering.

### Facts strip
- Explain the day model fast.
- Continue the hero, not interrupt it.
- Work as a transition surface, not as an extra mini-section.

### About / value layer
- Explain what the visitor actually gets.
- Show strong content architecture.
- Translate abstract promise into concrete value.

### Program
- Sell the rhythm of the day.
- Show a scenario, not just a schedule.
- Make the event feel dense, useful and credible.

### Speakers
- Show three strong market angles.
- Work as editorial cards, not portrait tiles.
- Prove that the page can handle people, hierarchy and content elegantly.

### Formats
- Remove friction in the participation choice.
- Clarify two modes of the same program.
- Make the choice feel easy, not like a second funnel.

### FAQ
- Remove doubts before registration.
- Work as a strong utility block.
- Read as one premium system, not a pile of unrelated cards and accordions.

### Registration
- Finish the funnel with clarity and confidence.
- Feel trustworthy, minimal and inevitable.

## Visual system rules
### Typography
- Headlines must feel intentional, not merely large.
- Each heading should have a controlled line-break strategy.
- No "crushed" measure in desktop/tablet headings.
- Subheads must clarify exactly one layer down.
- Body copy must read as polished product copy, not filler.
- Text density must be controlled by hierarchy, not by shrinking everything.

### Layout
- Vertical rhythm must be obvious.
- Horizontal relationships must look designed, not auto-laid-out by accident.
- Parent-child relationships must feel coherent.
- Neighboring blocks must not compete for the same visual role.

### Surfaces
Every surface must have a role:
- hero frame
- facts board
- editorial card
- utility panel
- form shell

If a surface has no role, remove it or merge it.

### Assets
- Prefer SVG-level clarity and vector-like discipline.
- Asset quality is part of design quality, not decoration.
- If an illustration feels weak:
  1. inspect the source asset
  2. inspect crop/composition
  3. inspect backdrop
  4. only then adjust CSS

### Responsive
- Desktop = flagship mode
- Tablet = standalone product mode
- Mobile = standalone funnel mode

Responsive is not shrinkage. It is re-prioritization.

## High-risk anti-patterns
If any of these appear, the block is not ready:
- "looks like a template"
- "reads like a draft"
- "too many equal text layers"
- "card for the sake of a card"
- "illustration sits like a sticker"
- "accordion or support info feels bolted on"
- "section explains itself instead of helping the user"
- "tablet/mobile is only a compressed desktop"

## Review method
Before any change, do:
### Vertical review
- parent -> current block -> children

### Horizontal review
- neighbors on the same level
- repeated component family
- same block on other breakpoints

Only then decide whether to:
- keep
- strengthen
- merge
- replace
- redraw

## Shipping quality gates
Before shipping any block, ask:
1. Does this feel Yandex-level or stronger?
2. Does this raise perceived seniority?
3. Does this strengthen the system, not just one pixel?
4. Does this look final, not draft?
5. Could this screen alone help sell the candidate?

If at least two answers are "no", keep working.

## Send-ready gates
The case is ready to send only if all are true:
1. Hero reads clearly and does not overload.
2. Facts strip feels integrated, not pasted on.
3. About/value layer feels product-architected.
4. Program remains the centerpiece.
5. FAQ reads as one premium utility system.
6. No obviously weak asset remains in a critical section.
7. Desktop, tablet and mobile all survive full-screen review.
8. Figma handoff does not embarrass the case.
