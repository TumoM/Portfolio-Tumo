import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import { Spinner } from "reactstrap";
import { useUser } from '@auth0/nextjs-auth0';
import WorkApi from 'lib/api/works';
import MyLoading from "components/shared/MyLoading";
import moment from "moment"

interface Work {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const WorkDetail = ({ work }):JSX.Element => {
  const { user, error, isLoading } = useUser();


  return (
    <BaseLayout navClass="transparent" user={user} loading={isLoading}>
      <BasePage
        // header="Work Detail"
        noWrapper
        indexPage
        title={`${work? work.title : "Work"} - Tumo Masire`}
        metaDescription={"Information about a work job position held by Tumo Masire - "+work.description.substr(0,150)}
      >
        { isLoading &&
        <div className="text-center">
            <MyLoading size='3.5rem'/>
        </div>
        }
        {work && !isLoading &&
        <div className="work-detail">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <main role="main" className="inner page-cover">
                    <h1 className="cover-heading">{work.title}</h1>
                    <p className="lead dates">{moment(work.startDate).format('MMMM, YYYY')} - {work.endDate ? moment(work.endDate).format('MMMM, YYYY') : "Current"}</p>
                    <p className="lead info mb-0">{work.jobTitle} | {work.company} | {work.location}</p>
                    <p className="lead">{work.description}</p>
                    <p className="lead">
                      {work && work.companyWebsite && <a target="_" href={work.companyWebsite} className="btn btn-lg btn-secondary">Visit Company</a>}
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
  const json = await new WorkApi().getAll();
  const works = json.data;
  const paths = works.map(work => {
    return {
      params: {id: work._id}
    }
  })

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const json = await new WorkApi().getById(params.id);
  const work = json.data;
  return { props: {work}, revalidate: 1
  };
}

export default WorkDetail
