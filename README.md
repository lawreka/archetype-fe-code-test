# Survey Builder and Viewer Task

## Introduction

At **Archetype**, delivering intuitive, user-friendly software is essential to our mission. The **Survey Builder and Viewer** project is a way to look into how you think about creating seamless, user-centered experiences that simplify complex tasks like survey creation.

This project matters because:
1. **User Experience**: We prioritize UX to ensure users can easily interact with the product.
2. **Flexibility**: A customizable survey tool allows users to tailor surveys for different needs, aligning with Archetype's scalable solutions.
3. **Market Differentiation**: A beautiful, easy-to-use interface sets us apart in a competitive landscape.

## Implementation Details

The application is built with Next.js and TypeScript, featuring:

- Multiple question types:
  - Text Input
  - Single Choice (Radio)
  - Multiple Choice (Checkbox)
  - Single/Multi Select Dropdowns
  - Date Picker
  - Rating (5-star)
- Local storage persistence for surveys and responses
- Survey sharing via unique links
- Response collection and analysis

## Task Description

The goal of this task is to build a **Survey Builder and Viewer** application. The Survey Builder allows users to create different types of questions, while the Survey Viewer enables users to interact with the generated survey. The final app should allow users to toggle between building a survey and previewing it.

## Acceptance Criteria

1. **Survey Builder:**
   - Users should be able to add the following types of questions:
     - Text input
     - Multiple-choice (with customizable options)
     - Checkboxes (with customizable options)
     - Rating scale (1-5)
     - Date picker
   - Each question should support custom labels. For multiple-choice and checkbox questions, users should be able to dynamically add or remove options.

2. **Survey Viewer:**
   - Displays the questions built in the Survey Builder.
   - End users should be able to:
     - Enter responses in text input fields.
     - Select one or more options for multiple-choice and checkbox questions.
     - Provide a rating on a scale from 1 to 5.
     - Pick a date using the date picker.
   - Upon submission, responses should be captured in the state and logged to the console.

3. **Toggle Between Views:**
   - The app should include a button to toggle between the **Survey Builder** (edit mode) and the **Survey Viewer** (preview mode).
   - The survey state should persist when switching between views, allowing users to make changes without losing progress.

## What We're Evaluating

It's up to you to determine the order of attack, what priority each feature takes, and how you want to approach solving the problem.

1. **User Experience (UX):**
The current UX is intentionally subpar—let's transform it into a delightful and intuitive experience that users will love.
   
2. **Error Handling and State Management:**
There is no error handling for invalid inputs or empty states, and no feedback for loading states. Improving these will significantly enhance the UX. Add proper validation, empty state messaging, and loading indicators.

3. **Visual Design:**
The app's design is currently very basic. Make it visually appealing, delightful to use, and engaging.

4. **Communication**
You _will not_ finish everything, pick and choose your battles carefully, and when you're done, explain what trade-offs you were forced to make and why.