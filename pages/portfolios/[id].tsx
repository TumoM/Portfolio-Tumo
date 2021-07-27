
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


interface Portfolio {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const PortfolioDetail = ({ portfolio }):JSX.Element => {
  const { user, error, isLoading } = useUser();


    return (
        <BaseLayout user={user} loading={isLoading}>
          <BasePage
            header="Portfolio Detail"
          >
          { isLoading &&
            <div className="text-center">
              <MyLoading size='3.5rem'/>
            </div>
          }
          {portfolio && !isLoading &&
            <p>
              {JSON.stringify(portfolio,null,2)}
            </p>
          }
          { error && !isLoading &&
            <div className="alert alert-danger"><h5>{error?.message}</h5></div>
          }
          </BasePage>
        </BaseLayout>
    )
}

// This gets called at build time
export async function getStaticProps({ params }) {
  // params contains the portfolio `id`.
  // If the route is like /posts/1, then params.id is 1
  const json = await new PortfolioApi().getById(params.id) 
  const portfolio = await json.data

  // Pass portfolio data to the page via props
  return { props: { portfolio } }
}

export async function getStaticPaths() {
      const rawData = await axios.get("http://localhost:3001/api/v1/portfolios/")
      try{
          const data = await rawData.data;
          const paths = data.map(portfolio => {
              return {
                  params:{
                      id:portfolio._id
                  }
              }
          });
          return {
              paths,
              fallback: true
          }
          
      }
      catch(err){
          console.log("Error---",err);
          return {
              props:{
                  portfolios:null
              }
          }
      }
  }

  


export default PortfolioDetail