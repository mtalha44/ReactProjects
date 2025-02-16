import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid } from "recharts";

const data = [
  { name: "Jan", sales: 4000, ratings: 3.8, engagement: 2400, performance: 75 },
  { name: "Feb", sales: 5000, ratings: 4.2, engagement: 3000, performance: 85 },
  { name: "Mar", sales: 7000, ratings: 4.5, engagement: 4200, performance: 90 },
  { name: "Apr", sales: 6000, ratings: 4.0, engagement: 3800, performance: 80 },
  { name: "May", sales: 8000, ratings: 4.8, engagement: 5200, performance: 95 },
];

const InteractiveChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col items-center bg-gray-900 text-white p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Interactive Sales & Engagement Chart</h2>
      <ResponsiveContainer width="90%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
          <Line type="monotone" dataKey="sales" stroke="#4CAF50" strokeWidth={3} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="ratings" stroke="#FFD700" strokeWidth={3} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="engagement" stroke="#FF5733" strokeWidth={3} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="performance" stroke="#00BFFF" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>

      {/* Hover Effect Bar Chart */}
      <ResponsiveContainer width="90%" height={150}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#ffffff" />
          <YAxis stroke="#ffffff" />
          <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff" }} />
          <Bar
            dataKey="sales"
            fill="#4CAF50"
            radius={[10, 10, 0, 0]}
            onMouseEnter={(_, index) => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animationDuration={300}
            barSize={(entry, index) => (hoveredIndex === index ? 50 : 30)} // Increases height on hover
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveChart;
