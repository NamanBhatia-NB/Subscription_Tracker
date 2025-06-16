"use client"

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("subscription-tracker-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("subscription-tracker-users") || "[]")
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }
      setUser(userWithoutPassword)
      localStorage.setItem("subscription-tracker-user", JSON.stringify(userWithoutPassword))
      return true
    }
    return false
  }

  const register = async (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("subscription-tracker-users") || "[]")

    if (users.find((u) => u.email === email)) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    }

    users.push(newUser)
    localStorage.setItem("subscription-tracker-users", JSON.stringify(users))

    const userWithoutPassword = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }
    setUser(userWithoutPassword)
    localStorage.setItem("subscription-tracker-user", JSON.stringify(userWithoutPassword))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("subscription-tracker-user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
