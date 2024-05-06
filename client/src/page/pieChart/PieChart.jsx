import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import RadarChart from "./RadarChart"; // Importez le composant RadarChart
import axios from "axios";

const PieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories/all");
        const formattedData = response.data.map(category => ({
          id: category.name,
          label: category.name,
          value: category.courses.length,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Radar Chart
      </Typography>
      <RadarChart data={data} />
    </Box>
  );
};

export default PieChart;
