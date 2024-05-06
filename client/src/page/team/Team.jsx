import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import Header from "../../components/Header";
import Swal from "sweetalert2";

const Team = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/all");
      setRows(
        response.data.map((user) => ({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          password: user.password,
          access:
            user.role === "ADMIN"
              ? "Admin"
              : user.role === "STUDENT"
              ? "Utilisateur"
              : user.role === "FORMATEUR"
              ? "Gestionnaire"
              : "Inconnu",
        }))
      );
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const deleteUser = async (id) => {
    // Afficher une alerte de confirmation en utilisant SweetAlert2
    Swal.fire({
      icon: "warning",
      title: "Êtes-vous sûr(e) ?",
      text: "Voulez-vous vraiment supprimer cet utilisateur ?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, le supprimer !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/users/delete/${id}`);
          setRows(rows.filter((row) => row.id !== id));
          Swal.fire("Succès !", "Utilisateur supprimé avec succès.", "success");
        } catch (error) {
          console.error(
            "Erreur lors de la suppression de l'utilisateur :",
            error
          );
          Swal.fire(
            "Erreur !",
            "Échec de la suppression de l'utilisateur.",
            "error"
          );
        }
      }
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(
          `http://localhost:3000/api/users/update/${formData.id}`,
          formData
        );
        Swal.fire("Succès !", "Utilisateur mis à jour avec succès.", "success");
      } else {
        await axios.post("http://localhost:3000/api/users/create", formData);
        Swal.fire("Succès !", "Utilisateur créé avec succès.", "success");
      }
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
      });
      fetchData();
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      Swal.fire(
        "Erreur !",
        "Échec de l'enregistrement de l'utilisateur.",
        "error"
      );
    }
  };

  const handleEdit = (user) => {
    setFormData({ ...user });
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "Prénom",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Nom de famille",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "E-mail",
      width: 140,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "access",
      headerName: "Accès",
      width: 200,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              p: "5px",
              borderRadius: "3px",
              textAlign: "center",
              backgroundColor:
                row.access === "Admin"
                  ? theme.palette.primary.dark
                  : row.access === "Manager"
                  ? theme.palette.secondary.dark
                  : "#3da58a",
              color: "#fff",
              minWidth: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {row.access === "Admin" && (
              <AdminPanelSettingsOutlined fontSize="small" />
            )}
            {row.access === "Manager" && <SecurityOutlined fontSize="small" />}
            {row.access === "Utilisateur" && (
              <LockOpenOutlined fontSize="small" />
            )}
            <Typography sx={{ fontSize: "13px", marginLeft: 2 }}>
              {row.access}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      width: 300,
      align: "left",
      headerAlign: "center",
      renderCell: ({ row }) => (
        <>
          <Button
            variant="contained"
            className="me-2"
            style={{ backgroundColor: "#007198", color: "#fff" }}
            onClick={() => deleteUser(row.id)}
          >
            Supprimer
          </Button>

          <Button
            variant="contained"
            color="primary"
            className="me-2"
            style={{ backgroundColor: "#0594D0", color: "#fff" }}
            onClick={() => handleEdit(row)}
          >
            Modifier
          </Button>

          {formData.id && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Mettre à jour l'utilisateur
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <Box>
      <Header title={"ÉQUIPE"} subTitle={"Gestion des membres de l'équipe"} />

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="h5">Ajouter / Modifier un utilisateur</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            name="firstName"
            label="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="lastName"
            label="Nom de famille"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="E-mail"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            name="role"
            label="Rôle"
            value={formData.role}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="ADMIN">Admin</MenuItem>
            <MenuItem value="STUDENT">Utilisateur</MenuItem>
            <MenuItem value="FORMATEUR">Gestionnaire</MenuItem>
          </TextField>
          <TextField
            name="password"
            label="Mot de passe"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" color="primary">
              Ajouter un utilisateur
            </Button>
            {formData.id && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFormData({})}
              >
                Effacer
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Team;
