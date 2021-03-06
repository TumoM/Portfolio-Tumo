


import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from 'hoc/withAuth'
import PortfolioForm from 'components/PortfolioForm';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import PortfolioApi from 'lib/api/portfolios'
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useCreatePortfolio } from 'helpers/portfolios';
import Redirect from 'components/shared/redirect';

const PortfolioNew = ({user, loading:loadingProp}) =>  {
//   const { user, error, isLoading } = useUser();
// @ts-ignore
    const [createPortfolio, {data, loading, error}] = useCreatePortfolio();

if (data) {return  <Redirect to="/portfolios" />}
  return (
    <BaseLayout user={user} loading={loadingProp}>
      <BasePage header="Create Portfolio">
        <Row>
            <Col md="8" className="mx-auto">
                <PortfolioForm onSubmit={createPortfolio}/>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(PortfolioNew)('admin')
// export default PortfolioNew
