import { CardComponent } from "../../components/Shared/CardComponent";
import { Box, Button, Card, Grid, Modal, Typography } from '@mui/material';
import useGet from "../../hooks/useGet";
import React from "react";
import { TrashComponent } from "../../components/Trash/TrashComponent";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import prodUrl from "../../utils/url/url";

interface List {
    id: string;
    reference: string;
    description: string;
}

export interface TrashData {
    reference: string;
    description: string;
}

export const Trashs = () => {
    const { data, error, loading } = useGet('/api/trash');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<TrashData>();

    const onSubmit = async ({ reference, description }: any) => {
        const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/trash`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reference,
                description
            }),
        });
        const data = await response.json();
        if(data.id) {
            navigate(`/trash/${data.id}`);
        }

    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    if(loading) {
        return <div>Loading...</div>;
    }

    if(error) {
        return <div>{error}</div>;
    }

    return (
        <Grid container spacing={2} sx={{ maxWidth: '1280px', mx: 'auto', px: 2 , my: 2}}>
            {data.map((item: List) => (
                <CardComponent
                    key={item.id}
                    title={item.reference}
                    description={item.description}
                    image="https://images.unsplash.com/photo-1616489953149-8e1b0e1b5f0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    trashId={item.id}
                />
            ))}
            <Card>
                <Button onClick={handleOpen}>Créer une poubelle</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Créer une poubelle
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TrashComponent handleSubmit={handleSubmit(onSubmit)} register={register} />
                        </Typography>
                    </Box>
                </Modal>
            </Card>
        </Grid>
    )
}
