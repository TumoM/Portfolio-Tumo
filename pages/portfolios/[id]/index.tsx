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
                    <>
                    <p>
                    {JSON.stringify(portfolio,null,2)}
                    </p>

                    </>
                }
                { error && !isLoading &&
                <div className="alert alert-danger"><h5>{error?.message}</h5></div>
                }
            </BasePage>
        </BaseLayout>
    )
}

// Function executed at build time
export async function getStaticPaths() {
    const json = await new PortfolioApi().getAll()
    try{
        const data = json.data;

        // get paths of id's for portfolios we want to pre-render
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

// This gets called at build time
export async function getStaticProps({ params }) {
    // params contains the portfolio `id`.
    const json = await new PortfolioApi().getById(params.id)
    try{
        const portfolio = await json.data

        // Pass portfolio data to the page via props
        return { props: { portfolio } }
    }
    catch(e){
        return { props: { portfolio:null } }
    }
}

export default PortfolioDetail
