"use client"

import { useState } from "react"
import { useSubscriptions } from "../contexts/SubscriptionContext"
import { useToast } from "../contexts/ToastContext"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function ExportData() {
  const { subscriptions } = useSubscriptions()
  const { toast } = useToast()
  const [showDropdown, setShowDropdown] = useState(false)

  const exportToCSV = () => {
    if (subscriptions.length === 0) {
      toast({
        title: "No data to export",
        description: "Add some subscriptions first.",
        variant: "destructive",
      })
      return
    }

    const headers = ["Name", "Amount", "Billing Frequency", "Next Payment Date", "Category", "Description"]
    const csvContent = [
      headers.join(","),
      ...subscriptions.map((sub) =>
        [
          `"${sub.name}"`,
          sub.amount,
          sub.billingFrequency,
          sub.nextPaymentDate,
          `"${sub.category}"`,
          `"${sub.description || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "subscriptions.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Your subscriptions have been exported to CSV.",
    })

    setShowDropdown(false)
  }

  const exportToPDF = () => {
    if (subscriptions.length === 0) {
      toast({
        title: "No data to export",
        description: "Add some subscriptions first.",
        variant: "destructive",
      })
      return
    }

    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Subscription Tracker Export", 14, 16)

    const tableData = subscriptions.map((sub) => [
      sub.name,
      sub.amount,
      sub.billingFrequency,
      sub.nextPaymentDate,
      sub.category,
      sub.description || "",
    ])

    autoTable(doc, {
      startY: 20,
      head: [["Name", "Amount", "Billing Frequency", "Next Payment Date", "Category", "Description"]],
      body: tableData,
    })

    doc.save("subscriptions.pdf")

    toast({
      title: "Export successful",
      description: "Your subscriptions have been exported to PDF.",
    })

    setShowDropdown(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center md:w-fit w-full border justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        📥 Export
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <button
            onClick={exportToCSV}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            📊 Export as CSV
          </button>
          <button
            onClick={exportToPDF}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            📄 Export as PDF
          </button>
        </div>
      )}

      {showDropdown && <div className="fixed inset-0 z-5" onClick={() => setShowDropdown(false)} />}
    </div>
  )
}

export default ExportData
