"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Package 1", value: 400 },
  { name: "Package 2", value: 300 },
  { name: "Package 3", value: 300 },
];

class RevenueChartClass extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/two-simple-pie-chart-otx9h";

  render() {
    return (
      <ResponsiveContainer width="100%" height={130}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={25}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

export default function RevenueChart() {
  return <RevenueChartClass />;
}
