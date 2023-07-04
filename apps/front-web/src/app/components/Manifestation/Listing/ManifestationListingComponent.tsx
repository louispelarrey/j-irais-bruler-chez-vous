import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material';
import { ManifestationModalComponent } from '../Modal/ManifestationModalComponent';
import { CardComponent } from './Card/ManifestationCardComponent';
import { UseFormRegister } from 'react-hook-form';
import { IManifestationOnSubmit } from '../../../containers/Manifestation/List';

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
      <Button onClick={handleOpen}>Créer une manifestation</Button>
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
            <Grid item xs={12} sm={12} md={12} lg={12} key={item.id}>
              <CardComponent
                key={item.id}
                title={item.title}
                description={item.description}
                address={item.address}
                start_date={item.start_date}
                manifestationId={item.id}
                creatorId={item.creatorId}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
