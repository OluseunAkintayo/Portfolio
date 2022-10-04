import React from 'react';
import styled from 'styled-components';
import { TextField, Box } from '@mui/material';

const Popup = ({ onClose, content }) => {
  return (
    <Modal>
      <Box
        sx={{ maxWidth: '400px', width: '100%', background: 'whitesmoke', borderRadius: '0.25rem', border: '1px solid lightgray', p: '1.5rem', position: 'relative' }}
      >
        <span className='closeBtn' onClick={onClose}>X</span>
        <>
          {content}
        </>
      </Box>
      </Modal>
  );
};

export default Popup;

const Modal = styled.section`
background: #00000080;
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
z-index: 1999;
display: flex;
align-items: center;
justify-content: center;
.closeBtn {
  background: #d92128;
  width: 2rem;
  aspect-ratio: 1;
  border-radius: 0.25rem;
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: ease-in-out 0.3s;
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  &:hover {
    background: #d9212890;
  }
}
`;