import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { MonthlyApplication } from "../features/allJobs/allJobsSlice";

type Props = { data: MonthlyApplication[] | [] };

const BarChartComponent = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#6eccaf" barSize={75} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
