import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-bar">
      <select name="gender" onChange={handleChange}>
        <option value="">All Genders</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <select name="experience" onChange={handleChange}>
        <option value="">All Experience</option>
        <option>1 Year</option>
        <option>2 Years</option>
        <option>3 Years</option>
      </select>
      <input
        type="text"
        name="skills"
        placeholder="Filter by Skills (comma separated)"
        onChange={handleChange}
      />
    </div>
  );
};

export default FilterBar;
