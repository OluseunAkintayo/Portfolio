import React from 'react';
import { Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';

const Dialogue = (props) => {
  console.log(props);
  const { openBox, closeBox, boxTitle, boxContent, action, actionText } = props;

  return (
    <Box>
      <Dialog
        open={openBox}
        TransitionComponent={Transition}
        onClose={closeBox}
        aria-describedBy="alert-dialog-slide-description"
        keepMounted
        fullWidth={true}
        maxWidth='xs'
      >
        <DialogTitle>{boxTitle}</DialogTitle>
        <DialogContent>{boxContent}</DialogContent>
        <DialogActions sx={{ display: 'flex', paddingX: '2.5ch', marginY: '1.5ch' }}>
          <Button sx={{ width: '100%', marginRight: '1ch' }} variant="contained" onClick={action}>{actionText}</Button>
          {/* <Button></Button> */}
          <Button sx={{ width: '100%' }} variant="contained" onClick={closeBox} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Dialogue;


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});