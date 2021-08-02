import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import { Spinner } from "reactstrap";
import { useUser } from '@auth0/nextjs-auth0';
import ProjectApi from 'lib/api/projects';
import MyLoading from "components/shared/MyLoading";
import moment from "moment"

interface Project {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const ProjectDetail = ({ project }):JSX.Element => {
  const { user, error, isLoading } = useUser();


  return (
    <BaseLayout navClass="transparent" linkColor='black' user={user} loading={isLoading}>
      <BasePage
        // header="Project Detail"
        noWrapper
        indexPage
        title={`${project? project.title : "Project"} - Tumo Masire`}
        metaDescription={"Information about a project worked on by Tumo Masire - "+project.description.substr(0,150)}
      >
        { isLoading &&
        <div className="text-center">
            <MyLoading size='3.5rem'/>
        </div>
        }
        {project && !isLoading &&
        <div className="project-detail">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <main role="main" className="inner page-cover">
                    <h1 className="cover-heading">{project.title}</h1>
                    <p className="lead dates">{moment(project.startDate).format('MMMM, YYYY')} - {project.endDate ? moment(project.endDate).format('MMMM, YYYY') : "Current"}</p>
                    <p className="lead info mb-0">{project.jobTitle} | {project.company} | {project.location}</p>
                    <p className="lead">{project.description}</p>
                    <p className="lead">
                      {project && project.companyWebsite && <a target="_" href={project.companyWebsite} className="btn btn-lg btn-secondary">Visit Company</a>}
                    </p>
                </main>
            </div>
        </div>
        }
        { error && !isLoading &&
        <div className="alert alert-danger"><h5>{error?.message}</h5></div>
        }
      </BasePage>
    </BaseLayout>
  )
}

export async function getStaticPaths() {
  const json = await new ProjectApi().getAll();
  const projects = json.data;
  const paths = projects.map(project => {
    return {
      params: {id: project._id}
    }
  })

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const json = await new ProjectApi().getById(params.id);
  const project = json.data;
  return { props: {project}, revalidate: 1
  };
}

export default ProjectDetail
