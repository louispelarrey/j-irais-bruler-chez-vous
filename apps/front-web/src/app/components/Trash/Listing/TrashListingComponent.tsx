import { Button, Card, Grid, Modal, Typography } from '@mui/material';
import { TrashModalComponent } from '../Modal/TrashModalComponent';
import { CardComponent } from './Card/TrashCardComponent';
import { StyledTrashBox } from './Box/TrashBox.style';
import { UseFormRegister } from 'react-hook-form';
import { ITrashOnSubmit } from '../../../containers/Trash/List';

interface List {
  id: string;
  reference: string;
  description: string;
}

interface ITrashListingComponent {
  data: List[];
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  register: UseFormRegister<ITrashOnSubmit>;
  handleSubmit: any;
  onSubmit: any;
}

export const TrashListingComponent = ({
  data,
  open,
  handleOpen,
  handleClose,
  register,
  handleSubmit,
  onSubmit,
}: ITrashListingComponent) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          mx: 'auto',
          px: 2,
          my: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Card sx={{ height: 'fit-content' }}>
          <Button onClick={handleOpen}>Créer une annonce</Button>
        </Card>
        {data.map((item: List) => (
          <CardComponent
            key={item.id}
            title={item.reference}
            description={item.description}
            image="https://picsum.photos/200/300"
            trashId={item.id}
          />
        ))}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          mx: 'auto',
          px: 2,
          my: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '20vh',
        }}
      >
        <StyledTrashBox>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TrashModalComponent
              handleSubmit={handleSubmit(onSubmit)}
              register={register}
            />
          </Typography>
        </StyledTrashBox>
      </Modal>
    </>
  );
};
