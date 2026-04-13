# Acadfinity 2.0 - High-Quality Clickable Prototype

This repository contains the frontend prototype for Acadfinity 2.0, a next-generation SaaS platform for the K–12 school ecosystem. This prototype is built as a responsive website with a mobile-app-like experience, designed for demos, UI/UX validation, and frontend planning before backend development.

## Purpose

The primary objective is to create a tangible, clickable product demo that helps the team validate:
- Information Architecture & Navigation
- Responsive behavior across devices
- Role-based user flows (Director, Principal, Teacher, Parent, Student)
- Dashboard patterns and module concepts (ERP, LMS, Marketplace, Library)
- The overall brand and product direction for stakeholder demos.

**Note:** This is a **frontend-only prototype**. It uses mock data and mock state management (Zustand) and does not connect to any real backend services, databases, or authentication systems.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for simple prototype state.
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  Clone the repository (or ensure you are in the project directory).
2.  Navigate to the web app's directory:
    ```bash
    cd apps/acadfinity-web
    ```
3.  Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Development Server

To run the app in development mode, execute the following command:

```bash
npm run dev