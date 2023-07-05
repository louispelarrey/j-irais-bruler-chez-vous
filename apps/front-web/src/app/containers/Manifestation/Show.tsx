import {Link, useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGet from '../../hooks/useGet';
import {Chat} from '../Chat/Chat';
import {useChat} from '../../hooks/useChat';
import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import {ShowOnMap} from '../../components/Trash/View/Map/ShowOnMap';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {UserContext} from "../../contexts/UserContext";
import getUserIdFromToken from "../../utils/user/getUserIdFromToken";

export interface ManifestationData {
  title: string;
  description: string;
  address: string;
  start_date: string;
  end_date: string;
  latitude: number;
  longitude: number;
  creatorId: string;
  participants: any[];
  id: string;
}


const usePost = (url: string, body: any) => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const {token} = useContext(UserContext);
  const userId = getUserIdFromToken(token);

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
  return {data, error, loading};
};

export const Manifestation = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const {data: currentManifestation, error, loading} = useGet(`/api/manifestation/${id}`);
  const {data: myManifestations} = usePost('/api/manifestation/me', {});
  const {messages, userId, scrollTarget, handleSubmit, register, sendMessage} = useChat({
    roomName: 'default',
  });


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
    async () => {
      try {
        const response = await fetch(`/api/manifestation/${id}/left`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          navigate('/manifestation');
        }
      } catch (error) {
        navigate('/');
      }
    },
    [navigate, id]
  );

  if (loading || !currentManifestation || !myManifestations) {
    return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const mapKey = currentManifestation ? currentManifestation.id : null;

  const scrollToChat = () => {
    const chat = document.getElementById('chat_section_manifestation');
    if (chat) {
      chat.scrollIntoView({behavior: 'smooth'})
    }
  }

  const onDeleteManifestation = async (manifestationId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/api/manifestation/${manifestationId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      const data = await response.json();

      if (response.status === 200) {
        navigate('/manifestation');
      }
    } catch (error) {
      navigate('/');
    }
  };

  const getManifestationAction = (manifestation: ManifestationData) => {
    if (manifestation.creatorId === userId) {
      return (
        <Button
          size="small"
          variant="contained"
          color="error"
          sx={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '2rem',
          }}
          onClick={() => onDeleteManifestation(manifestation.id)}
        >
          <Typography variant="body1">
            Supprimer
          </Typography>
        </Button>
      )
    } else if (manifestation.participants.find((participant: any) => participant === userId) === userId) {
      return (
        <Button
          size="small"
          variant="contained"
          color="error"
          sx={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '2rem',
          }}
          onClick={() => onLeaveManifestation()}
        >
          <Typography variant="body1">
            Quitter
          </Typography>
        </Button>
      )
    }
  }

  return (
    <div style={{
      backgroundColor: "#121212",
    }}>
      <IconButton
        component={Link}
        to="/manifestation"
        color="primary"
        sx={{
          position: 'absolute',
          marginTop: '2rem',
          marginLeft: '2rem',
          zIndex: 3000,
          borderRadius: '50%',
          border: '1px solid white',
          backgroundColor: '#121212',
          opacity: '0.92',
          color: 'white',
          scale: '1.33',
          ':hover': {
            opacity: '1',
            backgroundColor: '#121212',
            transform: 'scale(1.2)',
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <ArrowBackIcon/>
      </IconButton>
      <Grid container justifyContent={"space-around"} >
        <Grid xs={12} sx={{
          marginY: '2rem',
        }}>
          <Box>
            <Typography variant={"h5"} color={"white"} textAlign={'center'} >
              Venez participer à la manifestation
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6} sx={{
          maxWidth: '40%',
          borderRight: '1px solid white',
          paddingX: '2rem',
          height: '80%',
        }}>
          <Paper sx={{
            backgroundColor: '#121212',
            padding: '1rem',
            minHeight: '63vh',
          }}>
            <ShowOnMap
              key={mapKey}
              title={currentManifestation.title}
              address={currentManifestation.address}
              disableMarginTop={true}
            />
            <Grid container sx={{
              marginTop: '1rem',
            }}>
              <Grid item xs={5}>
                <Typography variant={"h5"} color={"white"}>
                  {currentManifestation.title}
                </Typography>
              </Grid>
              <Grid item xs={7}>
                <Typography variant={"h5"} color={"white"} textAlign={'right'}>
                  {
                    new Date(currentManifestation.start_date).toLocaleDateString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                    })
                  }
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary">
              {currentManifestation.description}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5} lg={5} sx={{
          maxWidth: '40%',
        }}>
          <Chat roomName={currentManifestation.id} heightVh={50}/>
        </Grid>
        <Grid item xs={12} spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                {previousManifestation && (
                  <Fragment>
                    <IconButton aria-label="before" onClick={handlePreviousManifestation}>
                      <KeyboardDoubleArrowLeftIcon/>
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
                      <KeyboardDoubleArrowRightIcon/>
                    </IconButton>
                  </Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '1rem',
          borderRadius: '0',
          borderTop: '1px solid rgba(255, 255, 255, 0.8)',
          zIndex: 99999,
        }}
      >
        {
          getManifestationAction(currentManifestation)
        }
      </Paper>
    </div>
  );
};
