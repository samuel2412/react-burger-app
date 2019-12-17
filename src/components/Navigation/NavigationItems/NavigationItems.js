import React from 'react'
import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
  <ul className={'NavigationItems'}>
      <NavigationItem link={'/'}>Burger Builder</NavigationItem>
      <NavigationItem link={'/orders'}>Orders</NavigationItem>
      <NavigationItem link={'/auth'}>Authentication</NavigationItem>
  </ul>
);
export default navigationItems