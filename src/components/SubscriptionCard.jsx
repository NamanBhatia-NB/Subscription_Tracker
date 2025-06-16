"use client"

import { useState } from "react"
import { useSubscriptions } from "../contexts/SubscriptionContext"
import EditSubscriptionDialog from "./EditSubscriptionDialog"

function SubscriptionCard({ subscription }) {
  const { deleteSubscription } = useSubscriptions()
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getBadgeColor = (frequency) => {
    switch (frequency) {
      case "monthly":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "yearly":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "weekly":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "quarterly":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const isUpcoming = () => {
    const today = new Date()
    const paymentDate = new Date(subscription.nextPaymentDate)
    const diffDays = Math.ceil((paymentDate - today) / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays >= 0
  }

  const handleDelete = () => {
    deleteSubscription(subscription.id)
    setShowDeleteConfirm(false)
  }

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow ${
          isUpcoming() ? "ring-2 ring-orange-200 dark:ring-orange-800" : ""
        }`}
      >
        <div className="p-4 sm:p-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between mb-4 gap-2 sm:gap-0">
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{subscription.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{subscription.category}</p>
              {subscription.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subscription.description}</p>
              )}
            </div>
            <div className="flex items-center space-x-2 self-start sm:self-center">
              <button
                onClick={() => setShowEditDialog(true)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✏️
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="p-2 text-red-400 hover:text-red-600"
              >
                🗑️
              </button>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            {/* Left */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                ₹ {subscription.amount}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(
                  subscription.billingFrequency
                )}`}
              >
                {subscription.billingFrequency}
              </span>
            </div>

            {/* Right */}
            <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-wrap items-center gap-2">
              <span>Next: {formatDate(subscription.nextPaymentDate)}</span>
              {isUpcoming() && (
                <span className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                  Due Soon
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {showEditDialog && (
        <EditSubscriptionDialog
          subscription={subscription}
          onClose={() => setShowEditDialog(false)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Subscription</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete "{subscription.name}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SubscriptionCard
