import { Box, Typography, Stack } from '@mui/material';

interface UserData {
  email: string;
  username: string;
}

export const ProfileComponent = ({ data }: { data: UserData }) => {

  const statistics = {
    trash: 30,
    manifestation: 10,
    notation: 3
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p: 2 }}>
      <Typography variant="h4" component="h1" mb={2}>
        Profile
      </Typography>
      {data && (
        <Box>
          <Typography variant="body1" component="p">
            Email: {data.email}
          </Typography>
          <Typography variant="body1" component="p">
            Pseudo: {data.username}
          </Typography>
        </Box>
      )}
      <Box sx={{ backgroundColor: '#f5f5f5', width: '100%', mt: 3, mb: 1, padding: '8px 0' }}>
        <Stack direction="row" spacing={2} sx={{ textAlign: 'center' }}>
          <Box sx={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid', borderRadius: '10px', p: 2, flexGrow: 1 }}>
            <Typography variant="subtitle1" component="h2">
              Poubelles
            </Typography>
            <Typography variant="h4">{statistics.trash}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid', borderRadius: '10px', p: 2, flexGrow: 1 }}>
            <Typography variant="subtitle1" component="h2">
              Manifestations
            </Typography>
            <Typography variant="h4">{statistics.manifestation}</Typography>
          </Box>
          <Box sx={{ backgroundColor: '#000000', color: '#ffffff', border: '1px solid', borderRadius: '10px', p: 2, flexGrow: 1 }}>
            <Typography variant="subtitle1" component="h2">
              Avis
            </Typography>
            <Typography variant="h4">{statistics.notation}</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
