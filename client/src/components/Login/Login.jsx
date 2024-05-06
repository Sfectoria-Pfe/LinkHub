import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "../../css/Registre.css";

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { errors } = formState;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Connexion réussie",
          text: "Vous êtes connecté avec succès!",
          timer: 1000,
          showConfirmButton: false,
        });

        localStorage.removeItem("selectedCategoryId");

        localStorage.setItem("token", response.data.token);

        // Rediriger en fonction du rôle de l'utilisateur
        const role = response.data.user.role;
        switch (role) {
          case "STUDENT":
            navigate("/dashboard/student");
            break;
          case "FORMATEUR":
            navigate("/dashboard/teacher");
            break;
          case "ADMIN":
            navigate("/dashboard/admin");
            break;
          default:
            // Traiter d'autres rôles ou cas inattendus
            break;
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Utilisateur non trouvé. Veuillez vérifier votre email.",
          });
        } else if (error.response.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Email ou mot de passe incorrect. Veuillez réessayer.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erreur de Connexion",
            text: "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          });
        }
      });
  };

  return (
    <div className="wap">
      <div className="wrapper">
        <h1 className="title">Connexion</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="email" className="input-box">
            <Form.Label>Email</Form.Label>
            <FormControl
              type="email"
              placeholder="Email"
              className="input"
              {...register("email", {
                required: true,
                message: { required: "Email is required" },
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

          <Button type="submit" variant="primary" className="btn">
            Connexion
          </Button>
        </Form>

        <div className="register-link">
          Vous n'avez pas de compte ?{" "}
          <Link to="/signup" className="Link">
            Inscrivez-vous
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
