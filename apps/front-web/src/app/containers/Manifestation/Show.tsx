import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Typography, CardMedia, CardContent, CardActions, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGet from '../../hooks/useGet';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

export const Manifestation = () => {
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();
  const { data, error, loading } = useGet(`/api/manifestation/${id}`);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
      return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title = {data.title}
        subheader = {data.start_date}
      />
    <CardMedia
      component="img"
      height="194"
      image="https://picsum.photos/200/300"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {data.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="before">
        <KeyboardDoubleArrowLeftIcon />
      </IconButton>
      <IconButton aria-label="next">
        <KeyboardDoubleArrowRightIcon />
      </IconButton>
      <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show chat"
        >
        <ExpandMoreIcon/>
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Comments:</Typography>
        <Typography paragraph>
          fezfezfezfezfef
        </Typography>
      </CardContent>
    </Collapse>
    </Card>
    </div>
  );
};
