"use client"

import { useMemo } from "react"
import { useSubscriptions } from "../contexts/SubscriptionContext"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#8884D8", "#82CA9D", "#FFC658", "#FF7C7C"
]

const formatFrequencyLabel = (value) => {
  if (window.innerWidth < 640) {
    switch (value.toLowerCase()) {
      case "monthly":
        return "Month"
      case "yearly":
        return "Yr"
      case "weekly":
        return "Wk"
      case "quarterly":
        return "Qtr"
      default:
        return value
    }
  }
  return value
}

function ExpenseCharts() {
  const { subscriptions } = useSubscriptions()

  const computeMonthlyAmount = (sub) =>
    sub.billingFrequency === "monthly"
      ? sub.amount
      : sub.billingFrequency === "yearly"
        ? sub.amount / 12
        : sub.billingFrequency === "weekly"
          ? sub.amount * 4.33
          : sub.billingFrequency === "quarterly"
            ? sub.amount / 3
            : 0

  const categoryData = useMemo(() => {
    const totals = subscriptions.reduce((acc, sub) => {
      const amt = computeMonthlyAmount(sub)
      acc[sub.category] = (acc[sub.category] || 0) + amt
      return acc
    }, {})
    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount: Number(amount.toFixed(2)),
    }))
  }, [subscriptions])

  const monthlyData = useMemo(() => {
    const freqTotals = subscriptions.reduce((acc, sub) => {
      const amt = computeMonthlyAmount(sub)
      acc[sub.billingFrequency] = (acc[sub.billingFrequency] || 0) + amt
      return acc
    }, {})
    return Object.entries(freqTotals).map(([frequency, amount]) => ({
      frequency: frequency.charAt(0).toUpperCase() + frequency.slice(1),
      amount: Number(amount.toFixed(2)),
    }))
  }, [subscriptions])

  const upcomingPayments = useMemo(() => {
    const today = new Date()
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    return subscriptions
      .filter(sub => {
        const paymentDate = new Date(sub.nextPaymentDate)
        return paymentDate >= today && paymentDate <= nextMonth
      })
      .sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate))
      .slice(0, 5)
  }, [subscriptions])

  const totalMonthly = subscriptions.reduce((acc, sub) => acc + computeMonthlyAmount(sub), 0)
  const totalYearly = totalMonthly * 12

  if (subscriptions.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expense Overview</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add subscriptions to see your expense analytics</p>
          <div className="flex items-center justify-center h-32">
            <p className="text-gray-500 dark:text-gray-400 text-center text-sm">No data available</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Total Expenses */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Total Expenses</h3>
        <div className="grid grid-cols-2 gap-4 sm:flex sm:justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">₹ {totalMonthly.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Yearly</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">₹ {totalYearly.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Expenses by Category</h3>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%" cy="50%"
                outerRadius={80}
                labelLine={false}
                dataKey="amount"
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`₹ ${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category Legend */}
        <div className="mt-1 space-y-1 text-sm">
          {categoryData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {entry.category}: ₹ {entry.amount}
              </span>
            </div>
          ))}
        </div>
      </div>


      {/* Billing Frequency */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Billing Frequency</h3>
        <div className="h-64 sm:h-72 md:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="frequency"
                tickFormatter={formatFrequencyLabel}
                tick={{ fill: "#4B5563" }}
              />
              <YAxis />
              <Tooltip formatter={(value) => [`₹ ${value}`, "Monthly Cost"]} />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>


      {/* Upcoming Payments */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Payments</h3>
        {upcomingPayments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No upcoming payments in the next 30 days</p>
        ) : (
          <div className="space-y-3">
            {upcomingPayments.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{sub.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(sub.nextPaymentDate).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-medium text-gray-900 dark:text-white">₹ {sub.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseCharts
