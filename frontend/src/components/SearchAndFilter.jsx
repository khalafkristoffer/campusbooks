import React, { useState, useEffect } from "react";
import "../styles/search.css";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/client";

const SearchAndFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    courseCode: "",
    priceRange: "",
    condition: "",
    location: "",
    searchTerm: "",
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  // Fetch course codes using React Query with caching
  const { isLoading, error, data: courseCodes } = useQuery({
    queryKey: ["courseCodes"],
    queryFn: async () => {
      const response = await apiClient.get("/course_codes/");
      return response.data;
    },
    // Caching configuration
    staleTime: 1000 * 60 * 60, // Consider data fresh for 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // Keep unused data in cache for 24 hours
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  return (
    <div className="search-filters-container">
      <input
        id="searchBar"
        type="text"
        className="search-bar"
        placeholder="Sök din kursbok..."
        name="searchTerm"
        value={filters.searchTerm}
        onChange={handleChange}
      />
      <div className="filters">
        <select 
          id="courseCodeFilter"
          name="courseCode"
          value={filters.courseCode}
          onChange={handleChange}
          disabled={isLoading || error}
        >
          <option value="">
            {filters.courseCode ? "Rensa filter" : "Filtrera kurskod"}
          </option>
          {!isLoading && !error && courseCodes?.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code}
            </option>
          ))}
          {isLoading && <option disabled>Loading...</option>}
          {error && <option disabled>Error: {error.message}</option>}
        </select>

        <select
          id="priceRangeFilter"
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
        >
          <option value="">
            {filters.priceRange ? "Rensa filter" : "Filtrera pris"}
          </option>
          <option value="0-200 kr">0-200 kr</option>
          <option value="200-500 kr">200-500 kr</option>
        </select>

        <select
          id="conditionFilter"
          name="condition"
          value={filters.condition}
          onChange={handleChange}
        >
          <option value="">
            {filters.condition ? "Rensa filter" : "Filtrera skick"}
          </option>
          <option value="Nyskick">Nyskick</option>
          <option value="Bra skick">Bra skick</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;