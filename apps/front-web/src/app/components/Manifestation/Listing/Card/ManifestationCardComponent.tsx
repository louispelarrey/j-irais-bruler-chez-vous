import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface CardComponentProps {
    id: string;
    title: string;
    description: string;
    image: string;
    address: string;
    start_date: string;
    manifestationId: string;
}

export const CardComponent = ({
    title,
    description,
    image,
    address,
    start_date,
    manifestationId,
}: CardComponentProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
          <CardMedia component="img" height="140" image={image} alt="image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {start_date}
            </Typography>
          </CardContent>
          <Divider light />
          <CardActions>
            <Button component={Link} to={`/manifestation/${manifestationId}`} size="small">
              Voir
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  };
  