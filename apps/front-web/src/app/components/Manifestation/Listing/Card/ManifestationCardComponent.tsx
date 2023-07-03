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
import { ShowOnMap } from '../../../Trash/View/Map/ShowOnMap';
import Diversity3Icon from '@mui/icons-material/Diversity3';

interface CardComponentProps {
    id: string;
    title: string;
    description: string;
    address: string;
    start_date: string;
    manifestationId: string;
}

export const CardComponent = ({
    title,
    description,
    address,
    start_date,
    manifestationId,
}: CardComponentProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
          <CardMedia>
            <ShowOnMap address={address} title={title} />
          </CardMedia>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Diversity3Icon />
                <Typography gutterBottom variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                {title}
              </Typography>
            </div>
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
  