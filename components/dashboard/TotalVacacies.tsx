import React from 'react';
import AnimatedCounter from "@/components/AnimatedCounter";
import DoughnutChart from "@/components/dashboard/DoughnutChart";

const TotalVacancies = ({activeVacancies,filledVacancies,}:TotalVacacyProps) => {
    return (
        <section className="total-vacancies">
            <div className="total-vacancies-chart">
                <DoughnutChart active={activeVacancies} filled={filledVacancies} />
            </div>
            <div className="flex flex-col flex-center gap-6">
                <div className="flex flex-col gap-2">
                    <p className="total-vacancies-label flex-center header-2">Active Vacancies</p>
                    <p className="total-vacancies-amount flex-center gap-2"><AnimatedCounter end={activeVacancies} duration={3}/></p>
                </div>
                <h2 className="text-tertiaryText">

                    Filled Vacancies: <AnimatedCounter end={filledVacancies} duration={3}/>
                </h2>

            </div>
        </section>
    );
};

export default TotalVacancies;
