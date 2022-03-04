import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './HandleAuth';
import Layout from '../../pages/dashboard/utils/Layout';

function ProtectedRoute({ component: Component, ...rest}) {
  return (
    <Layout>
      <Route 
        {...rest}
        render = {(props) => getToken() ? <Component {...props} /> : 
          <Redirect to={{ pathname: '/admin/auth', state: { from: props.location }}} />
        }
      />
    </Layout>
  );
};

export default ProtectedRoute;