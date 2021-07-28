


import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from 'hoc/withAuth'
import PortfolioForm from 'components/PortfolioForm';
import { Row, Col } from 'reactstrap';

const PortfolioNew = ({user, loading}) =>  {
//   const { user, error, isLoading } = useUser();

const handleCratePortfolio = (data) => {
    alert(JSON.stringify(data))
}

  return (
    <BaseLayout user={user} loading={loading}>
      <BasePage header="Create Portfolio">
        <Row>
            <Col md="8" className="mx-auto">
                <PortfolioForm onSubmit={handleCratePortfolio}/>
            </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(PortfolioNew)('admin')