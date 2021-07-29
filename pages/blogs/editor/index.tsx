
import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from "hoc/withAuth";


const BlogEditor = ({ user, loading}) =>  {
  // const { user, error, isLoading } = useUser();
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header={'Blog Editor'}>
        <h1>I am Blog Editor page</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(BlogEditor)('admin')
