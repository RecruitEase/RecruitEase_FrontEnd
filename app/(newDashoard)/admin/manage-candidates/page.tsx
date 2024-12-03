"use client";

import TblCandidate from '@/components/admin/manageCandidates/TblCandidates';
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

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/all/candidate`
      );
      const candidates = response.data.content;
      console.log("Candidates:", candidates);

      if (Array.isArray(candidates)) {
        // Transform data to match the required fields
        const transformedData = candidates.map((candidate) => ({
          email: candidate.email,
          name: `${candidate.firstName} ${candidate.lastName}`,
          createdAt: new Date(candidate.createdAt).toLocaleDateString(), // Format date if needed
          status: candidate.isActive ? <Chip color='success'> Active</Chip> : <Chip color='danger'> Inactive</Chip>,
          candidateId: candidate.candidateId,
        }));
        setData(transformedData);
      } else {
        console.error("Unexpected data format:", candidates);
        setError(true);
      }
    } catch (err) {
      console.error("Error fetching candidate data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
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
          title="Manage JobSeekers"
          subtext="Manage JobSeekers of the system."
        />
      </header>
      <TblCandidate data={data} />
    </>
  );
}

export default Page;
