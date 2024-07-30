import React from 'react';

const VacancyView = () => {
    const job = {
        jobTitle: "Software Engineer",
        jobType: "full time",
        locations: ["colombo", "galle"],
        fields: ["Automobile", "Insurance"],
        experienceLevel: 3,
        educationLevel: 3,
        overview: "This is a software engineer job",
        description: "This is a software engineer job",
        deadline: "2022-12-31",
        image: "https://via.placeholder.com/150",
    };

    return (
        <div>
            Each vacancy view
        </div>
    );
};

export default VacancyView;
