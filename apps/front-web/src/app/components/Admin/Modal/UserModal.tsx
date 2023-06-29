import { Modal, Button, TextField, Box } from '@mui/material';

const UserModalComponent = ({ open, onClose, onSubmit, defaultValue }: any) => {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onSubmit(e.target.username.value);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#000000',
                    p: 4,
                    borderRadius: '8px',
                    outline: 'none',
                    width: '90%',
                    maxWidth: '400px',
                    '@media (min-width: 600px)': {
                        width: '60%',
                        maxWidth: '600px',
                    },
                }}
            >
                <h1>Modifier l'utilisateur</h1>
                <form onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nom d'utilisateur"
                        id="username"
                        defaultValue={defaultValue.username}
                        autoComplete="username"
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Enregistrer
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default UserModalComponent;