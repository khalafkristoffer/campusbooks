import React, { useState } from "react";
import "../styles/search.css";
import { useQuery } from "react-query"; // Import useQuery
import apiClient from "../api/client"; // Import apiClient

const SearchAndFilter = ({ onFilterChange }) => {
  const [selectedCourseCode, setSelectedCourseCode] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleCourseCodeChange = (event) => {
    const courseCode = event.target.value;
    setSelectedCourseCode(courseCode);
    onFilterChange({ ...filters, courseCode: courseCode });
  };

  const handlePriceRangeChange = (event) => {
    const priceRange = event.target.value;
    setSelectedPriceRange(priceRange);
    onFilterChange({ ...filters, priceRange: priceRange });
  };

  const handleConditionChange = (event) => {
    setSelectedCondition(event.target.value);
    onFilterChange({ ...filters, condition });
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    onFilterChange({ ...filters, location });
  };

  const [filters, setFilters] = useState({});

  // Fetch course codes using React Query
  const { isLoading, error, data: courseCodes } = useQuery(
    "courseCodes",
    async () => {
      const response = await apiClient.get("/course_codes/"); // Replace with your actual endpoint
      return response.data;
    }
  );

  return (
    <div className="search-filters-container">
      <input
        id="searchBar"
        type="text"
        className="search-bar"
        placeholder="Sök din kursbok..."
      />
      <div className="filters">
        <select
          id="courseCodeFilter"
          value={selectedCourseCode}
          onChange={handleCourseCodeChange}
          disabled={isLoading || error} // Disable while loading or if there's an error
        >
          <option value="" disabled hidden>
            {selectedCourseCode || "Filtrera kurskod"}
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
          value={selectedPriceRange}
          onChange={handlePriceRangeChange}
        >
          <option value="" disabled hidden>
            {selectedPriceRange || "Filtrera pris"}
          </option>
          <option value="0-200 kr">0-200 kr</option>
          <option value="200-500 kr">200-500 kr</option>
        </select>

        <select
          id="conditionFilter"
          value={selectedCondition}
          onChange={handleConditionChange}
        >
          <option value="" disabled hidden>
            {selectedCondition || "Filtrera skick"}
          </option>
          <option value="Nyskick">Nyskick</option>
          <option value="Bra skick">Bra skick</option>
        </select>

        <select
          id="locationFilter"
          value={selectedLocation}
          onChange={handleLocationChange}
        >
          <option value="" disabled hidden>
            {selectedLocation || "Filtrera plats"}
          </option>
          <option value="Hubben">Hubben</option>
          <option value="Biblioteket">Biblioteket</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndFilter;