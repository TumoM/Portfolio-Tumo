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
import moment from "moment";
import Image from 'next/image'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

interface Portfolio {
  body: string;
  id: number;
  title: string;
  userId: number;
}



const PortfolioDetail = ({ portfolio }):JSX.Element => {
  const { user, error, isLoading } = useUser();
  
  return (
    <BaseLayout navClass="transparent" linkColor='black' user={user} loading={isLoading}>
      <BasePage
        // header="Portfolio Detail"
        noWrapper
        indexPage
        title={`${portfolio? portfolio.title : "Portfolio"} - Tumo Masire`}
        metaDescription={"Information about a portfolio worked on by Tumo Masire - "+portfolio.description.substr(0,150)}
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
                  <Grid 
                    style={{paddingLeft:"10vw",paddingRight:"15vw", marginBottom:"20px", marginTop:"120px"}}
                    container 
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={10} className={'mb-4'}>
                      <Image layout={'intrinsic'} src={portfolio.thumbnail} alt='Portfolio Thumbnail' height={337.5} width={600} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={'mb-0'} style={{ fontWeight: 'bold' }} variant="h4" component="h2">
                        {portfolio.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={'mb-3'}  variant="subtitle1" gutterBottom>
                        {moment(portfolio.startDate).format('MMMM, YYYY')} 
                      </Typography>
                    </Grid>
                    <Grid className={'mb-4'} item xs={12}>
                      <Typography variant="body1" style={{whiteSpace: 'pre-line'}} gutterBottom>
                      {portfolio.description}
                      </Typography>
                    </Grid>
                    <Grid className={'mb-2'} item xs={12}>
                      <Typography className={'mb-0'} style={{ fontWeight: 'bold' }} variant="h5" component="h3">
                        Technologies:
                      </Typography>
                      <ul>
                        {portfolio.technologies.map((tech,i)=> <li style={{fontSize: "1.15rem"}} key={i}>{tech}</li>)}
                      </ul>
                    </Grid>
                    <Grid className={'mb-4'} item xs={12}>
                      <Typography className={'mb-2'} style={{ fontWeight: 'bold' }} variant="h5" component="h3">
                        Screenshots:
                      </Typography>
                        {portfolio.images.map((image,i)=> {
                          return (
                            <div className={'mb-5'} key={i}>
                              <Typography className={'mb-2'} style={{ fontWeight: 'bold' }} variant="subtitle1" gutterBottom >
                                {image.caption}
                              </Typography>
                              <Image layout={'intrinsic'} src={portfolio.thumbnail} alt='Portfolio Thumbnail' height={337.5} width={600} />
                            </div>)
                        })}
                    </Grid>
                  </Grid>
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
