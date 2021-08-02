import BaseLayout from 'components/layouts/BaseLayout'
import React from "react"
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import ProjectForm from 'components/ProjectForm'

const Blogs = () =>  {
  const { user, error, isLoading } = useUser();

  const handleSubmit = (e) => {
      if (window !== undefined) {
        alert(JSON.stringify(e,null,2))
      }
  }

  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage >
        <h1 >I am Temp page</h1>
        <ProjectForm onSubmit={handleSubmit}/>
      </BasePage>
    </BaseLayout>
  )
}

export default Blogs