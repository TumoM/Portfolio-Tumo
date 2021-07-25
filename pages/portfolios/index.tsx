import axios from 'axios'
import BaseLayout from 'components/layouts/BaseLayout';
import { NextPage, NextPageContext  } from 'next';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BasePage from 'components/BasePage';
import { useGetPosts } from 'helpers';
import { Spinner } from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';

interface Props {
  userAgent?: string;
}



const Portfolios = () =>  {
  const  { data, error, loading } = useGetPosts();
  const { user, error:errorLogin, isLoading } = useUser();

  const renderPosts = (posts) => {
    if (posts){
      return posts.map((post:any) => {
        return <li key={post?.id}>
          <Link href={`/portfolios/${post?.id}`}>
            <a>
              {post?.title}
            </a>
          </Link>
          </li>
      })
    }
  }

  return (
    <BaseLayout user={user} loading={isLoading}>
      <BasePage>
        <h1>I am Portfolios page</h1>
        { loading &&
          <>
            <Spinner color="primary" size="xl" />
            <p >Loading Data...</p> 
          </>
        }
        {data && 
          <ul>
          {
            renderPosts(data)
          }
          </ul>
        }
        { error && !loading &&
          <div className="alert alert-danger"><h5>{error?.message}</h5></div>
        }
      </BasePage>
    </BaseLayout>
  )
}

Portfolios.getInitialProps = async (ctx:NextPageContext ) => {
  console.log("In initial state");
  let posts = [];

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
    posts = response.data
    // console.log("Response:",response);
  }
  catch(e) {
    console.log(e);
    
  }

  return {posts:posts.slice(0,10)};
}

export default Portfolios