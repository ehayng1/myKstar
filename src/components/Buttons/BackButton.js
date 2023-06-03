import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

export const BackButton = ({to, onClick}) => {
  return (
    <div>
      <Link to={to} onClick={onClick} className="Links backButton">
        <FontAwesomeIcon
          icon="fa-solid fa-arrow-left"
          style={{ color: '#ffffff' }}
          className="icons"
        />
      </Link>
    </div>
  );
};
