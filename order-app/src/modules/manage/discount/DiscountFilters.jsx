import React from "react";

const DiscountFilters = ({ filters, setFilters }) => {
  return (
    <div className="discount-filters">
      <input
        type="text"
        placeholder="Discount Type"
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
      />

      <input
        type="text"
        placeholder="Status"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      />

      <div className="date-range">
        <input
          type="date"
          value={filters.start}
          onChange={(e) => setFilters({ ...filters, start: e.target.value })}
        />
        <input
          type="date"
          value={filters.end}
          onChange={(e) => setFilters({ ...filters, end: e.target.value })}
        />
      </div>

      <input
        type="text"
        placeholder="Search discounts..."
        className="search"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
    </div>
  );
};

export default DiscountFilters;
