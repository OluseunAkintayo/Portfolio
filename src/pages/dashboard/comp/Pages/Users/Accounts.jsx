import * as React from 'react';
import { Box, Typography, TextField } from '@mui/material';
// import { Modal } from 'react-responsive-modal';
import { DataGrid } from '@mui/x-data-grid';
import NavComp from '../../../utils/NavComp';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';
import { Delete, Visibility } from '@mui/icons-material';
import Dialogue from '../../../utils/Dialogue';

const AccountsComp = () => {
  const [values, setValues] = React.useState({
    username: '', email: '', role: ''
  });
  const [status, setStatus] = React.useState({
    loading: false, error: null
  });

  // modals.start
  const [modal, setModal] = React.useState({
    edit: false, delete: false
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

  // user options
  const options = [
    { value: 'admin', label: 'Admin' },
    { value: 'superAdmin', label: 'Super Admin' },
    { value: 'user', label: 'User' }
  ]
  // modals.end

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState({});
  console.log(user)
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
    setValues({ ...values, [prop]: event.target.value, warning: null });
  };

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
          console.log(res);
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
      {
        modal.edit === true &&
        <Dialogue
          openBox={modal.edit}
          closeBox={closeEditModal}
          boxTitle="Edit User"
          actionText="Save"
          action={closeEditModal}
          boxContent={
            <Box>
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Username" variant="outlined" fullWidth="true"
                onChange={handleChange('username')}
                defaultValue={user.username}
              />
              <TextField
                sx={{ marginY: 2 }} id="outlined-basic" label="Email address" variant="outlined" fullWidth="true"
                onChange={handleChange('email')}
                defaultValue={user.email}
              />
              <Box sx={{ height: '3rem', marginTop: '1.5ch' }}>
                <select
                  style={{ padding: '16.5px 14px', width: '100%', borderColor: '#0000003b', borderRadius: '0.25rem', outline: 'none' }}
                  onChange={handleChange('role')}
                >
                  <option>Select role</option>
                  {options.map(item => (<option value={item.value}>{item.label}</option>))}
                </select>
              </Box>
            </Box>
          }
        />
      }
    </Box>
  );
};

const Accounts = () => {
  React.useEffect(() => {
    const prev = document.title;
    document.title = "Dashboard: Users";
    return () => document.title = prev;
  });
  return (
    <NavComp NavPage={<AccountsComp />} />
  )
}
export default Accounts;