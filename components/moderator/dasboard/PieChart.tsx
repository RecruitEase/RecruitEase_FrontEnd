import React, { PureComponent } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

// Define the shape of the data
interface DataItem {
  name: string;
  value: number;
}

// Define the props for the component
interface PieChartCardProps {
  data: DataItem[];
  dataKey: string;
  unit: string;
  colors: string[];
}

export default class PieChartCard extends PureComponent<PieChartCardProps> {
  static defaultProps = {
    data: [],
    dataKey: "value",
    unit: "",
    colors: ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57"],
  };

  render() {
    const { data, dataKey, unit, colors } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey={dataKey}
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ payload }) => {
              if (payload && payload.length) {
                const { name, value } = payload[0].payload;
                return (
                  <div className="custom-tooltip">
                    <p>{name}</p>
                    <p>{`${value} ${unit}`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
