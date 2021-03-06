import BaseLayout from 'components/layouts/BaseLayout'
import React from "react"
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import {Col, Row} from "reactstrap";

const Cv = () =>  {
  const { user, error, isLoading } = useUser();

  return (
    <BaseLayout user={user} loading={isLoading}>
        <BasePage
          header={"Tumo's CV"}
          title="My Experiences - Tumo Masire"
        >
          <Row>
            <Col className={'mx-auto'} md={{size: 9, offset: 1.5}}>
              <iframe style={{width: '100%', height: '800px'}} src="/tumo_cv_2021.pdf"/>
            </Col>
          </Row>
        </BasePage>
    </BaseLayout>
  )
}

export default Cv
