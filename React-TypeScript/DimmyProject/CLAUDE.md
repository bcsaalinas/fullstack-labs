# CLAUDE.md

## Project Name

Dimmy

## Project Overview

Dimmy is a savings-goal app that helps users save money for things they actually want to buy.

Example:

A user wants to buy a new phone by the end of the year.
They enter:

- the goal name
- the target cost
- the target date
- the amount they already have saved

Dimmy helps the user understand where they stand, how much is left, and what action they should take next.

Dimmy is not just a money tracker.
Dimmy is a focused product that helps users turn a desired purchase into a clear, achievable savings goal.

The product should help users feel:

- clear about their goal
- aware of their progress
- motivated to continue
- calm about money
- focused on the next action

---

## Claude's Role in This Project

Claude is only allowed to help with UI/UX and visual design-related work.

Claude may help with:

- visual design
- page layout
- spacing
- typography
- color usage
- component appearance
- microcopy
- UX flows
- onboarding screens
- empty states
- loading states
- error states
- accessibility improvements
- responsive design
- dashboard presentation
- landing page structure
- interaction design
- design polish

Claude must NOT:

- change business logic
- define app architecture
- restructure the codebase
- modify state management
- change types, interfaces, models, schemas, or validation logic
- invent backend behavior
- move files around
- redesign the internal structure of components, hooks, services, or folders
- make architectural decisions unless explicitly asked

Important:

The user is in charge of the logic, structure, and implementation architecture.
Claude is acting only as a UI/UX design assistant.

If a request touches logic or architecture, Claude should avoid modifying it and stay focused on the design layer.

---

## Core Product Intent

Every design decision should support this question:

> What does the user need to do next to get closer to buying their goal?

Dimmy should help the user:

1. create a savings goal quickly
2. understand how much the goal costs
3. understand how much they have already saved
4. understand how much is still missing
5. understand the time left until the target date
6. stay motivated through visible progress
7. take the next useful action

The UI should reduce friction and make progress feel obvious.

---

## Product Personality

Dimmy should feel:

- simple
- intentional
- warm
- focused
- personal
- useful
- polished
- calm
- slightly expressive, but never distracting

Dimmy should NOT feel:

- generic
- loud
- overly corporate
- overly playful
- childish
- gimmicky
- cluttered
- like a fake fintech dashboard
- like a trendy template

The design should feel like it has personality, but the personality must never get in the way of usability.

---

## Design Philosophy

Dimmy should look well-designed because it is clear, structured, useful, and tasteful.

Do not rely on visual gimmicks to make the app feel designed.

Avoid:

- excessive gradients
- neon colors
- purple/pink startup gradients
- glassmorphism overload
- random floating blobs
- overdecorated cards
- unnecessary illustrations
- noisy dashboards
- excessive charts
- visual elements that do not help the user act

Use:

- strong hierarchy
- simple composition
- intentional spacing
- readable typography
- restrained color
- clear calls to action
- calm surfaces
- focused layouts

The design should guide the user toward the main task: saving money for a specific goal.

---

## Visual Direction

Dimmy should have a minimal but memorable visual identity.

The interface should be clean and simple, but not sterile.
It should feel personal and slightly unexpected through its color palette, spacing, and small details.

The design should balance:

- minimal product clarity
- warm personality
- focused action
- subtle expressiveness

The UI should not feel overly safe or generic.
It should have a distinct mark, but in a controlled way.

---

## Color Palette Direction

Use a warm, earthy, slightly unusual palette.

The palette should include:

- earthy brown
- soft dusty pink
- warm sand / beige
- light stone / off-white
- vivid red used only as a tiny accent

### Suggested Color Roles

#### Light Stone / Off-white

Use for:

- main app background
- large surfaces
- page backgrounds
- form backgrounds
- neutral spacing areas

This color should make the product feel clean and calm.

#### Warm Sand / Beige

Use for:

- secondary surfaces
- cards
- soft containers
- subtle empty states
- progress backgrounds
- quiet UI zones

This color should add warmth without making the interface heavy.

#### Earthy Brown

Use for:

- primary text
- brand wordmark
- important headings
- icons
- some borders
- secondary UI accents

This should give the app a grounded, premium, human feel.

#### Dusty Pink

Use as the main signature accent.

Use for:

- primary buttons
- selected states
- active navigation
- progress highlights
- important numbers
- focused form states
- key interactive elements

Dusty pink should make the interface feel recognizable and personal, but it must be used with restraint.

#### Vivid Red

Use only as a micro-accent.

Use for:

- notification dots
- tiny decorative marks
- subtle warning or attention moments, if needed

Do not use vivid red as the main brand color.
Do not let red dominate the interface.

### Color Rules

- Do not use loud gradients.
- Do not use purple gradients.
- Do not make the interface neon.
- Do not use too many accent colors at once.
- Use pink intentionally, not everywhere.
- Keep enough neutral space around colorful elements.
- Make sure text contrast is readable.
- Color should support action and hierarchy.

---

## Decorative Details

Dimmy may use small decorative details, but they must be extremely restrained.

Allowed:

- tiny star marks
- small hand-drawn style lines
- subtle dots or texture
- small abstract marks
- light scribble accents
- minimal expressive details around empty states or goal success moments

Avoid:

- cactus illustrations
- large mascots
- large decorative drawings
- busy backgrounds
- decorative elements that compete with the UI
- visuals that make the app feel like a themed novelty product

Decorative details should feel like a small personal signature, not the main design idea.

---

## Typography

Typography should be modern, clean, and highly readable.

Use typography to create hierarchy through:

- font size
- weight
- spacing
- contrast
- alignment

Savings numbers, remaining amount, target cost, and progress percentage should be immediately scannable.

Headings should feel confident.
Body text should feel calm and clear.
Labels should be subtle but readable.

Avoid overly playful fonts.
Avoid overly futuristic fonts.
Avoid typography that hurts readability.

---

## Spacing and Layout

Spacing should be generous and intentional.

Prefer:

- clean sections
- clear grouping
- repeated spacing patterns
- strong alignment
- breathing room
- simple visual rhythm

Avoid:

- cramped layouts
- too many nested containers
- excessive card stacking
- unnecessary dividers
- dense dashboard clutter

Every screen should make the most important action obvious.

---

## Cards and Surfaces

Cards should be used only when they help organize information.

Use cards for:

- goal summaries
- goal details
- form sections
- progress panels
- helpful context blocks

Avoid “card soup.”

A card should have a purpose.
If a card does not make information clearer, remove it or simplify it.

Surfaces should feel:

- soft
- clean
- lightly structured
- warm
- calm
- premium through restraint

---

## Buttons and Actions

Primary actions should be visually obvious.

Examples:

- Create Goal
- Add Savings
- Update Progress
- View Goal
- Save Goal

Primary buttons can use dusty pink.
Secondary buttons should be more restrained.

Button text should be direct and action-oriented.

Avoid vague CTAs like:

- Continue
- Next
- Submit

Unless the context makes the action completely clear.

---

## UX Principles

### 1. Clarity First

The user should instantly understand:

- what they are saving for
- how much it costs
- how much they have saved
- how much is left
- when they want to buy it
- what they should do next

### 2. Focused Action

Every important screen should have one obvious primary action.

The UI should not overwhelm the user with too many choices.

### 3. Motivation Through Progress

Progress should feel satisfying but mature.

Use:

- progress bars
- percentages
- saved vs remaining values
- target date context
- weekly or monthly saving hints
- milestone moments

Avoid childish gamification.

### 4. Calm Money Experience

Money can create stress.
The product should reduce anxiety by making the situation clear.

Use calm language, clear layouts, and honest progress indicators.

### 5. Simplicity Over Feature Clutter

Do not add charts, widgets, or extra sections just to make the UI feel full.

If something does not help the user understand, decide, or act, it should be removed or minimized.

---

## Main Screen Priorities

### Dashboard / Home

The dashboard is the most important screen.

It should show:

- the user's most important active goal
- current saved amount
- remaining amount
- target cost
- target date
- progress percentage
- recommended next action
- secondary goals only if they do not distract

The primary goal should have clear visual priority.

The dashboard should make the user think:

> I know where I stand, and I know what to do next.

### Goal Creation Flow

The goal creation flow should be quick and focused.

The user should enter:

- goal name
- goal cost
- target date
- current saved amount

The flow should feel encouraging and low-friction.

Avoid making goal creation feel like filling out a bank form.

### Goal Detail Screen

The goal detail screen should make progress feel real.

Show:

- goal name
- target amount
- saved amount
- remaining amount
- target date
- progress visualization
- suggested saving pace
- next action

This screen should be calm, clear, and motivating.

### Add Savings Flow

Adding savings should be extremely fast.

The user should be able to add money with minimal friction.

Use:

- a clear amount input
- quick amount chips if useful
- one obvious primary button
- clean confirmation feedback

### Empty States

Empty states should guide action.

Good empty-state direction:

- “Create your first savings goal”
- “Start with something you actually want to buy”
- “Set the amount, deadline, and what you already have saved”

Avoid generic empty states like:

- “No data”
- “Nothing here”
- “No goals found”

---

## Microcopy Tone

Microcopy should be:

- clear
- calm
- direct
- slightly warm
- useful
- human

Avoid:

- cringe motivational quotes
- fake hype
- corporate finance language
- childish copy
- excessive jokes
- overexplaining

Good Dimmy copy should help the user feel oriented and capable.

---

## Accessibility

All design work should consider:

- readable contrast
- clear focus states
- accessible labels
- large enough tap targets
- keyboard-friendly interactions when relevant
- not relying only on color to communicate meaning
- readable type sizes
- mobile usability

Color choices must not reduce accessibility.

---

## Responsive Design

Dimmy should feel intentional on both mobile and desktop.

Mobile should not be an afterthought.

Designs should adapt cleanly across:

- mobile
- tablet
- desktop

The core action should remain obvious at every breakpoint.

---

## Claude's Default Working Behavior

When asked to design or improve UI for Dimmy, Claude should:

1. identify the screen's main purpose
2. identify the user's most important next action
3. organize the layout around that action
4. use the Dimmy color palette intentionally
5. preserve simplicity and usability
6. avoid touching logic or architecture
7. propose only UI/UX changes unless explicitly asked otherwise

Before proposing changes, Claude should think:

- What is the main action?
- What information matters most?
- What can be removed?
- What should be visually emphasized?
- Does the design help the user save toward a goal?
- Is the personality subtle or distracting?

---

## Hard Constraints

Claude must respect these constraints:

- Do not use purple gradient startup styling.
- Do not use loud gradients.
- Do not make the UI neon.
- Do not overdecorate the interface.
- Do not use cactus illustrations or cactus branding.
- Do not turn the app into a themed novelty design.
- Do not prioritize aesthetics over usability.
- Do not touch business logic or architecture.
- Do not restructure files, types, components, services, or folders unless explicitly asked.
- Do not add unnecessary charts, widgets, or dashboard clutter.
- Do not make the product visually noisy.

---

## Summary

Dimmy should look like a product with taste and restraint.

It should be:

- beautiful through simplicity
- memorable through color
- clear through hierarchy
- motivating through visible progress
- warm without being distracting
- useful before being decorative

The design must always help the user do the thing the app exists for:

save money for something meaningful and actually reach that goal.
