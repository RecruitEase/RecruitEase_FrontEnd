// components/Layout.js
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const CandidateLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default CandidateLayout;
