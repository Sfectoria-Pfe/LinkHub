import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "./LineChart";

const BarChart = () => {
  const theme = useTheme();
  return (
    <Box>
      <Header
        title="Bar Chart"
        subTitle="The minimum wage in Germany, France and Spain (EUR/month)"
      />
<LineChart />
    </Box>
  );
};

export default BarChart;
