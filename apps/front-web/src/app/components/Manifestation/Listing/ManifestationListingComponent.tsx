import {Box, Button, Card, Grid, IconButton, Modal, Typography} from '@mui/material';
import { ManifestationModalComponent } from '../Modal/ManifestationModalComponent';
import { CardComponent } from './Card/ManifestationCardComponent';
import { UseFormRegister } from 'react-hook-form';
import { IManifestationOnSubmit } from '../../../containers/Manifestation/List';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface List {
  id: string;
  title: string;
  description: string;
  address: string;
  start_date: string;
  creatorId: string;
}

interface IManifestationListingComponent {
  data: List[];
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  register: UseFormRegister<IManifestationOnSubmit>;
  handleSubmit: any;
  onSubmit: any;
}

export const ManifestationListingComponent = ({
  data,
  open,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  onSubmit,
}: IManifestationListingComponent) => {
  return (
    <>
      <Box>
        <Typography variant="h4" component="h1" sx={{ textAlign: 'center', marginTop:5 }}>
          Liste de vos manifestations
        </Typography>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          px: 2,
          my: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          overflowY: 'scroll',
        }}
      >
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ManifestationModalComponent
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
          />
        </Typography>
      </Modal>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <IconButton aria-label="Créer une manifestation" size="large" onClick={handleOpen}>
          <AddCircleIcon fontSize="inherit" sx={{
            width: '100%',
          }}/>
        </IconButton>
      </Box>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            px: 2,
            my: 2,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >

          {data.map((item: List) => (
              <CardComponent
                key={item.id}
                title={item.title}
                description={item.description}
                address={item.address}
                start_date={item.start_date}
                manifestationId={item.id}
                creatorId={item.creatorId}
               id={item.id}/>
          ))}
        </Grid>
      </Box>
    </>
  );
};
