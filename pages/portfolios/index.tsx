import axios from 'axios'
import BaseLayout from 'components/layouts/BaseLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BasePage from 'components/BasePage';
import { Col, Row, Spinner } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import PortfolioApi from 'lib/api/portfolios';
import PortfolioCard from "components/PortfolioCard";
import MyLoading from 'components/shared/MyLoading';
interface Props {
  userAgent?: string;
}



const Portfolios = ({portfolios}) =>  {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  
  const renderPortfolios = (portfolios) => {
    if (portfolios){
      return portfolios.map((portfolio:any) => {
        return (
          <Col onClick={() => {
              router.push(`/portfolios/[id]`,`/portfolios/${portfolio?._id}`)
            }} 
            key={portfolio?._id} ms="4" md="4">
            {/* <Link href={`/portfolios/${portfolio?._id}`} passHref>
            </Link> */}
                <PortfolioCard  portfolio={portfolio}/>
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
      <BasePage header="Portfolios" className="portfolio-page">
        { isLoading &&
          <div className="text-center">
            <MyLoading size='3.5rem'/>
          </div>
        }
        {user && 
          <Row>
            {
              renderPortfolios(portfolios)
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

// Get portfolios data at build time
export async function getStaticProps() {
  console.log("Calling GetAll");
  const json = await new PortfolioApi().getAll();
  console.log("Called GetAll");
  const portfolios = json.data;
  return {
    props: { portfolios: portfolios}
  }
}

export default Portfolios