import { useState } from 'react';
import { Button, TextField } from '@mui/material';

export const ProfileComponent = ({ data }) => {
  const [formData, setFormData] = useState(data);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Adresse e-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Âge"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        {/* Ajoutez d'autres champs selon les informations de l'utilisateur */}
        <Button type="submit" variant="contained" color="primary">
          Valider l'update
        </Button>
      </form>
    </div>
  );
};
