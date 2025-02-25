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

  // Fetch course codes using React Query
  const { isLoading, error, data: courseCodes } = useQuery({
    queryKey: ["courseCodes"],
    queryFn: async () => {
      const response = await apiClient.get("/course_codes/");
      return response.data;
    },
  });

  return (
    <div className="search-filters-container">
      <input
        id="searchBar"
        type="text"
        className="search-bar"
        placeholder="Sök din kursbok..."
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
            {filters.courseCode || "Filtrera kurskod"}
          </option>
          {isLoading ? (
            <option disabled>Loading...</option>
          ) : error ? (
            <option disabled>Error: {error.message}</option>
          ) : (
            courseCodes?.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code}
              </option>
            ))
          )}
        </select>

        <select
          id="priceRangeFilter"
          name="priceRange"
          value={filters.priceRange}
          onChange={handleChange}
        >
          <option value="">
            {filters.priceRange || "Filtrera pris"}
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
            {filters.condition || "Filtrera skick"}
          </option>
          <option value="Nyskick">Nyskick</option>
          <option value="Bra skick">Bra skick</option>
        </select>

        <select
          id="locationFilter"
          name="location"
          value={filters.location}
          onChange={handleChange}
        >
          <option value="">
            {filters.location || "Filtrera plats"}
          </option>
          <option value="Hubben">Hubben</option>
          <option value="Biblioteket">Biblioteket</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;