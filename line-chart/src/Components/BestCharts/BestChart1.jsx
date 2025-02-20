import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

function BestChart1() {
  const count = 12; 
  const flatValue = 12; 
  const peakValue = 80; 

  const flatData = Array.from({ length: count }, (_, i) => ({
    name: i + 1,
    value: flatValue,
  }));

  const getPyramidData = (count, base, peak) => {
    const center = (count - 1) / 2;
    return Array.from({ length: count }, (_, i) => {
      const distance = Math.abs(i - center);
      const ratio = 1 - distance / center;
      const value = base + (peak - base) * ratio;
      return { name: i + 1, value };
    });
  };

  const pyramidData = getPyramidData(count, flatValue, peakValue);

  const sections = [
    { label: "99.9% Uptime", description: "Our platform ensures reliable and uninterrupted service, keeping your store online 24/7." },  
    { label: "Fast Shipping", description: "Get your orders delivered quickly with our optimized shipping network." },  
    { label: "500K+ Customers", description: "Join a growing community of satisfied shoppers who trust us for quality and service." },  
    { label: "$1M+ Sales", description: "Boost your revenue with our high-converting eCommerce platform." },  
    // { label: "Secure Payments", description: "Enjoy seamless and secure transactions with top-tier encryption and fraud protection." }      
  ];

  const [hoveredSection, setHoveredSection] = useState(-1);

  return (
    <div
      style={{
        // minHeight: "100vh",
        // backgroundColor: "#0E1B2A",
        backgroundColor: "#2222",
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent:"center",
        padding: "40px",
      }}
    >
      {sections.map((section, idx) => {
        const dataToShow = hoveredSection === idx ? pyramidData : flatData;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredSection(idx)}
            onMouseLeave={() => setHoveredSection(-1)}
            style={{
              width: "220px", // Reduce width to bring them closer
              textAlign: "center",
              color: "#222222",
              // color: "#58cbe6",
              position: "relative",
              cursor: "pointer",
              marginLeft: idx !== 0 ? "-0px" : "0px", // Overlaps sections slightly
            }}
          >
            {/* Section Heading */}
            <h2 style={{
                marginBottom: "10px",
                fontSize: "1.2rem",
                transform: hoveredSection === idx ? "translateY(-10px)" : "translateY(14rem)",
                transition: "transform 1s ease-in-out",
              }}>
              {section.label}
            </h2>

            {/* Description (Fixed Height to Avoid Moving Charts) */}
            <div style={{ minHeight: "30px" }}>
              <p
                style={{
                  fontSize: "1rem",
                  // color: "#ccc",
                  color : "#999",
                  opacity: hoveredSection === idx ? 1 : 0,
                  transition: hoveredSection === idx
                    ? "opacity 3s ease-in-out"
                    : "opacity 0s ease-in-out", // Disappear instantly on mouse leave
                }}
              >
                {section.description}
              </p>
            </div>

            {/* Chart Container */}
            <div style={{ width: "100%", height: "250px" }}>
              <ResponsiveContainer>
                <BarChart data={dataToShow} margin={{ top: 10, right: 0, left: 0, bottom: 10 }}>
                  <XAxis dataKey="name" hide />
                  <YAxis hide domain={[0, peakValue + 10]} />
                  <Bar
                    dataKey="value"
                    // fill="url(#gradient)"
                    fill="#58cbe6"
                    animationDuration={700}
                    
                    animationEasing="ease-in-out"
                    // animationEasing="linear"
                    barSize={10}
                    radius={[10, 10, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BestChart1;




