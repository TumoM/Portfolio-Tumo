
import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Container } from 'reactstrap';
import withAuth from 'hoc/withAuth';

interface IUser {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
}
const Profile = ({user, isLoading}:{user:IUser, isLoading:boolean}) =>  {
    return (
      <BaseLayout user={user} loading={isLoading}>
        <BasePage>
          <Card color="info" className="w-50 d-flex mx-auto">
            <CardImg className="mx-auto card-image-top" width="25px" src={user.picture} alt={user.name} />
            <CardBody>
              <CardTitle tag="h5">{user.name}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">{user.email}</CardSubtitle>
              <CardText>Some quick example text to build on the card title and make up the bulk of the card&apos;s content.</CardText>
              <Button>Edit</Button>
            </CardBody>
          </Card>
        </BasePage>
      </BaseLayout> 
    )
  }

export default withAuth(Profile)("");