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
import getUserIdFromToken from 'apps/front-web/src/app/utils/user/getUserIdFromToken';

interface CardComponentProps {
    id: string;
    title: string;
    description: string;
    address: string;
    start_date: string;
    manifestationId: string;
    creatorId: string;
}

export const CardComponent = ({
    title,
    description,
    address,
    start_date,
    manifestationId,
    creatorId,
}: CardComponentProps) => {
    return (
      <Grid item xs={12} sm={6} md={4} sx={{ mb: 3 }}>
        <Card sx={{ maxWidth: 400, margin: 'auto' }}>
          <CardMedia>
            <ShowOnMap address={address} title={title} disableMarginTop={true} />
          </CardMedia>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Grid item xs={12}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Diversity3Icon />
                <Typography gutterBottom variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'right' }}>
                  {title}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sx={{ marginTop:2}}  >
              <Typography textAlign={"left"} variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Grid>
            <Grid container direction={"row"} sx={{ marginTop:2}}>
              <Grid xs={5}>
                <Typography textAlign={"left"} variant="body2" color="text.secondary">
                  {address}
                </Typography>
              </Grid>
              <Grid xs={2}>
              </Grid>
              <Grid xs={5}>
                <Typography textAlign={"right"} variant="body2" color="text.secondary">
                  {new Date(start_date).toLocaleString("fr-FR")}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider light />
          <CardActions>
            <Button component={Link} to={`/manifestation/${manifestationId}`} size="small">
              Voir
            </Button>
            {/*{ creatorId === getUserIdFromToken(localStorage.getItem('token') ?? '') && (*/}
            {/*<Button component={Link} to={`/manifestation/${manifestationId}/edit`} size="small">*/}
            {/*  Modifier*/}
            {/*</Button>*/}
            {/*)}*/}
          </CardActions>
        </Card>
      </Grid>
    );
  };
