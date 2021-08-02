import axios from 'axios'
import BaseLayout from 'components/layouts/BaseLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BasePage from 'components/BasePage';
import {Button, ButtonGroup, Col, Row, Spinner} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import ProjectApi from 'lib/api/projects';
import ProjectCard from "components/ProjectCard";
import MyLoading from 'components/shared/MyLoading';
import { isAuthorized } from 'utils/auth0';
import { useDeleteProject } from 'helpers/projects';
import {toast} from "react-toastify";

interface Props {
  userAgent?: string;
}



const Projects = ({projects:initialProjects}) =>  {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  const [projects, setProjects] = useState(initialProjects)
  // @ts-ignore
  const [ deleteProject, {data, error:deleteError, laoding} ] = useDeleteProject()

  const _deleteProject = (e, id) => {
    e.stopPropagation
    const isConfirm = confirm("Are you sure you want to delete?")
    if (isConfirm === true){
      // @ts-ignore
      deleteProject(id)
        .then(r => {
          const tempProjects = projects.filter((project => {
            if (project._id !== id) {
              return true;
            }
            return false
          }))
          setProjects(tempProjects)
          toast.success('Delete Successful', {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(err => {
          toast.error(err, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
    }
  }

  const renderProjects = (projects) => {
    if (projects){
      return projects.map((project:any) => {
        return (
          <Col onClick={() => {
              router.push(`/projects/[id]`,`/projects/${project?._id}`)
            }}
            key={project?._id} ms="4" md="4">
            <ProjectCard  project={project}>
              { user && isAuthorized(user,'admin') &&
                <>
                  <Button
                    color={'warning'}
                    className={'mr-3'}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/[id]/edit`,`/projects/${project?._id}/edit`)
                    }}
                  >
                    Edit
                  </Button>
                  {""}
                  <Button
                    color={'danger'}
                    onClick={e => {
                      e.stopPropagation();
                      _deleteProject(e, project._id)
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            </ProjectCard>
          </Col>

        )

      })
    }
  }

  return (
    <BaseLayout
      user={user}
      loading={isLoading}
    >
      <BasePage
        title="Newest Projects - Tumo Masire"
        header="Projects"
        className="project-page d-flex align-items-start"
        metaDescription={"Overview of project job position's held by Tumo Masire"}
      >

        { isLoading &&
          <div className="text-center">
            <MyLoading size='3.5rem'/>
          </div>
        }
        {projects &&
          <Row>
            {
              renderProjects(projects)
            }
          </Row>

        }
        { error && !isLoading &&
          <div className="alert alert-danger"><h5>{error?.message}</h5></div>
        }
      </BasePage>
    </BaseLayout>
  )
}

// Get projects data at build time
export async function getStaticProps() {
  console.log("Calling GetAll Project");
  const json = await new ProjectApi().getAll();
  console.log("Called GetAll Project");
  const projects = json.data;
  return {
    props: { projects: projects},
    revalidate: 1
  }
}

export default Projects
