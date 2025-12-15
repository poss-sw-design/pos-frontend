import React from 'react';

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-tabs">
      {categories.map(cat => (
        <div
          key={cat.id}
          className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.name}
        </div>
      ))}
    </div>
  );
};

export default CategoryTabs;
