import { Card, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

interface CardComponentProps {
  title: string;
  description: string;
  image?: string;
  redirectUrl: string;
}

export const CardComponent = ({
  title,
  description,
  image,
  redirectUrl,
}: CardComponentProps) => {
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
      <Card sx={{ height: '100%' }}>
        {
          image &&
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt="image"
            />
        }

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={redirectUrl} size="small">
            Voir
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

