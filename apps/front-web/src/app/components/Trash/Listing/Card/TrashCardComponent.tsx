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
  isBurned: boolean;
}

export const CardComponent = ({
  title,
  description,
  image,
  address,
  updatedAt,
  trashId,
  isBurned
}: CardComponentProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
      <Card sx={{ height: '100%',
        maxWidth: "350px",
        maxHeight: "550px",
        opacity: isBurned ? 0.5 : 1,
        ...(isBurned && {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            background: 'repeating-linear-gradient(45deg, #80808033, #80808033 10px, transparent 10px, transparent 20px)',
            zIndex: 1,
          },
        }),
      }}>
        <CardMedia component="img" height="240" src={image} alt="image"/>
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
          <Button component={Link} to={`/posting/${trashId}`} size="small" disabled={isBurned}>
            Voir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
