import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

const Contacts = () => {
  const [reviews, setReviews] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/courses/all-reviews`
      );
      setReviews(response.data.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const columns = [
    { field: "userId", headerName: "userId", width: 400 },
    { field: "courseId", headerName: "Course ID", width: 500 },
    { field: "review", headerName: "Review", width: 500 },
  ];

  return (
    <Box>
      <Header title="Reviews" subTitle="List of reviews for admin dashboard" />

      <Box sx={{ height: 650, width: "99%", mx: "auto" }}>
        {courseId ? (
          <DataGrid
            slots={{
              toolbar: GridToolbar,
            }}
            rows={reviews}
            getRowId={(row) => row._id}
            columns={columns}
          />
        ) : (
          <Typography variant="h6" color="error">
            Course ID not provided.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Contacts;
