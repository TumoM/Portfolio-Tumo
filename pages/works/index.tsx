import axios from 'axios'
import BaseLayout from 'components/layouts/BaseLayout';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BasePage from 'components/BasePage';
import {Button, ButtonGroup, Col, Row, Spinner} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';
import WorkApi from 'lib/api/works';
import WorkCard from "components/WorkCard";
import MyLoading from 'components/shared/MyLoading';
import { isAuthorized } from 'utils/auth0';
import { useDeleteWork } from 'helpers/works';
import {toast} from "react-toastify";

interface Props {
  userAgent?: string;
}



const Works = ({works:initialWorks}) =>  {
  const { user, error, isLoading } = useUser();
  const router = useRouter()
  const [works, setWorks] = useState(initialWorks)
  // @ts-ignore
  const [ deleteWork, {data, error:deleteError, laoding} ] = useDeleteWork()

  const _deleteWork = (e, id) => {
    e.stopPropagation
    const isConfirm = confirm("Are you sure you want to delete?")
    if (isConfirm === true){
      // @ts-ignore
      deleteWork(id)
        .then(r => {
          const tempWorks = works.filter((work => {
            if (work._id !== id) {
              return true;
            }
            return false
          }))
          setWorks(tempWorks)
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

  const renderWorks = (works) => {
    if (works){
      return works.map((work:any) => {
        return (
          <Col onClick={() => {
              router.push(`/works/[id]`,`/works/${work?._id}`)
            }}
            key={work?._id} ms="4" md="4">
            <WorkCard  work={work}>
              { user && isAuthorized(user,'admin') &&
                <>
                  <Button
                    color={'warning'}
                    className={'mr-3'}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/works/[id]/edit`,`/works/${work?._id}/edit`)
                    }}
                  >
                    Edit
                  </Button>
                  {""}
                  <Button
                    color={'danger'}
                    onClick={e => {
                      e.stopPropagation();
                      _deleteWork(e, work._id)
                    }}
                  >
                    Delete
                  </Button>
                </>
              }
            </WorkCard>
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
        title="Newest Works - Tumo Masire"
        header="Works"
        className="work-page d-flex align-items-start"
        metaDescription={"Overview of work job position's held by Tumo Masire"}
      >

        { isLoading &&
          <div className="text-center">
            <MyLoading size='3.5rem'/>
          </div>
        }
        {works &&
          <Row>
            {
              renderWorks(works)
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

// Get works data at build time
export async function getStaticProps() {
  console.log("Calling GetAll");
  const json = await new WorkApi().getAll();
  console.log("Called GetAll");
  const works = json.data;
  return {
    props: { works: works},
    revalidate: 1
  }
}

export default Works
