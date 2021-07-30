import axios from 'axios'
import BaseLayout from 'components/layouts/BaseLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BasePage from 'components/BasePage';
import {Button, ButtonGroup, Col, Row, Spinner} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import PortfolioApi from 'lib/api/portfolios';
import PortfolioCard from "components/PortfolioCard";
import MyLoading from 'components/shared/MyLoading';
import { isAuthorized } from 'utils/auth0';
import { useDeletePortfolio } from 'helpers/portfolios';
import {toast} from "react-toastify";

interface Props {
  userAgent?: string;
}



const Portfolios = ({portfolios:initialPortfolios}) =>  {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  const [portfolios, setPortfolios] = useState(initialPortfolios)
  // @ts-ignore
  const [ deletePortfolio, {data, error:deleteError, laoding} ] = useDeletePortfolio()

  const _deletePortfolio = (e, id) => {
    e.stopPropagation
    const isConfirm = confirm("Are you sure you want to delete?")
    if (isConfirm === true){
      // @ts-ignore
      deletePortfolio(id)
        .then(r => {
          const tempPortfolios = portfolios.filter((portfolio => {
            if (portfolio._id !== id) {
              return true;
            }
            return false
          }))
          setPortfolios(tempPortfolios)
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

  const renderPortfolios = (portfolios) => {
    if (portfolios){
      return portfolios.map((portfolio:any) => {
        return (
          <Col onClick={() => {
              router.push(`/portfolios/[id]`,`/portfolios/${portfolio?._id}`)
            }}
            key={portfolio?._id} ms="4" md="4">
            <PortfolioCard  portfolio={portfolio}>
              { user && isAuthorized(user,'admin') &&
                <>
                  <Button
                    color={'warning'}
                    className={'mr-3'}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/portfolios/[id]/edit`,`/portfolios/${portfolio?._id}/edit`)
                    }}
                  >
                    Edit
                  </Button>
                  {""}
                  <Button
                    color={'danger'}
                    onClick={e => {
                      e.stopPropagation();
                      _deletePortfolio(e, portfolio._id)
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            </PortfolioCard>
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
        title="Newest Portfolios - Tumo Masire"
        header="Portfolios"
        className="portfolio-page d-flex align-items-start"
        metaDescription={"Overview of portfolio job position's held by Tumo Masire"}
      >

        { isLoading &&
          <div className="text-center">
            <MyLoading size='3.5rem'/>
          </div>
        }
        {portfolios &&
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
    props: { portfolios: portfolios},
    revalidate: 1
  }
}

export default Portfolios
