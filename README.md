# Subscription Tracker - React Application

A comprehensive ReactJS application for managing and visualizing recurring subscription expenses.

## Features

### Core Features
- **User Authentication**: Register and login functionality with local storage
- **Subscription Management**: Add, edit, and delete subscriptions with details like name, amount, billing frequency, next payment date, and category
- **Subscription List View**: Display all subscriptions with key details and upcoming payment dates
- **Search and Filter**: Search by name/category and filter by category or billing frequency
- **Expense Visualization**: Interactive charts showing total expenses, category breakdowns, and billing frequency analysis
- **Responsive Design**: Fully responsive design that works on desktop and mobile devices

### Bonus Features
- **Dark/Light Theme Toggle**: Switch between light and dark themes
- **Export Data**: Export subscription data as CSV or JSON files
- **Upcoming Payment Notifications**: Visual indicators for payments due within 7 days
- **Real-time Analytics**: Live updating charts and statistics

## Technology Stack

- **Frontend**: ReactJS 18 with functional components and hooks
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS with custom dark mode support
- **Charts**: Recharts library for data visualization
- **Data Persistence**: Browser localStorage
- **Icons**: Emoji icons for simplicity

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm

### Installation

1. Clone the repository:
``` 
git clone https://github.com/NamanBhatia-NB/Subscription_Tracker
cd subscription-tracker
```

2. Install dependencies:
```
npm install --legacy-peer-deps
```

3. Start the development server:
```
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Getting Started
1. **Register/Login**: Create a new account or login with existing credentials
2. **Add Subscriptions**: Click "Add Subscription" to add your first subscription
3. **Manage Subscriptions**: Edit or delete subscriptions using the action buttons on each card
4. **Search and Filter**: Use the search bar and filter dropdowns to find specific subscriptions
5. **View Analytics**: Check the charts panel for expense breakdowns and insights
6. **Export Data**: Use the Export button to download your data as CSV or JSON

### Features Overview

#### Subscription Management
- Add subscriptions with name, amount, billing frequency (weekly, monthly, quarterly, yearly), category, and next payment date
- Edit existing subscriptions to update any details
- Delete subscriptions with confirmation dialog
- Visual indicators for upcoming payments (due within 7 days)

#### Search and Filtering
- Search by subscription name or category
- Filter by category (Entertainment, Software, Utilities, etc.)
- Filter by billing frequency
- Clear all filters with one click

#### Analytics and Visualization
- **Total Expenses**: View monthly and yearly expense totals
- **Category Breakdown**: Pie chart showing expenses by category
- **Billing Frequency**: Bar chart showing costs by billing frequency
- **Upcoming Payments**: List of payments due in the next 30 days

#### Data Export
- Export all subscription data as CSV for spreadsheet analysis
- Export as JSON for backup or data migration

## Project Structure

```
└── 📁Subscription Tracker
    └── 📁src
        └── App.css
        └── App.jsx
        └── 📁assets
            └── react.svg
        └── 📁components
            └── AddSubscriptionDialog.jsx
            └── Dashboard.jsx
            └── EditSubscriptionDialog.jsx
            └── ExpenseCharts.jsx
            └── ExportData.jsx
            └── LoginForm.jsx
            └── MainApp.jsx
            └── Navbar.jsx
            └── SearchAndFilter.jsx
            └── SubscriptionCard.jsx
            └── SubscriptionList.jsx
        └── 📁contexts
            └── AuthContext.jsx
            └── SubscriptionContext.jsx
            └── ThemeContext.jsx
            └── ToastContext.jsx
        └── index.css
        └── index.jsx
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── README.md
    └── tailwind.config.js
    └── vite.config.ts
```

## Data Storage

The application uses browser localStorage for data persistence:
- User accounts are stored in `subscription-tracker-users`
- Current user session in `subscription-tracker-user`
- User subscriptions in `subscriptions-{userId}`
- Theme preference in `subscription-tracker-theme`