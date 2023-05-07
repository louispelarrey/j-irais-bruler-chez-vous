import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import useGet from "../../hooks/useGet";

interface Show {
    id: string;
    reference: string;
    description: string;
}

export const Trash = () => {
    const { id } = useParams();
    const { data, error, loading } = useGet(`/api/trash/${id}`);

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
                    { data.reference }
                </Typography>
                <Typography variant="body1" gutterBottom>
                    { data.description }
                </Typography>
            </Box>
        </div>
    )
}