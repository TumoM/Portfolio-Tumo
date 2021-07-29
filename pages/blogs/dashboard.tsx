
import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from "hoc/withAuth";


const Dashboard = ({ user, loading}) =>  {
  // const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header={'Dashboard'}>
        <h1>I am Dashboard page</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(Dashboard)('admin')
