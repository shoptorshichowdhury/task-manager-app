# Task Management App

## Short Description

This is a task management app designed for authenticated users where they can create, update, and manage their tasks. The app organizes tasks into three categories: "To-Do", "In Progress", and "Done". Users can easily drag and drop tasks between these categories based on their needs. It's a simple and intuitive tool to help you stay on top of your tasks.

## Live Link

You can try the app here:  
[**Live Demo**](https://your-deployed-app-link.com)  

## Features

- User authentication via Google (Firebase)
- Add, edit, and delete tasks
- Drag and drop tasks between "To-Do", "In Progress", and "Done"
- Real-time updates across all active users

## Technologies Used

### Frontend
- **React** - JavaScript library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework for custom styling
- **ShadCN** - Component library for beautiful UI elements
- **Axios** - Promise-based HTTP client for making requests
- **DND Kit** - Drag-and-drop library for React
- **React Router** - Declarative routing for React applications
- **React Hot Toast** - For showing toast notifications
- **Firebase** - Google Authentication for user login
- **Date-fns** - For date manipulation
- **TanStack Query** - For fetching, caching, and synchronizing data

### Backend
- **MongoDB** - NoSQL database for storing tasks
- **Express.js** - Web framework for Node.js
- **Node.js** - JavaScript runtime for the backend

## Dependencies

### Client-Side Dependencies

```json
"@dnd-kit/core": "^6.3.1",
"@dnd-kit/modifiers": "^9.0.0",
"@dnd-kit/sortable": "^10.0.0",
"@radix-ui/react-dialog": "^1.1.6",
"@radix-ui/react-dropdown-menu": "^2.1.6",
"@radix-ui/react-label": "^2.1.2",
"@radix-ui/react-popover": "^1.1.6",
"@radix-ui/react-select": "^2.1.6",
"@radix-ui/react-separator": "^1.1.2",
"@radix-ui/react-slot": "^1.1.2",
"@radix-ui/react-tooltip": "^1.1.8",
"@tanstack/react-query": "^5.66.9",
"axios": "^1.7.9",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"date-fns": "^3.6.0",
"firebase": "^11.3.1",
"localforage": "^1.10.0",
"lucide-react": "^0.475.0",
"match-sorter": "^8.0.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-hot-toast": "^2.5.2",
"react-router-dom": "^7.2.0",
"sort-by": "^1.2.0",
"tailwind-merge": "^3.0.1",
"tailwindcss-animate": "^1.0.7"
