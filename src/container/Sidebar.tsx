import React from 'react';
import { NavLink } from "react-router-dom";

import './styles/Sidebar.scss'

export default function Sidebar() {
  return (
    <aside className='sidebar'>
      <h3>功能</h3>
      <NavLink to='/almanac'>程序员老黄历</NavLink>
    </aside>
  )
}
