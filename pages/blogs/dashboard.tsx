
import BaseLayout from 'components/layouts/BaseLayout'
import React, { useState} from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from "hoc/withAuth";
import { Input, Label } from 'reactstrap';


const Dashboard = ({ user, loading}) =>  {
  // const { user, error, isLoading } = useUser();
  const {text, setText} = useState("");
  const handleChange = (event) => {

    console.log(event.target.value)


  }
  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header={'Dashboard'}>
        <Label htmlFor="description">Description</Label>
        <Input
        name="description"
        rows="5"
        type="textarea"
        // defaultValue={ initialData?.data?.description }
        placeholder="I worked on XYZ..."
        onChange={handleChange}
        // {...register("description")}

        id="description"/>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(Dashboard)('admin')
