import { useLocation } from 'react-router-dom';
import React from 'react';

const NoMatch = () => {
  const location = useLocation();
  return (
    <div>
      <h3 className="h3">
        No match for
        {` ${location.pathname}`}
      </h3>
    </div>
  );
};

export default NoMatch;
