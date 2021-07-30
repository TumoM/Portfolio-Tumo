import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import { Spinner } from "reactstrap";
import { useUser } from '@auth0/nextjs-auth0';
import PortfolioApi from 'lib/api/portfolios';
import MyLoading from "components/shared/MyLoading";
import moment from "moment"

interface Portfolio {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PortfolioDetail = ({ portfolio }):JSX.Element => {
  const { user, error, isLoading } = useUser();


  return (
    <BaseLayout navClass="transparent" user={user} loading={isLoading}>
      <BasePage
        // header="Portfolio Detail"
        noWrapper
        indexPage
        title={`${portfolio? portfolio.title : "Portfolio"} - Tumo Masire`}
        metaDescription={"Information about a portfolio job position held by Tumo Masire - "+portfolio.description.substr(0,150)}
      >
        { isLoading &&
        <div className="text-center">
            <MyLoading size='3.5rem'/>
        </div>
        }
        {portfolio && !isLoading &&
        <div className="portfolio-detail">
            <div className="cover-container d-flex h-100 p-3 mx-auto flex-column">
                <main role="main" className="inner page-cover">
                    <h1 className="cover-heading">{portfolio.title}</h1>
                    <p className="lead dates">{moment(portfolio.startDate).format('MMMM, YYYY')} - {portfolio.endDate ? moment(portfolio.endDate).format('MMMM, YYYY') : "Current"}</p>
                    <p className="lead info mb-0">{portfolio.jobTitle} | {portfolio.company} | {portfolio.location}</p>
                    <p className="lead">{portfolio.description}</p>
                    <p className="lead">
                      {portfolio && portfolio.companyWebsite && <a target="_" href={portfolio.companyWebsite} className="btn btn-lg btn-secondary">Visit Company</a>}
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
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  const paths = portfolios.map(portfolio => {
    return {
      params: {id: portfolio._id}
    }
  })

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: {portfolio}, revalidate: 1
  };
}

export default PortfolioDetail
