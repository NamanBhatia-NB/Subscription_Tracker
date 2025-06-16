"use client"

import { useSubscriptions } from "../contexts/SubscriptionContext"

const categories = [
  "Entertainment",
  "Software",
  "Utilities",
  "Health & Fitness",
  "Education",
  "News & Media",
  "Business",
  "Other",
]

const frequencies = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
]

function SearchAndFilter() {
  const { searchTerm, setSearchTerm, categoryFilter, setCategoryFilter, frequencyFilter, setFrequencyFilter } =
    useSubscriptions()

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("")
    setFrequencyFilter("")
  }

  const hasActiveFilters = searchTerm || categoryFilter || frequencyFilter

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="relative flex-1 max-w-sm">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</div>
        <input
          type="text"
          placeholder="Search subscriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={frequencyFilter}
          onChange={(e) => setFrequencyFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">All Frequencies</option>
          {frequencies.map((freq) => (
            <option key={freq.value} value={freq.value}>
              {freq.label}
            </option>
          ))}
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white"
          >
            ✕ Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilter
