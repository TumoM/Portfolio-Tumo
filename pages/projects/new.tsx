


import BaseLayout from 'components/layouts/BaseLayout'
import React from 'react'
import BasePage from 'components/BasePage'
import { useUser } from '@auth0/nextjs-auth0';
import withAuth from 'hoc/withAuth'
import ProjectForm from 'components/ProjectForm';
import { Row, Col } from 'reactstrap';
import axios from 'axios';
import ProjectApi from 'lib/api/projects'
import { getAccessToken } from '@auth0/nextjs-auth0';
import { useCreateProject } from 'helpers/projects';
import Redirect from 'components/shared/redirect';

const ProjectNew = ({user, loading:loadingProp}) =>  {
//   const { user, error, isLoading } = useUser();
// @ts-ignore
    const [createProject, {data, loading, error}] = useCreateProject();

if (data) {return  <Redirect to="/projects" />}
  return (
    <BaseLayout user={user} loading={loadingProp}>
      <BasePage header="Create Project">
        <Row>
            <Col md="8" className="mx-auto">
                <ProjectForm onSubmit={createProject}/>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
            </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  )
}

export default withAuth(ProjectNew)('admin')
// export default ProjectNew
