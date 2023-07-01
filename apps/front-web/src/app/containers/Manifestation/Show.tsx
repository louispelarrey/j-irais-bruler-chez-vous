import { useParams } from 'react-router-dom';
import { Card, CardHeader, Typography, CardMedia, CardContent, CardActions, Collapse, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGet from '../../hooks/useGet';
import { Chat } from '../Chat/Chat';
import { useChat } from '../../hooks/useChat';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState, Fragment } from 'react';


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

const usePost = (url: string, body: any) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { data, error, loading };
};

export const Manifestation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: currentManifestation, error, loading} = useGet(`/api/manifestation/${id}`);
  const { data: myManifestations } = usePost('/api/manifestation/me', {});
  const { messages, userId, scrollTarget, handleSubmit, register, sendMessage } = useChat({
    roomName: 'default',
  });
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const currentIndex = myManifestations.findIndex((manifestation: any) => manifestation.id === id);
  const previousManifestation = currentIndex > 0 ? myManifestations[currentIndex - 1] : null;
  const nextManifestation = currentIndex < myManifestations.length - 1 ? myManifestations[currentIndex + 1] : null

  const handlePreviousManifestation = useCallback(() => {
    if (previousManifestation) {
      navigate(`/manifestation/${previousManifestation.id}`);
    }
  }, [navigate, previousManifestation]);

  const handleNextManifestation = useCallback(() => {
    if (nextManifestation) {
      navigate(`/manifestation/${nextManifestation.id}`);
    }
  }, [navigate, nextManifestation]);

  const onLeaveManifestation = useCallback(
    () => async () => {
      const response = await fetch(`/api/manifestation/${id}/leave`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();

      if (data.statusCode === 401) {
        navigate('/');
      }

      if (data.id) {
        navigate('/');
      }
    },
    [id, navigate]
  );

  if (loading || !currentManifestation || !myManifestations) {
      return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Card sx={{ width: '100%' }}>
        <CardMedia
          component="img"
          height="194"
          image="https://picsum.photos/200/300"
          alt="Paella dish"
        />
        <CardHeader
          title = {currentManifestation.title}
          subheader = {
            new Date(currentManifestation.start_date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
            })}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {currentManifestation.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container spacing={2} justifyContent="center">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={6}>
                    {previousManifestation && (
                      <Fragment>
                        <IconButton aria-label="before" onClick={handlePreviousManifestation}>
                          <KeyboardDoubleArrowLeftIcon />
                        </IconButton>
                        <Button variant="text" color="primary" onClick={handlePreviousManifestation}>
                          Précédent
                        </Button>
                      </Fragment>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    {nextManifestation && (
                      <Fragment>
                        <Button variant="text" color="primary" onClick={handleNextManifestation}>
                          Suivant
                        </Button>
                        <IconButton aria-label="next" onClick={handleNextManifestation}>
                          <KeyboardDoubleArrowRightIcon />
                        </IconButton>
                      </Fragment>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container justifyContent="center">
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show chat"
                >
                  <Typography>Discuter</Typography>
                  <ExpandMoreIcon/>
                </ExpandMore>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Chat roomName={currentManifestation.id} heightVh={50}/>
            </CardContent>
        </Collapse>
      </Card>
      <Paper
        style={{
          position: 'sticky',
          bottom: '0',
          width: '100%',
          padding: '1rem',
          borderRadius: '0',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          zIndex: 99999,
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="error"
          sx={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '2rem',
          }}
          onClick={onLeaveManifestation()}
        >
          <Typography variant="body1">Quitter</Typography>
        </Button>
      </Paper>
    </div>
  );
};
