import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { FaStar, FaUserTie, FaClock, FaUser } from "react-icons/fa";

function PopularCourses() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/categories/all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const joinCategory = async (categoryId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/categories/join/${categoryId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCategories(); // Optionally, update the list of categories after joining
    } catch (error) {
      console.error("Error joining category:", error);
    }
  };

  const calculatePeriod = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} Days`;
  };

  return (
    <Container fluid className="py-5">
      <Container>
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h3 className="section-title bg-white text-center text-primary px-3">
            Cours
          </h3>
          <h1 className="mb-5">Cours Populaires</h1>
        </div>
        <Row className="g-4 justify-content-center">
          {categories.map((category) => (
            <Col
              lg={4}
              md={6}
              className="wow fadeInUp"
              data-wow-delay="0.1s"
              key={category._id}
            >
              <div className="course-item bg-light">
                <div className="position-relative overflow-hidden">
                  <img
                    className="img-fluid"
                    src={`http://localhost:3000/api/categories/getImage/${category._id}`}
                    alt=""
                  />
                  <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                    <Button
                      href="#"
                      className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
                      style={{ borderRadius: "30px 0 0 30px" }}
                    >
                      Lire plus
                    </Button>
                    <Button
                      href="#"
                      className="flex-shrink-0 btn btn-sm btn-primary px-3"
                      style={{ borderRadius: "0 30px 30px 0" }}
                      onClick={() => joinCategory(category._id)}
                    >
                      Inscrivez-vous
                    </Button>
                  </div>
                </div>
                <div className="text-center p-4 pb-0">
                  <h5 className="mb-2">{category.name}</h5>
                  <p className="mb-2">{category.description}</p>
                </div>
                <div className="d-flex border-top">
                  <small className="flex-fill text-center border-end py-2">
                    <i className="fa fa-clock text-primary me-2"></i>
                    {calculatePeriod(category.dateDebut, category.dateFin)}
                  </small>
                  <small className="flex-fill text-center py-2">
                    <i className="fa fa-user text-primary me-2"></i>
                    {category.users.length} Students
                  </small>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default PopularCourses;
