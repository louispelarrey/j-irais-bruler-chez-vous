import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useGet from '../../hooks/useGet';

export const Trash = () => {
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/trash/${id}`);

  if (loading) {
    return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" gutterBottom>
          {data.reference}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <ul>
            <li>{data.description}</li>
            <li>{data.createdAt}</li>
            <li>{data.posterId.email}</li>
            {data.burnerId && <li>{data.burnerId.email}</li>}
          </ul>
        </Typography>
      </Box>
    </div>
  );
};
