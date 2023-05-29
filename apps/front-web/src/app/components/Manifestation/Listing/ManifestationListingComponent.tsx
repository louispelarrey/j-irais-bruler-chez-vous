import { Button, Card, Grid, Modal, Typography } from '@mui/material';
import { ManifestationModalComponent } from '../Modal/ManifestationModalComponent';
import { CardComponent } from './Card/ManifestationCardComponent';
import { UseFormRegister } from 'react-hook-form';
import { IManifestationOnSubmit } from '../../../containers/Manifestation/List';

interface List {
  id: string;
  title: string;
  description: string;
  ville: string;
  start_date: string;
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
            <Card sx={{ height: 'fit-content' }}>
                <Button onClick={handleOpen}>Créer une manifestation</Button>
            </Card>
            {data.map((item: List) => (
                <CardComponent
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    ville={item.ville}
                    start_date={item.start_date}
                    image="https://picsum.photos/200/300"
                    manifestationId={item.id}
                />
            ))}
        </Grid>
    </>
    );
};
