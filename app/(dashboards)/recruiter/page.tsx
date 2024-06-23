import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";
import TotalVacacies from "@/components/dashboard/TotalVacacies";

const RecruiterDashboard = () => {
    const loggedIn={
        firstName:'Chathura',
        lastName:'Lakshan'
    };

    const activeVacancies=25;
    const filledVacancies=5;

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggedIn?.firstName||'Guest'}
                    subtext="Access and manage your account and listing efficiently"
                    />


                    <TotalVacacies
                        activeVacancies={activeVacancies?activeVacancies:0}
                        filledVacancies={filledVacancies?filledVacancies:0}
                    />
                </header>
            </div>
        </section>
    );
};

export default RecruiterDashboard;
