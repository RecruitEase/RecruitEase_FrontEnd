import React from 'react';
import HeaderBox from "@/components/dashboard/HeaderBox";

const RecruiterDashboard = () => {
    const loggedIn={
        firstName:'Chathura',
    };

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
                </header>
            </div>
        </section>
    );
};

export default RecruiterDashboard;
