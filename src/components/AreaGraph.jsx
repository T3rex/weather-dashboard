import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

const AreaGraph = ({ data }) => {
  return (
    <div className="w-full h-[250px] md:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 16,
            right: 10,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
            label={{
              value: `Date (MM/DD)`,
              position: "insideBottom",
              offset: -5,
              style: { fontSize: 11, fill: "#6b7280", fontWeight: 500 },
            }}
          />

          <YAxis
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
            label={{
              value: "Humidity (%)",
              angle: -90,
              position: "insideLeft",
              style: {
                fontSize: 11,
                fill: "#6b7280",
                fontWeight: 500,
                textAnchor: "middle",
              },
            }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />

          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#6366f1"
            fill="#6366f1"
            strokeWidth={2}
            fillOpacity={0.25}
          />

          <RechartsDevtools />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
