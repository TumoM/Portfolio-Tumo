


import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from 'hoc/withAuth'
import WorkForm from 'components/WorkForm';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import WorkApi from 'lib/api/works'
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useCreateWork } from 'helpers/works';
import Redirect from 'components/shared/redirect';

const WorkNew = ({user, loading:loadingProp}) =>  {
//   const { user, error, isLoading } = useUser();
// @ts-ignore
    const [createWork, {data, loading, error}] = useCreateWork();

if (data) {return  <Redirect to="/works" />}
  return (
    <BaseLayout user={user} loading={loadingProp}>
      <BasePage header="Create Work">
        <Row>
            <Col md="8" className="mx-auto">
                <WorkForm onSubmit={createWork}/>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(WorkNew)('admin')
