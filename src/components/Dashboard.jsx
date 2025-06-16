"use client"

import { useState } from "react"
import { SubscriptionProvider } from "../contexts/SubscriptionContext"
import SubscriptionList from "./SubscriptionList"
import AddSubscriptionDialog from "./AddSubscriptionDialog"
import ExpenseCharts from "./ExpenseCharts"
import SearchAndFilter from "./SearchAndFilter"
import Navbar from "./Navbar"

function Dashboard() {
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <SubscriptionProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header + Add Button */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Subscriptions
              </h2>
              <button
                onClick={() => setShowAddDialog(true)}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full sm:w-auto"
              >
                ➕ Add Subscription
              </button>
            </div>

            <SearchAndFilter />
          </div>

          {/* Grid Section: Subscription List + Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <SubscriptionList />
            </div>
            <div className="xl:col-span-1">
              <ExpenseCharts />
            </div>
          </div>
        </main>

        {/* Modal Dialog */}
        {showAddDialog && <AddSubscriptionDialog onClose={() => setShowAddDialog(false)} />}
      </div>
    </SubscriptionProvider>
  )
}

export default Dashboard
