import * as React from 'react';
import { Box, Typography, Fab, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DrawerHeader from '../../../utils/DrawerHeader';
import BreadComp from '../../../utils/BreadComp';
import { Delete, Visibility, PersonAdd } from '@mui/icons-material';
import { connect } from 'react-redux';
import { loadUsers } from '../../../../../redux/actions';
import AddAccount from './AddAccount';

const Accounts = ({ usrName, getAdmins, admins }) => {
  const [values, setValues] = React.useState({
    firstName: '', lastName: '', username: '', email: '', role: ''
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
      width: 150,
      renderCell: params =>
        <Box sx={{ width: '100%' }}>
          <Visibility onClick={id => editUser(params.row._id)} sx={{ color: 'gray', cursor: 'pointer', marginRight: '1ch' }} />
          <Delete onClick={id => deleteUser(params.row._id)} sx={{ color: '#d92128', cursor: 'pointer' }} />
        </Box>
    }
  ];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
      fetch("https://techydna-app.herokuapp.com/api/v2/users", requestOptions)
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
    const usr = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      isAdmin: (values.role === "isAdmin" || values.role === "isSuperAdmin") ? true : false,
      isSuperAdmin: values.role === "isSuperAdmin" ? true : false
    }
    console.log(usr);
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
      <Box style={{ height: 'calc(100vh - 15rem)' }}>
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

      { modal.create === true &&
        <AddAccount
          modal={modal}
          handleChange={handleChange}
          closeCreateModal={closeCreateModal}
          newUser={newUser}
          values={values}
        /> 
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