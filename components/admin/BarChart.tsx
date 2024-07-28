import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface Props {
  data: DataPoint[];
  units: string;
}

export default class BarChartCard extends PureComponent<Props> {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/composed-chart-of-same-data-3cs8ym";

  render() {
    const { data, units } = this.props;

    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis label={{ value: units, angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
