
import { Divider, Fab, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { StyledChat } from './ChatComponent.style';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns'
import { MutableRefObject } from 'react';
import { Message } from '../../hooks/useChat';

interface ChatComponentProps {
  messages: Message[];
  handleSubmit: any;
  register: any;
  userId?: string | null;
  scrollTarget: MutableRefObject<any>;
  heightPercentage: number;
  widthPercentage: number;
}

export const ChatComponent = ({
  messages,
  handleSubmit,
  register,
  userId,
  scrollTarget,
  heightPercentage,
  widthPercentage,
}: ChatComponentProps) => {
  return (
    <StyledChat heightPercentage={heightPercentage} widthPercentage={widthPercentage}>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={12}>
          <List className="messageArea">
            <ListItem key="2">
              <Grid container>
                {messages && messages.map((message, index) => (
                  <Grid item xs={12} key={index}>
                    <ListItemText
                      align={message.userId === userId ? 'right' : 'left'}
                      primary={message.message}
                      //Format date
                      secondary={message.username + " | " + format(new Date(message.createdAt), 'dd/MM HH:mm')}>
                    </ListItemText>
                  </Grid>
                ))}
              </Grid>
            </ListItem>
            <div ref={scrollTarget} />
          </List>
          <Divider />
          <FormControl className="interact" component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              style={{}}
              label="Ecris quelque chose"
              fullWidth
              {...register('newMessage')}
              className="messageInput"
            />
            <Fab color="primary" aria-label="add" type='submit' >
              <SendIcon />
            </Fab>
          </FormControl>
        </Grid>
      </Grid>
    </StyledChat>
  );
};
