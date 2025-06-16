"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./AuthContext"

const SubscriptionContext = createContext()

export function SubscriptionProvider({ children }) {
  const { user } = useAuth()
  const [subscriptions, setSubscriptions] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [frequencyFilter, setFrequencyFilter] = useState("")

  useEffect(() => {
    if (user) {
      const savedSubscriptions = localStorage.getItem(`subscriptions-${user.id}`)
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions))
      }
    }
  }, [user])

  const saveSubscriptions = (subs) => {
    if (user) {
      localStorage.setItem(`subscriptions-${user.id}`, JSON.stringify(subs))
      setSubscriptions(subs)
    }
  }

  const addSubscription = (subscription) => {
    if (!user) return

    const newSubscription = {
      ...subscription,
      id: Date.now().toString(),
      userId: user.id,
    }

    const updatedSubscriptions = [...subscriptions, newSubscription]
    saveSubscriptions(updatedSubscriptions)
  }

  const updateSubscription = (id, updatedData) => {
    const updatedSubscriptions = subscriptions.map((sub) => (sub.id === id ? { ...sub, ...updatedData } : sub))
    saveSubscriptions(updatedSubscriptions)
  }

  const deleteSubscription = (id) => {
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== id)
    saveSubscriptions(updatedSubscriptions)
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        addSubscription,
        updateSubscription,
        deleteSubscription,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        frequencyFilter,
        setFrequencyFilter,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscriptions() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error("useSubscriptions must be used within a SubscriptionProvider")
  }
  return context
}
