import React from "react";
// import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import CategoriesDashboard from "../CategoriesDashboard"
import Button from "@mui/material/Button";
import { DownloadOutlined } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Header from "../../navigation/Header";

const DashboardStudent = () => {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Header
          isDashboard={true}
          title={"LinkHub"}
          subTitle={"Bienvenue dans votre tableau de bord"}
        />

      
      </Stack>

      <CategoriesDashboard />
      <Row2 />
      <Row3 />
    </div>
  );
};

export default DashboardStudent;
