
import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';


const About = () =>  {
  const { user, error, isLoading } = useUser();

  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage>
        <h1>I am About page</h1>
      </BasePage>
    </BaseLayout>
  )
}

export default About