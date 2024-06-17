// components/Layout.js
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import CandidateNavbar from './CandidateNavbar';

const CandidateLayout = () => {
  return (
    <>
      <CandidateNavbar />
      <Outlet />
    </>
  );
};

export default CandidateLayout;
