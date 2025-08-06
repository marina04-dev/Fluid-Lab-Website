// client/src/components/common/SearchFilter.jsx
import React, { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

const SearchFilter = ({
  searchTerm = "",
  onSearchChange,
  filters = [],
  selectedFilters = {},
  onFilterChange,
  sortOptions = [],
  selectedSort = "",
  onSortChange,
  onReset,
  placeholder = "Search...",
  className = "",
  showReset = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(localSearchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  const hasActiveFilters = () => {
    return (
      Object.values(selectedFilters).some(
        (value) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          (Array.isArray(value) ? value.length > 0 : true)
      ) ||
      selectedSort !== "" ||
      searchTerm !== ""
    );
  };

  const handleReset = () => {
    setLocalSearchTerm("");
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4">
        {/* Search Bar */}
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="mb-0"
            />
          </div>

          {/* Filter Toggle Button */}
          {(filters.length > 0 || sortOptions.length > 0) && (
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                />
              </svg>
              <span>Filters</span>
              {hasActiveFilters() && (
                <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {Object.values(selectedFilters).filter(
                    (v) => v !== "" && v !== null
                  ).length + (selectedSort !== "" ? 1 : 0)}
                </span>
              )}
            </Button>
          )}

          {/* Reset Button */}
          {showReset && hasActiveFilters() && (
            <Button variant="outline" onClick={handleReset}>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset
            </Button>
          )}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (filters.length > 0 || sortOptions.length > 0) && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Filter Options */}
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {filter.label}
                  </label>
                  {filter.type === "select" ? (
                    <select
                      value={selectedFilters[filter.key] || ""}
                      onChange={(e) =>
                        onFilterChange &&
                        onFilterChange(filter.key, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">{filter.placeholder || "All"}</option>
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : filter.type === "multiselect" ? (
                    <div className="space-y-2">
                      {filter.options.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={(
                              selectedFilters[filter.key] || []
                            ).includes(option.value)}
                            onChange={(e) => {
                              const currentValues =
                                selectedFilters[filter.key] || [];
                              const newValues = e.target.checked
                                ? [...currentValues, option.value]
                                : currentValues.filter(
                                    (v) => v !== option.value
                                  );
                              onFilterChange &&
                                onFilterChange(filter.key, newValues);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  ) : filter.type === "date" ? (
                    <input
                      type="date"
                      value={selectedFilters[filter.key] || ""}
                      onChange={(e) =>
                        onFilterChange &&
                        onFilterChange(filter.key, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : filter.type === "daterange" ? (
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={selectedFilters[`${filter.key}_start`] || ""}
                        onChange={(e) =>
                          onFilterChange &&
                          onFilterChange(`${filter.key}_start`, e.target.value)
                        }
                        placeholder="From"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="date"
                        value={selectedFilters[`${filter.key}_end`] || ""}
                        onChange={(e) =>
                          onFilterChange &&
                          onFilterChange(`${filter.key}_end`, e.target.value)
                        }
                        placeholder="To"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <Input
                      type="text"
                      value={selectedFilters[filter.key] || ""}
                      onChange={(e) =>
                        onFilterChange &&
                        onFilterChange(filter.key, e.target.value)
                      }
                      placeholder={filter.placeholder || ""}
                    />
                  )}
                </div>
              ))}

              {/* Sort Options */}
              {sortOptions.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={selectedSort}
                    onChange={(e) =>
                      onSortChange && onSortChange(e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Default</option>
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
