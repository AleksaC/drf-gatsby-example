import React from "react";

import { useIsAuthenticated } from "../services/auth-service";

const FilterButton = ({ text, disabled, active, onClick }) => (
  <button
    className={`filter-button ${active ? 'active' : ''}`}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </button>
);

const Filter = ({ activeFilter, setActiveFilter }) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '300px',
        paddingTop: '1.45rem',
        margin: '0 auto',
      }}
    >
      <FilterButton
        text="All"
        active={activeFilter === 'all'}
        onClick={() => setActiveFilter('all')}
      />
      <FilterButton
        text="Nearby"
        active={activeFilter === 'nearby'}
        onClick={() => setActiveFilter('nearby')}
      />
      <FilterButton
        text="Favorite"
        active={activeFilter === 'favorite'}
        disabled={!isAuthenticated}
        onClick={() => setActiveFilter('favorite')}
      />
    </div>
  );
};

export default Filter;
