import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Snackbar, Stack, Avatar } from "@mui/material";
import Header from "../../navigation/Header";
import Swal from "sweetalert2";

function ProfilStudent() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    telephone: "", // Added telephone field
    address: "", // Added address field
    avatar: "", // Added avatar field
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = response.data.user;
      setFormData({
        id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        telephone: userData.telephone || "", // handle case if telephone is null
        address: userData.address || "", // handle case if address is null
        avatar: userData.avatar || "", // handle case if avatar is null
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { id, firstName, lastName, email, telephone, address, avatar } =
        formData;
      const updatedData = {
        id,
        firstName,
        lastName,
        email,
        telephone,
        address,
        avatar,
      };

      await axios.put(
        `http://localhost:3000/api/users/updateUserss/${id}`,
        updatedData
      );

      Swal.fire("Succès !", "Profil mis à jour avec succès.", "success");

      setFormData(updatedData);
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
      setError(error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Header
        title="Modifier mon profil"
        subTitle="Modifiez vos informations ci-dessous"
      />

      {/* Display error message if there is an error */}
      {error && <div>Error: {error}</div>}

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Stack direction={"row"} gap={2} alignItems="center">
          <Avatar
            src={formData.avatar}
            sx={{ width: 80, height: 80, cursor: "pointer" }}
            onClick={() => document.getElementById("avatar-input").click()}
          />
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <Button variant="contained" component="label" htmlFor="avatar-input">
            Mettre à jour l'image
          </Button>
        </Stack>

        <TextField
          onChange={handleChange}
          name="firstName"
          value={formData.firstName}
          label="Prénom"
          variant="outlined"
        />

        <TextField
          onChange={handleChange}
          name="lastName"
          value={formData.lastName}
          label="Nom de famille"
          variant="outlined"
        />

        <TextField
          onChange={handleChange}
          name="email"
          value={formData.email}
          label="E-mail"
          variant="outlined"
        />

        <TextField
          onChange={handleChange}
          name="telephone"
          value={formData.telephone}
          label="Téléphone"
          variant="outlined"
        />

        <TextField
          onChange={handleChange}
          name="address"
          value={formData.address}
          label="Adresse"
          variant="outlined"
        />

        <Box sx={{ textAlign: "right" }}>
          <Button
            onClick={handleUpdateProfile}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            color="primary"
          >
            Enregistrer les modifications
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message="Profil mis à jour avec succès."
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProfilStudent;