
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
// import Footer from '../components/Footer';

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;