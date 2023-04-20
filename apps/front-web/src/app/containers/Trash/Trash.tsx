import { useTrash } from "../../hooks/useTrash";
import { Box, Typography } from "@mui/material";

interface Trash {
    id: string;
    name: string;
    description: string;
}

export const Trash = ({ id }: { id: string }) => {
    const { data, error, loading } = useTrash(id);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <Box sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography variant="h2" gutterBottom>
                    { data[0].name }
                </Typography>
                <Typography variant="body1" gutterBottom>
                    { data[0].description }
                </Typography>
            </Box>
        </div>
    )
}