import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import SignpostIcon from '@mui/icons-material/Signpost';
import { Link } from 'react-router-dom';

interface CardComponentProps {
  title: string;
  description: string;
  image: string;
  address: string;
  updatedAt: string;
  trashId: string;
}

export const CardComponent = ({
  title,
  description,
  image,
  address,
  updatedAt,
  trashId,
}: CardComponentProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
      <Card sx={{ height: '100%', maxWidth: "350px" }}>
        <CardMedia component="img" height="240" image={image} alt="image"/>
        <CardContent sx={{minHeight: '130px'}}> {/* Change here */}
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.length > 100
              ? description.substring(0, 100) + '...'
              : description}
          </Typography>
        </CardContent>
        <Divider light />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SignpostIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={address}
                secondary={new Date(updatedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              />
            </ListItem>
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions>
          <Button component={Link} to={`/trash/${trashId}`} size="small">
            Voir
          </Button>
          <Button component={Link} size="small">
            Prendre le contrat
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
