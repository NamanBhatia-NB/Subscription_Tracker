"use client"

import { useMemo } from "react"
import { useSubscriptions } from "../contexts/SubscriptionContext"
import SubscriptionCard from "./SubscriptionCard"

function SubscriptionList() {
  const { subscriptions, searchTerm, categoryFilter, frequencyFilter } = useSubscriptions()

  const filteredSubscriptions = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !categoryFilter || sub.category === categoryFilter
      const matchesFrequency = !frequencyFilter || sub.billingFrequency === frequencyFilter

      return matchesSearch && matchesCategory && matchesFrequency
    })
  }, [subscriptions, searchTerm, categoryFilter, frequencyFilter])

  const totalMonthlyExpense = useMemo(() => {
    return subscriptions.reduce((total, sub) => {
      const monthlyAmount =
        sub.billingFrequency === "monthly"
          ? sub.amount
          : sub.billingFrequency === "yearly"
            ? sub.amount / 12
            : sub.billingFrequency === "weekly"
              ? sub.amount * 4.33
              : sub.billingFrequency === "quarterly"
                ? sub.amount / 3
                : 0
      return total + monthlyAmount
    }, 0)
  }, [subscriptions])

  const upcomingPayments = useMemo(() => {
    const today = new Date()
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)

    return subscriptions.filter((sub) => {
      const paymentDate = new Date(sub.nextPaymentDate)
      return paymentDate >= today && paymentDate <= nextWeek
    }).length
  }, [subscriptions])

  if (subscriptions.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No subscriptions yet</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Start tracking your recurring expenses by adding your first subscription.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{subscriptions.length}</p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Expense</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹ {totalMonthlyExpense.toFixed(2)}</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Payments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingPayments}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Next 7 days</p>
            </div>
            <div className="text-2xl">📅</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSubscriptions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
            <p className="text-center text-gray-500 dark:text-gray-400">No subscriptions match your current filters.</p>
          </div>
        ) : (
          filteredSubscriptions.map((subscription) => (
            <SubscriptionCard key={subscription.id} subscription={subscription} />
          ))
        )}
      </div>
    </div>
  )
}

export default SubscriptionList
