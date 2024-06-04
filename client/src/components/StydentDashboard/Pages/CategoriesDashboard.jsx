// /path/to/your/CatégoriesDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CategoriesDashboard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJoinedCategories();
  }, []);

  const fetchJoinedCategories = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/api/categories/joined', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching joined categories:', error);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/coursAtachment/${categoryId}`);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mes Catégories
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:3000/api/categories/getImage/${category._id}`}
                alt={category.name}
                onClick={() => handleCategoryClick(category._id)}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tous les cours: {category.courses ? category.courses.length : 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CategoriesDashboard;

