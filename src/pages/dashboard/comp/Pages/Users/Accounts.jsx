import * as React from 'react';
import { Box, Button, Typography, TextField, Fab, Tooltip, FormControlLabel, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';
import { Delete, Visibility, PersonAdd } from '@mui/icons-material';
import Popup from '../../../utils/Popup';

const Accounts = () => {
  const [values, setValues] = React.useState({
    username: '', email: '', isAdmin: false
  });
  const [status, setStatus] = React.useState({
    loading: false, error: null
  });

  // modals.start
  const [modal, setModal] = React.useState({
    edit: false, delete: false, create: true
  });
  const openEditModal = () => {
    setModal({ ...modal, edit: true });
  };
  const closeEditModal = () => {
    setModal({ ...modal, edit: false });
  };
  const openDeleteModal = () => {
    setModal({ ...modal, delete: true });
  };
  const closeDeleteModal = () => {
    setModal({ ...modal, delete: false });
  };
  const openCreateModal = () => {
    setModal({ ...modal, create: true });
  }
  const closeCreateModal = () => {
    setModal({ ...modal, create: false });
  }
  // modals.end

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({});

  let token = sessionStorage.getItem("sessionToken");

  const columns = [
    {
      field: 'username',
      headerName: 'Username',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      headerName: 'Actions',
      renderCell: params =>
        <Box sx={{ width: '100%' }}>
          <Visibility onClick={id => editUser(params.row._id)} sx={{ color: 'gray', cursor: 'pointer', marginRight: '0.5ch' }} />
          <Delete onClick={id => deleteUser(params.row._id)} sx={{ color: '#d92128', cursor: 'pointer' }} />
        </Box>
    }
  ];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const onCheckboxChange = () => {
    setValues({ ...values, isAdmin: !values.isAdmin });
  }

  const findItem = id => {
    const item = users.find(item => item._id === id);
    setUser(item);
  }

  const editUser = (id) => {
    findItem(id);
    openEditModal();
  }

  const deleteUser = (id) => {
    findItem(id);
    openDeleteModal();
  }

  const getUsers = async () => {
    setStatus({ ...status, loading: true });
    const myHeaders = new Headers();
    myHeaders.append("token", `Bearer ${token}`);
    
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      fetch("http://localhost:5000/api/v2/users", requestOptions)
        .then(response => response.json())
        .then(res => {
          setStatus({ ...status, loading: false });
          if(res.success === true) {
            let tempData = [];
            res.data.forEach(item => {
              const user = {
                ...item,
                id: item._id
              }
              tempData = [...tempData, user];
            })
            setUsers(tempData);
          }
        })
        .catch(error => {
          console.error({error});
          setStatus({ ...status, error: "Unable to fetch users. Please try again" });
        });
    } catch (error) {
      console.error({error});
      setStatus({ ...status, loading: false, error: "Unable to fetch users. Please try again" });
    }
  }

  const newUser = () => {
    
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box component="main" sx={{ flexGrow: 1, paddingX: 4, paddingY: 2 }}>
      <DrawerHeader />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3ch' }}>
          <Typography sx={{ fontSize: '3ch' }}>
            Users 
          </Typography>
          <BreadComp parent="Dashboard" currentPage="Users" />
      </Box>
      <Box style={{ height: '50vh' }}>
          <DataGrid
            columns={columns}
            rows={users}
            disbleSelectionOnClick
            loading={status.loading}
            sx={{ height: "100%", width: 'auto' }}
          />
      </Box>
      <Box sx={{ '& > :not(style)': { m: 1 }, position: 'fixed', bottom: 20, right: 23 }}>
        <Tooltip title="Add User">
          <Fab color="primary" onClick={openCreateModal}>
            <PersonAdd />
          </Fab>
        </Tooltip>
      </Box>
      {modal.create === true ?
        <Popup
          onOpen={modal.create}
          onClose={closeCreateModal}
          content={
            <Box>
              <Typography>Add User</Typography>
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Username" variant="outlined" fullWidth="true"
                onChange={handleChange('username')}
              />
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Email" variant="outlined" fullWidth="true"
                onChange={handleChange('email')}
              />
              <FormControlLabel control={<Checkbox onChange={onCheckboxChange} />} label="Make Admin" /> <br />
              <Button onClick={newUser} variant="contained" sx={{ width: '100%', marginY: '1.5ch', height: '3rem' }}>Add User</Button>
            </Box>
          }
        />
        : null
      }
    </Box>
  );
};

export default Accounts;