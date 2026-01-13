# Smart Issue Board

Smart Issue Board is a responsive issue tracking web application built with **React** and **Firebase**, enabling authenticated users to create, assign, and manage issues in real time. The project demonstrates frontend component structuring, state management, and seamless integration with Firebase Authentication and Cloud Firestore.

## ✨ Features
- User authentication with Firebase
- Create, assign, and track issues
- Priority-based issue management
- Real-time updates using Cloud Firestore
- Enforced issue workflow (Open → In Progress → Done)
- Duplicate issue detection with user confirmation
- Responsive and clean UI layout

## 🛠 Tech Stack
- **Frontend:** React (Vite), JavaScript, HTML5, CSS3
- **Backend / Database:** Firebase Authentication, Cloud Firestore
- **Version Control:** Git & GitHub

## 🚀 Getting Started
```bash
npm install
npm run dev
```
Environment variables are managed using .env and are not committed to the repository.

📌 Notes
This project was built to simulate a real-world internal tool and demonstrate practical frontend development skills, including UI structuring, real-time data handling, and cloud integration.

Save the file.

---

## ✅ STEP 2 — Commit README update

Run:

```bash
git add README.md
git commit -m "Update README with project description"
git push
```

## 📘 Design Decisions & Implementation Details

### 1. Why this Frontend Stack?
React was chosen for its component-based architecture and efficient state management, which makes building scalable and reusable UI components easier. Firebase was used to handle authentication and real-time data storage quickly without managing a custom backend, allowing focus on frontend logic and user experience.

### 2. Firestore Data Structure
The application uses a single `issues` collection in Cloud Firestore.  
Each issue document contains the following fields:
- `title`
- `description`
- `priority` (Low / Medium / High)
- `status` (Open / In Progress / Done)
- `assignedTo`
- `createdBy`
- `createdAt`

This flat structure keeps queries simple, supports real-time updates, and scales well for frontend-driven applications.

### 3. Handling Similar Issues
To reduce duplicate issue creation, recent issues are fetched from Firestore and compared against the new issue title using keyword matching. If similar issues are detected, the user is warned and asked for confirmation before creating the issue, improving UX without blocking valid entries.

### 4. Challenges Faced
Handling authentication persistence on page refresh and configuring Firestore security rules were initially challenging. These issues were resolved by properly listening to authentication state changes and defining Firestore rules that allow access only to authenticated users.

### 5. Future Improvements
Future enhancements include role-based access control, advanced search functionality, pagination for large issue lists, improved UI animations, and analytics integration for usage tracking.
