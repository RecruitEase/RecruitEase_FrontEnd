"use client"
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LoadingComponent from '@/components/LoadingComponent';
import ErrorComponent from '@/components/ErrorComponent';
import { RecruiterProp } from '@/types/users';
import { JobProps } from '@/types';
import RecruiterJobs from '@/components/recruiterProfile/RecruiterJobs';
import { getJobsByRecruiterId, getRecruiter } from '@/lib/api';

const Page = () => {
    const [jobs, setJobs] = useState<JobProps[]>([]);
    const [recruiterDetails, setRecruiterDetails] = useState<RecruiterProp>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const params = useParams();
    const recruiterId: string = params?.id as string;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const [jobData, recruiterData] = await Promise.all([
                    getJobsByRecruiterId(recruiterId),
                    getRecruiter(recruiterId)
                ]);
                setJobs(jobData);
                setRecruiterDetails(recruiterData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (recruiterId) {
            fetchData();
        }
    }, [recruiterId]);

    return (
        (loading) ? <LoadingComponent />:
            (error) ? <ErrorComponent />:
                <>
                    <div className="min-h-screen flex flex-col xl:flex-row xl:justify-center">
                        {/* Main Section */}
                        <div className="bg-white flex flex-col w-full xl:w-2/3">
                            {recruiterDetails && (
                                <RecruiterJobs
                                    jobs={jobs}
                                    companyName={recruiterDetails.companyName}
                                    companyImg={recruiterDetails.profilePic}
                                />
                            )}
                        </div>
                    </div>
                </>
    );
};

export default Page;