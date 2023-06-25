import React, { ReactElement, ReactNode } from 'react';

import { Link } from 'react-router-dom';
import { StyledImageViewer } from './Image/ImageViewer.style';
import { StyledImageDescription } from './ContractView.style';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { ShowOnMap } from './Map/ShowOnMap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Chat } from '../../../containers/Chat/Chat';

interface ContractData {
  id: string;
  reference: string;
  description: string;
  address: string;
  posterId: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
  };
  burners: any[];
  isBurned: boolean;
  fileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ContractViewProps {
  data: ContractData;
  isCreator: boolean;
  isContractTaken: boolean;
  onContractTaken: (uuid: string) => () => void;
  onContractCanceled: (uuid: string) => () => void;
  onContractDeleted: (uuid: string) => () => void;
  children: ReactElement<typeof Chat>;
}

export const ContractView: React.FC<ContractViewProps> = ({
  data: {
    reference,
    description,
    address,
    posterId,
    fileImageUrl,
    createdAt,
    updatedAt,
    burners,
    isBurned,
  },
  onContractTaken,
  onContractCanceled,
  onContractDeleted,
  isCreator,
  isContractTaken,
  children,
}) => {
  return (
    <StyledImageDescription>
      <IconButton
        component={Link}
        to="/posting"
        color="primary"
        sx={{
          position: 'absolute',
          marginTop: '2rem',
          marginLeft: '2rem',
          zIndex: 2,
          borderRadius: '50%',
          border: '1px solid rgb(144, 202, 249)',
          backgroundColor: '#121212',
          opacity: '0.9',
          color: 'rgb(144, 202, 249)',
          scale: '1.4',
          ':hover': {
            opacity: '1',
            backgroundColor: '#121212',
            transform: 'scale(1.2)',
            transition: 'all 0.2s ease-in-out',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <StyledImageViewer src={fileImageUrl} alt={reference} />
      <Card>
        <CardContent>
          <Typography variant="h4">{reference}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography variant="body1" color="text.secondary">
            {new Date(updatedAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
            })}
          </Typography>
        </CardContent>
        <Divider light />
        <CardContent
          sx={{
            marginTop: '-20px',
          }}
        >
          <ShowOnMap address={address} />
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textAlign: 'center',
              marginTop: '0.6rem',
            }}
          >
            {address}
          </Typography>
        </CardContent>
        <Divider light />
        <CardActions
          sx={{
            justifyContent: 'center',
            margin: '0.6rem',
          }}
        >
          {isCreator && (
            <Button
              size="small"
              variant="contained"
              color="error"
              sx={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '2rem',
              }}
              onClick={onContractDeleted(reference)}
            >
              <Typography variant="body1">Supprimer le contrat</Typography>
            </Button>
          )}
          {isContractTaken && (
            <Button
              size="small"
              variant="contained"
              color="error"
              sx={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '2rem',
              }}
              onClick={onContractCanceled(reference)}
            >
              <Typography variant="body1">
                Annuler la prise en charge
              </Typography>
            </Button>
          )}
          {!isCreator && !isContractTaken && (
            <Button
              size="small"
              variant="contained"
              sx={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '2rem',
              }}
              onClick={onContractTaken(reference)}
            >
              <Typography variant="body1">
                Prendre le contrat en charge !
              </Typography>
            </Button>
          )}
        </CardActions>
        {(isCreator || isContractTaken) && (
          <>
            <Divider light />
            <CardContent>{children}</CardContent>
          </>
        )}
        <Divider light />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            Publié par : {posterId.username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <Link
              to={`/profile/${posterId.id}`}
              style={{
                color: 'inherit',
              }}
            >
              Voir le profil de l'utilisateur
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </StyledImageDescription>
  );
};
