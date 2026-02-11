# Portfolio Development Instructions: Ishini Dilhara Gunasinghe

This document provides the full structural and technical requirements to build a professional portfolio matching the provided design screenshots and CV data.

## 1. Project Visual Identity

* **Theme:** Warm Professional / Legal Minimalist.
* **Background:** `#FAF3EE` (Light Cream) with a soft radial gradient.
* **Card Style:** Pure white background, high border-radius (`30px`), soft outer shadow, and subtle internal padding.
* **Typography:**
    * **Headings:** 'Playfair Display' (Serif) – Color: `#4A3728`.
    * **Body Text:** 'Poppins' or 'Inter' (Sans-serif) – Color: `#7D6E63`.
* **Icons:** Use Map-pin/Location icons for Education and Experience sections as seen in screenshots.

---

## 2. Page Structure & Components

### A. Navigation Bar (Sticky)

* **Logo:** Brown rounded button with "Ishu" in white text.
* **Links:** Experiences, Projects, Research, Educations, Certificates, Activities, Skills, Contact.
* **CTA Button:** Rounded "Next" button in the top right corner.

### B. Hero Section

* **Layout:** Two-column flex.
* **Visuals:** Circular profile picture with a thick bronze border (`#8B5E3C`).
* **Text:**
    * "Hey I'm **Ishini Dilhara**"
    * "I'm a **Law Graduate**" (Use a gold/bronze underline or highlight).
* **Socials:** Neumorphic white circular buttons for LinkedIn, Instagram, and Facebook.
* **CTA:** "Download CV" button with a soft shadow.

### C. About Section

* **Style:** Clean text block with a "— Ishini Dilhara" signature at the bottom.
* **Content:** LL.B (Hons) Graduate summary highlighting passion for justice and ethical practice.

### D. Experiences & Education (Icon-Card Layout)

* **Style:** Horizontal cards with a large location-pin icon in a light-cream square on the left.
* **Experiences:**
    * **Lawyers Office Complex (Kandy):** Legal Extern (Oct 2024).
    * **Legal Draftsman's Department (Colombo):** Legal Intern (July - Aug 2025).
* **Education:**
    * **LL.B (Hons):** University of Peradeniya (2021-2025).
    * **G.C.E. A/L:** Arts Stream (3A) - C.W.W. Kannangara Central College (2019).
    * **G.C.E. O/L:** (8A & 1B) - C.W.W. Kannangara Central College (2016).

### E. Extra-curricular Activities (Tag System)

* **Layout:** 3 or 4 column grid of white cards.
* **Feature:** Use dual tags at the top of each card:
    * **Tag 1 (Brown):** Category (e.g., Society, Association, Club, School Club).
    * **Tag 2 (Dark Grey):** Role (e.g., Secretary, Junior Treasurer, Editorial Writer, Leader).
* **Data:** Include dates (e.g., Dec 2023 - Jan 2025 for Secretary role).

### F. Projects & Research

* **Style:** Wide white cards with bold headings.
* **Community Project:** Focus on "Right to Employment of Persons with Disabilities".
* **Field Research:** Focus on "Cyber Harassment and Legal Awareness".

### G. Skills Section

* **Layout:** Three distinct vertical white cards.
* **Card 1:** Legal & Academic Skills (Research, Writing, Drafting).
* **Card 2:** Organizational & Professional (Team collaboration, Time management).
* **Card 3:** Technical & Soft Skills (MS Office, Digital research, Adaptability).

---

## 3. Technical Implementation

* **Tailwind Config:** Define custom colors `bg-cream: #FAF3EE`, `text-brown: #4A3728`, and `accent-gold: #8B5E3C`.
* **Three.js Background:** Add a `canvas` with a `PointsMaterial` particle system to create a floating "dust" effect that moves with the mouse to add depth to the cream background.
* **Animations:** Use **TexeJS** or standard **Intersection Observer** to trigger a "slide-up" animation as each card enters the viewport.