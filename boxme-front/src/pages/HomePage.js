import React from 'react';
import Menu from '../components/NavBarHome/Menu';
import BodyHome from '../components/BodyHome/BodyHome';

function HomePage() {
  console.log("home");
  return (
    <div>
      <Menu />
      <BodyHome />
    </div>
  );
}


export default HomePage;