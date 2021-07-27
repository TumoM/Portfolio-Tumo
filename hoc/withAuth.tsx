
import { useUser } from '@auth0/nextjs-auth0';
import Redirect from 'components/shared/redirect'
import React from 'react';
import { Container } from 'reactstrap';
import { isAuthorized } from 'utils/auth0';

const withAuth = (Component:any)=> (role?:string) =>  {
  role = role.toLowerCase();  
  return props => {
      const { user, error, isLoading } = useUser();
      if (isLoading) {
        return (
        <Container className="d-flex align-items-center h-100 vertical-center">
          <p className="my-5  mx-auto">Loading...</p>
        </Container>
        )
      }
      if (!user){
        return <Redirect ssr to="/api/auth/login"/>
      }
      else{
        if (role && !isAuthorized(user, role)) {
          // Redirect to desired page if unauthorized
          return <Redirect ssr to="api/auth/login" />
        }
        return <Component user={user} isLoading={isLoading} {...props}/>
    }
  }
}

export default withAuth;