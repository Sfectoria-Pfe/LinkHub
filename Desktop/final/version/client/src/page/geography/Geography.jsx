import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Swal from 'sweetalert2';

const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Th = styled(TableCell)`
  background-color: red;
  color: #ffffff;
  text-align: left;
  padding: 12px 15px;
`;

const Td = styled(TableCell)`
  padding: 12px 15px;
  border-bottom: 1px solid #dddddd;
  text-align: left;
`;

const Tr = styled(TableRow)`
  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Geography = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const handleDeactivate = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, désactiver !'
    });
  
    if (result.isConfirmed) {
      deactivateUser(id);
    }
  };
  
  const handleActivate = async (id) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, activer !'
    });
  
    if (result.isConfirmed) {
      activateUser(id);
    }
  };
  

  useEffect(() => {
    axios.get('http://localhost:3000/api/users/all')
      .then(response => {
        console.log('API response:', response);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Format de réponse inattendu');
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des utilisateurs !', error);
        setError('Une erreur s\'est produite lors de la récupération des utilisateurs');
      });
  }, []);

  const activateUser = (userId) => {
    axios.put(`http://localhost:3000/api/auth/${userId}/activate`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.map(user => user._id === userId ? { ...user, isActivee: true } : user));
          Swal.fire(
            'Activé !',
            'L\'utilisateur a été activé.',
            'success'
          );
        } else {
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de l\'activation de l\'utilisateur.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de l\'activation de l\'utilisateur !', error);
        Swal.fire(
          'Erreur !',
          'Une erreur s\'est produite lors de l\'activation de l\'utilisateur.',
          'error'
        );
      });
  };

  const deactivateUser = (userId) => {
    axios.put(`http://localhost:3000/api/auth/${userId}/deactivate`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.map(user => user._id === userId ? { ...user, isActivee: false } : user));
          Swal.fire(
            'Désactivé !',
            'L\'utilisateur a été désactivé.',
            'success'
          );
        } else {
          Swal.fire(
            'Erreur !',
            'Une erreur s\'est produite lors de la désactivation de l\'utilisateur.',
            'error'
          );
        }
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la désactivation de l\'utilisateur !', error);
        Swal.fire(
          'Erreur !',
          'Une erreur s\'est produite lors de la désactivation de l\'utilisateur.',
          'error'
        );
      });
  };

  return (
    <Container>
      <Title>Liste des utilisateurs</Title>
      {error ? (
        <Error>{error}</Error>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <Th>Nom</Th>
                <Th>Email</Th>
                <Th>Statut</Th>
                <Th>Rôle</Th>
                <Th>Action</Th>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <Tr key={user._id}>
                  <Td>{user.firstName} {user.lastName}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    {user.isActivee ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </Td>
                  <Td>
                    {user.isActivee ? (
                      <FaTimes onClick={() => handleDeactivate(user._id)} color="red" />
                    ) : (
                      <FaCheck onClick={() => handleActivate(user._id)} color="green" />

                    )}
                  </Td>
                </Tr>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Geography;
