import React, { useState, useEffect, useCallback, useMemo } from "react";
import { PieChart, Pie, ResponsiveContainer } from "recharts";

const EventGenresChart = ({ events }) => {
  // Wrap the initialization of genres in useMemo
  const genres = useMemo(
    () => ["React", "JavaScript", "Node", "jQuery", "Angular"],
    []
  );

  const [data, setData] = useState([]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
    return percent ? (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  const getData = useCallback(() => {
    const data = genres.map((genre) => {
      const filteredEvents = events.filter((event) =>
        event.summary.includes(genre)
      );
      return {
        name: genre,
        value: filteredEvents.length,
      };
    });
    return data;
  }, [events, genres]); // Include events and genres in the dependency array

  useEffect(() => {
    setData(getData());
  }, [getData]); // Include getData in the dependency array

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={130}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
