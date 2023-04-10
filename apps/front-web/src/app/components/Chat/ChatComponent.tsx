
import { Divider, Fab, FormControl, Grid, List, ListItem, ListItemButton, ListItemText, Paper, TextField } from '@mui/material';
import { StyledChat } from './ChatComponent.style';
import SendIcon from '@mui/icons-material/Send';
import { Message } from '../../containers/Chat/Chat';

interface ChatComponentProps {
  messages: Message[];
  handleSubmit: any;
  register: any;
  userId?: string | null;
}

export const ChatComponent = ({ messages, handleSubmit, register, userId }: ChatComponentProps) => {
  return (
    <StyledChat>
      <Grid container component={Paper} className="chatSection">
        <Grid item xs={4} className="borderRight500">
          <List>
            <ListItemButton key="RemySharp">
              <ListItemText primary="John Wick"></ListItemText>
            </ListItemButton>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <TextField id="outlined-basic-email" label="Rechercher" variant="outlined" fullWidth />
          </Grid>
          <Divider />
          <List>
            <ListItemButton key="RemySharp">
              <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            </ListItemButton>
            <ListItemButton key="Alice">
              <ListItemText primary="Alice">Alice</ListItemText>
            </ListItemButton>
            <ListItemButton key="CindyBaker">
              <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
            </ListItemButton>
          </List>
        </Grid>
        <Grid item xs={8}>
          <List className="messageArea">
            <ListItem key="2">
              <Grid container>
                {messages && messages.map((message, index) => (
                  <Grid item xs={12} key={index}>
                    <ListItemText
                      align={message.userId === userId ? 'right' : 'left'}
                      primary={message.message}
                      secondary={message.username}>
                    </ListItemText>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <FormControl className="interact" component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              className="outlined-basic-email"
              style={{}}
              label="Ecris quelque chose"
              fullWidth
              {...register('newMessage')}
            />
            <Fab color="primary" aria-label="add" type='submit'><SendIcon /></Fab>
          </FormControl>
        </Grid>
      </Grid>
    </StyledChat>
  );
};
