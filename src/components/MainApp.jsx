"use client"

import { useAuth } from "../contexts/AuthContext"
import LoginForm from "./LoginForm"
import Dashboard from "./Dashboard"

function MainApp() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <LoginForm />
      </div>
    )
  }

  return <Dashboard />
}

export default MainApp
