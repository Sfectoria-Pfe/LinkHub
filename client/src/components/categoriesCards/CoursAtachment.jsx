import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate hooks

const CoursAtachment = () => {
  const { categoryId } = useParams(); // Get categoryId from URL parameters
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    getAllCoursesInCategory(categoryId);
  }, [categoryId]);

  const getAllCoursesInCategory = async (categoryId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/categories/getAllCoursesInCategory/${categoryId}`
      );
      setCourses(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching courses in category:", error);
    }
  };

  const handleButtonClick = (courseId) => {
    navigate(`/readCourse/student/${courseId}`); // Navigate to the specified route with the courseId
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Tous les cours
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {course.name}
                </Typography>
                {/* Button to navigate to the specified route */}
                <Button
                  variant="contained"
                  onClick={() => handleButtonClick(course._id)}
                >
                  acceder
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CoursAtachment;
