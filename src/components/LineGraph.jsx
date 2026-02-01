import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

export default function LineGraph({ data, type }) {
  const unit = useSelector((state) => state.root.settings.unit);

  const YLabel =
    type === "daily"
      ? unit === "C"
        ? "Temp (°C)"
        : "Temp (°F)"
      : unit === "C"
        ? "Hourly (°C)"
        : "Hourly (°F)";

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 16, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />

          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: 12, paddingBottom: "10px" }}
          />

          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            minTickGap={30}
            label={{
              value: `${type === "daily" ? "Date (MM/DD)" : "Time (HH:MM)"}`,
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
              value: YLabel,
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

          {type === "daily" && (
            <>
              <Line
                type="monotone"
                dataKey="avgTemp"
                name="Avg"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="maxTemp"
                name="Max"
                stroke="#dc2626"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="minTemp"
                name="Min"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </>
          )}

          {type === "hourly" && (
            <Line
              type="monotone"
              dataKey="temp"
              name="Temp"
              stroke="#2563eb"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
