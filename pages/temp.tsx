import BaseLayout from 'components/layouts/BaseLayout'
import React from "react"
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import ProjectForm from 'components/ProjectForm'

const Blogs = () =>  {
  const { user, error, isLoading } = useUser();

  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage>
        <h1>I am Temp page</h1>
        <ProjectForm onSubmit={()=>null}/>
      </BasePage>
    </BaseLayout>
  )
}

export default Blogs