import * as React from 'react';
import { Box, Button, Typography, TextField, Fab, Tooltip, FormControlLabel, Checkbox, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';
import { Delete, Visibility, PersonAdd, PersonAddAlt } from '@mui/icons-material';
import Popup from '../../../utils/Popup';
import { connect } from 'react-redux';
import { loadUsers } from '../../../../../redux/actions';

const Accounts = ({ usrName, getAdmins, admins }) => {
  console.log(usrName);
  const [values, setValues] = React.useState({
    username: '', email: '', isAdmin: false, isSuperAdmin: false
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

  let token = JSON.parse(sessionStorage.getItem("token"));

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
            getAdmins(tempData);
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
    const prev = document.title;
    document.title = "Dashboard: Users";
    return () => document.title = prev;
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
      {/* <Box style={{ margin: '1rem 0', display: 'flex', justifyContent: 'flex-end'  }}>
        <Button variant="contained" onClick={openCreateModal}>
          <PersonAddAlt />
          <span style={{ padding: '0 0.25rem'}}>Add User</span>
        </Button>
      </Box> */}
      <Box style={{ height: '50vh' }}>
          <DataGrid
            columns={columns}
            rows={admins}
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
            <Box sx={{ color: 'rgba(0,0,0,0.7)' }}>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 500 }}>
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
              {/* <FormControlLabel control={<Checkbox onChange={onCheckboxChange} />} label="Make Admin" /> <br /> */}
              <Box 
                sx={{ 
                  marginY: 2,
                  height: 56, borderRadius: '0.25rem',
                  overflow: 'hidden'
                }}
              >
                <select
                  style={{
                    height: '100%', width: '100%',
                    padding: '16.5px 14px', borderRadius: '0.25rem',
                    background: 'inherit', cursor: 'pointer',
                    outline: 'none', border: '1px solid rgba(0,0,0,0.3)'
                  }}
                >
                  <option selected disabled>Choose</option>
                  <option value='isAdmin'>Admin</option>
                  <option value='isSuperAdmin'>Super Admin</option>
                </select>
              </Box>

              
              <Button onClick={newUser} variant="contained" sx={{ width: '100%', marginY: '1.5ch', height: '3rem' }}>Add User</Button>
            </Box>
          }
        />
        : null
      }
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    usrName: state.auth.user.username,
    admins: state.dashboard.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAdmins: items => dispatch(loadUsers(items)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);