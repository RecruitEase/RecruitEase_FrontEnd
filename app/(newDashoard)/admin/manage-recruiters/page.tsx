"use client";

import TblRecruiter from '@/components/admin/manageRecruiters/TblRecruiters';
import HeaderBox from '@/components/dashboard/HeaderBox';
import ErrorComponent from '@/components/ErrorComponent';
import LoadingComponent from '@/components/LoadingComponent';
import useAxiosAuth from '@/lib/hooks/useAxiosAuth';
import { Chip } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const axios = useAxiosAuth();

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/all/recruiter`
      );
      const recruiters = response.data.content;
      console.log("recruiters:", recruiters);

      if (Array.isArray(recruiters)) {
        // Transform data to match the required fields
        const transformedData = recruiters.map((recruiter) => ({
          email: recruiter.email,
          name: `${recruiter.firstName} ${recruiter.lastName}`,
          createdAt: new Date(recruiter.createdAt).toLocaleDateString(), // Format date if needed
          status: recruiter.isActive ? <Chip color='success'> Active</Chip> : <Chip color='danger'> Inactive</Chip>,
          recruiterId: recruiter.recruiterId,
        }));
        setData(transformedData);
      } else {
        console.error("Unexpected data format:", recruiters);
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching recruiter data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []); // Dependency array ensures this runs only once

  return loading ? (
    <LoadingComponent />
  ) : error ? (
    <ErrorComponent />
  ) : (
    <>
      <header className="home-header">
        <HeaderBox
          type="title"
          title="Manage Recruiters"
          subtext="Manage recruiters of the system."
        />
      </header>
      <TblRecruiter data={data} />
    </>
  );
}

export default Page;
