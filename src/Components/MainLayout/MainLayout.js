// MainLayout.js
import React from 'react';
import Navbar from './Navbar/Navbar'; 
import * as Style from './MainLayoutStyle';

function MainLayout({ children }) {
  return (
    <Style.MainLayoutContainer>
      <Navbar />
      {children}
    </Style.MainLayoutContainer>
  );
}

export default MainLayout;
