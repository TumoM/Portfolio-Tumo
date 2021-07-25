
import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { NextPageContext } from "next";
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import { useGetPostById } from "helpers";
import React from "react";
import { Spinner } from "reactstrap";


interface Portfolio {
  body: string;
  id: number;
  title: string;
  userId: number;
}
interface Query {
  id: number|string;
}


const PortfolioDetail = ():JSX.Element => {
  const router = useRouter();
  const  { data, error, loading} = useGetPostById(router.query.id);

    return (
        <BaseLayout>
          <BasePage>
          { loading &&
            <>
              <Spinner color="primary" size="xl" />
              <p >Loading Data...</p> 
            </>
          }
          {data && 
            <>
              <h1>{data.title}</h1>
              <p>BODY: {data.body}</p>
              <p>ID: {data.id}</p>
            </>
          }
          { error &&
          <div className="alert alert-danger"><h5>{error?.message}</h5></div>
          }
          </BasePage>
        </BaseLayout>
    )
}

export default PortfolioDetail