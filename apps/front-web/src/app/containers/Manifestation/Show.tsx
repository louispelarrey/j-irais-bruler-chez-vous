import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, Typography, CardMedia, CardContent, CardActions, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useGet from '../../hooks/useGet';
import { ChatComponent } from '../../components/Chat/ChatComponent';
import { useChat } from '../../hooks/useChat';


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
  const [data, setData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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
        console.log(data);
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
  const [expanded, setExpanded] = React.useState(false);
  const { id } = useParams();
  const { data: currentManifestation, error, loading} = useGet(`/api/manifestation/${id}`);
  const { data: myManifestations } = usePost('/api/manifestation/me', {});
  const { messages, userId, scrollTarget, handleSubmit, register, sendMessage } = useChat({
    roomName: 'default',
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading || !currentManifestation || !myManifestations) {
      return <div>Chargement ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const currentIndex = myManifestations.findIndex((manifestation: any) => manifestation.id === id);
  const previousManifestation = currentIndex > 0 ? myManifestations[currentIndex - 1] : null;
  const nextManifestation = currentIndex < myManifestations.length - 1 ? myManifestations[currentIndex + 1] : null

  const handlePreviousManifestation = () => {
    if (previousManifestation) {
      // Rediriger vers la page de la manifestation précédente
      window.location.href = `/manifestation/${previousManifestation.id}`;
    }
  };

  const handleNextManifestation = () => {
    if (nextManifestation) {
      // Rediriger vers la page de la manifestation suivante
      window.location.href = `/manifestation/${nextManifestation.id}`;
    }
  };

  return (
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title = {currentManifestation.title}
        subheader = {currentManifestation.start_date}
      />
    <CardMedia
      component="img"
      height="194"
      image="https://picsum.photos/200/300"
      alt="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {currentManifestation.description}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      {previousManifestation && (
        <IconButton aria-label="before" onClick={handlePreviousManifestation}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>
      )}
      {nextManifestation && (
        <IconButton aria-label="next" onClick={handleNextManifestation}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      )}
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
        <Typography paragraph>Chat :</Typography>
        <ChatComponent
          messages={messages}
          handleSubmit={handleSubmit(sendMessage)}
          register={register}
          userId={userId}
          scrollTarget={scrollTarget}
          heightPercentage={90}
          widthPercentage={100}
        />
        </CardContent>
    </Collapse>
    </Card>
    </div>
  );
};
