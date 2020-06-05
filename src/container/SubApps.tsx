import React from 'react';
import { NavLink } from 'react-router-dom';
import subApps from '../assets/routes/subApps';

export default function () {
  return (
    <ul className="sub-app-list article-list">
      {subApps.map(({ name, title }) => (
        <NavLink key={name} to={`/app/${name}`}>
          <li>
            <h3>{ title }</h3>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
