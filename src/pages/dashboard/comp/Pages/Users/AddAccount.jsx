import React from 'react';
import Popup from '../../../utils/Popup';
import { Box, Button, Typography, TextField, Fab, Tooltip, FormControlLabel, Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const AddAccount = ({ modal, closeCreateModal, handleChange, newUser, values }) => {
	return (
		<React.Fragment>
			<Popup
          onOpen={modal.create}
          onClose={closeCreateModal}
          content={
            <Box style={{ color: 'rgba(0,0,0,0.7)', maxWidth: '500px' }}>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, marginTop: '1rem' }}>
                Add User
              </Typography>
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="First name" variant="outlined" fullWidth="true"
                onChange={handleChange('firstName')}
              />
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Last name" variant="outlined" fullWidth="true"
                onChange={handleChange('lastName')}
              />
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Username" variant="outlined" fullWidth="true"
                onChange={handleChange('username')}
              />
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Email" variant="outlined" fullWidth="true"
                onChange={handleChange('email')}
              />
              <Box sx={{ marginY: 2 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.role}
                    label="Role"
                    onChange={handleChange('role')}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="isAdmin">Admin</MenuItem>
                    <MenuItem value="isSuperAdmin">Super Admin</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Button onClick={newUser} variant="contained" sx={{ width: '100%', marginY: '1.5ch', height: '3.5rem' }}>Add User</Button>
            </Box>
          }
        />
		</React.Fragment>
	)
}

export default AddAccount