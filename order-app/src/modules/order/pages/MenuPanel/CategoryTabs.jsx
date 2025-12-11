import React from "react";

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-tabs">
      {categories.map((cat) => (
        <div
          key={cat}
          className={`category-tab ${selectedCategory === cat ? "active" : ""}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
