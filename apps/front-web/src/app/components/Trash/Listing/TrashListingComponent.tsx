import {
  Button,
  Card,
  Grid,
  Modal,
  Pagination,
  Typography,
} from '@mui/material';
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

export interface Data {
  trashs: List[];
  total: number;
  totalPages: number;
  currentPage: number;
}

interface ITrashListingComponent {
  data: Data | undefined;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  register: UseFormRegister<TrashData>;
  handleSubmit: any;
  onSubmit: any;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setPage: (page: number) => void;
  page: number;
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
  page,
  setPage,
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
          <Button onClick={handleOpen} sx={{ fontSize: '1rem' }}>
            Créer une annonce
          </Button>
        </Card>
      </Grid>

      <StyledTrashListingComponent>
        {data &&
          data.trashs.map((item: List) => (
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
      {data && (
        <Pagination
          count={data.totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        />
      )}
    </>
  );
};
