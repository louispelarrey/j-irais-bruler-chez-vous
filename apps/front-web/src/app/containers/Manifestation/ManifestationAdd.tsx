import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ManifestationAdd() {

  const fields = [
    {
      'name' : 'nom',
      'label' : 'Nom',
      'value' : '',
      'required' : true,
      'type' : 'textfield'
    },{
      'name' : 'designation',
      'label' : 'Designation',
      'value' : '',
      'required' : true,
      'type' : 'textfield'
    },{
      'name' : 'heure_debut',
      'label' : 'Horaire de départ',
      'value' : '',
      'required' : true,
      'type' : 'dateTime'
    },
  ]
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Ajout d'une manifestation
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        {
          fields.map(item => {
            switch (item.type){
              case 'textfield':
                return <Grid item xs={12} sm={6} md={5}>
                  <TextField
                    required={item.required}
                    id={item.name}
                    name={item.name}
                    label={item.label}
                    value={item.value}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                break;
              case 'dateTime':
                return <Grid item xs={12} sm={6} md={5}>
                  <DatePicker label="Basic date picker" />
                </Grid>
                break;
              default:
                return <Grid item xs={12} sm={6} md={5}>
                  <TextField
                    required={item.required}
                    id={item.name}
                    name={item.name}
                    label={item.label}
                    value={item.value}
                    fullWidth
                    variant="standard"
                  />
                </Grid>
              }
          })
        }
      </Grid>
    </>
  );
}
