import { Button, Card, Grid, Modal, Typography } from '@mui/material';
import { TrashData, TrashModalComponent } from '../Modal/TrashModalComponent';
import { CardComponent } from './Card/TrashCardComponent';
import { UseFormRegister } from 'react-hook-form';
import { StyledTrashListingComponent } from './TrashListingComponent.style';

export interface List {
  id: string;
  reference: string;
  description: string;
  updatedAt: string;
  fileImageUrl: string;
  isBurned: boolean;
  latitude: number;
  longitude: number;
  address: string;
}

interface ITrashListingComponent {
  data: List[] | undefined;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  register: UseFormRegister<TrashData>;
  handleSubmit: any;
  onSubmit: any;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}

export const TrashListingComponent = ({
  data,
  open,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  onSubmit,
  setLatitude,
  setLongitude,
}: ITrashListingComponent) => {
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
          <TrashModalComponent
            handleSubmit={handleSubmit(onSubmit)}
            register={register}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </Typography>
      </Modal>
      <Grid
        container
        spacing={2}
        sx={{
          px: 2,
          my: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Card>
          <Button onClick={handleOpen} sx={{ fontSize: '1rem'}}>Créer une annonce</Button>
        </Card>
      </Grid>

      <StyledTrashListingComponent>
        {data && data.map((item: List) => (
          <CardComponent
            key={item.id}
            title={item.reference}
            description={item.description}
            updatedAt={item.updatedAt}
            address={item.address}
            image={item.fileImageUrl}
            trashId={item.id}
            isBurned={item.isBurned}
          />
        ))}
      </StyledTrashListingComponent>
    </>
  );
};
