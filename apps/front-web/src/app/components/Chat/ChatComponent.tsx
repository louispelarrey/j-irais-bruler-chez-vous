
import { Button, Divider, Fab, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { StyledChat } from './ChatComponent.style';
import SendIcon from '@mui/icons-material/Send';
import { format } from 'date-fns'
import { MutableRefObject } from 'react';
import { Message } from '../../hooks/useChat';
import { FlagCircleRounded } from '@mui/icons-material';

interface ChatComponentProps {
  messages: Message[];
  handleSubmit: any;
  register: any;
  userId?: string | null;
  scrollTarget: MutableRefObject<any>;
  heightVh: number;
  widthPercentage: number;
  handleReport: (messageId: string) => void;
  isReported?: boolean;
}

export const ChatComponent = ({
  messages,
  handleSubmit,
  register,
  userId,
  scrollTarget,
  heightVh,
  widthPercentage,
  handleReport,
  isReported,
}: ChatComponentProps) => {
  return (
    <StyledChat heightVh={heightVh} widthPercentage={widthPercentage}>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={12}>
          <List className="messageArea">
            <ListItem key="2">
              <Grid container>
                {messages && messages.map((message, index) => (
                  <Grid container justifyContent={message.userId === userId ? 'flex-end' : 'flex-start'}>
                    <ListItemText
                      align={message.userId === userId ? 'right' : 'left'}
                      primary={message.message}
                      secondary={
                        <>
                          <span>{message.username + " | "}</span>
                          <span>{format(new Date(message.createdAt), 'dd/MM HH:mm')}</span>
                          {message.userId !== userId && !isReported && (message.isReported === false) && (
                            <Button color="warning" onClick={() => handleReport(message.id)}><FlagCircleRounded /></Button>
                          )}
                        </>
                      }
                    />
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
