import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 25 },
  { name: "Mar", value: 30 },
  { name: "Apr", value: 40 },
  { name: "May", value: 50 },
  { name: "Jun", value: 60 },
  { name: "Jul", value: 80 },
  { name: "Aug", value: 100 },
  { name: "Sep", value: 80 },
  { name: "Oct", value: 60 },
  { name: "Nov", value: 40 },
  { name: "Dec", value: 30 },
];

const InteractiveBarChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">$1M</h2>
      <p className="text-sm text-gray-400 mb-6">Estimated savings from improved efficiency</p>
      <ResponsiveContainer width="90%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
          <Bar
            dataKey="value"
            fill="url(#gradient)"
            radius={[10, 10, 0, 0]}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animationDuration={300}
            barSize={(entry, index) => (hoveredIndex === index ? 50 : 20)} // Grow effect
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0.3} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveBarChart;
