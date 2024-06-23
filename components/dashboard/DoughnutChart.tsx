"use client"
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {ArcElement, Chart, Legend, Tooltip} from "chart.js";

Chart.register(ArcElement,Tooltip,Legend)

const DoughnutChart = ({active,filled}:DoughnutChartProps) => {

    const data={
        datasets:[
            {
                label:'Vacancies',
                data:[active,filled],
                backgroundColor:['#062e72','#3c7cea']
            }
        ],
        labels:['Active','Filled']
    }

    return (
        <Doughnut data={data}
        options={{
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />

    );
};

export default DoughnutChart;
