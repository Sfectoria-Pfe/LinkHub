import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

import "./Registre.css";

const Registre = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "STUDENT", // Default role
    },
    mode: "onTouched",
  });
  const { errors } = formState;
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    localStorage.getItem("selectedCategoryId")
  );

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/signup", data)
      .then((response) => {
        console.log(response);
        Swal.fire({
          icon: "success",
          title: "Inscription réussie",
          html: `Vous êtes inscrit avec succès! Veuillez vérifier votre email (${data.email}) pour l'activation.`,
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Erreur lors de l'inscription",
          text: "Une erreur s'est produite lors de l'inscription. Veuillez réessayer.",
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="wap">
      <div className="wrapper">
        <h1 className="title">Créer un compte</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="firstName" className="input-box">
            <Form.Label>Nom</Form.Label>
            <FormControl
              type="text"
              placeholder="Nom"
              className="input"
              {...register("firstName", { required: true })}
              style={{
                borderColor: errors.firstName ? "red" : "",
              }}
            />
            {errors?.firstName && (
              <span style={{ color: "red" }}>{errors.firstName?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="lastName" className="input-box">
            <Form.Label>Prénom</Form.Label>
            <FormControl
              type="text"
              placeholder="Prénom"
              className="input"
              {...register("lastName", { required: true })}
              style={{
                borderColor: errors.lastName ? "red" : "",
              }}
            />
            {errors?.lastName && (
              <span style={{ color: "red" }}>{errors.lastName?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="email" className="input-box">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              style={{
                borderColor: errors.email ? "red" : "",
              }}
            />
            {errors?.email && (
              <span style={{ color: "red" }}>{errors.email?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="password" className="input-box">
            <Form.Label>Mot de passe</Form.Label>
            <FormControl
              type="password"
              placeholder="Mot de passe"
              className="input"
              {...register("password", { required: true })}
              style={{
                borderColor: errors.password ? "red" : "",
              }}
            />
            {errors?.password && (
              <span style={{ color: "red" }}>{errors.password?.message}</span>
            )}
          </Form.Group>

          <Form.Group controlId="role" className="input-box">
            <Form.Label>Rôle</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Étudiant"
                {...register("role", { required: true })}
                value="STUDENT"
              />
              <Form.Check
                inline
                type="radio"
                label="Formateur"
                {...register("role", { required: true })}
                value="FORMATEUR"
              />
            </div>
            {errors?.role && (
              <span style={{ color: "red" }}>Le rôle est requis</span>
            )}
          </Form.Group>

          <Button type="submit" variant="primary" className="btn">
            S'inscrire
          </Button>
        </Form>

        <div className="register-link">
          Vous avez déjà un compte ?{" "}
          <Link
            to={`/login/?categoryId=${selectedCategoryId}`}
            className="Link"
          >
            Connexion
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registre;
