import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

export interface TrashData {
    reference: string;
    description: string;
}

interface TrashProps {
    register: UseFormRegister<TrashData>;
    handleSubmit: any;
}

export const TrashComponent = ({handleSubmit, register}: TrashProps) => {
    return (
        <Grid container component="main">
            <Grid item component={Paper} elevation={6} square>
                <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="reference"
                        type="reference"
                        label="Référence"
                        autoComplete="reference"
                        {...register("reference")}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        type="description"
                        id="description"
                        autoComplete="description"
                        {...register("description")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                    Créer
                    </Button>
                </Box>
            </Box>
        </Grid>
    </Grid>
    )
}
