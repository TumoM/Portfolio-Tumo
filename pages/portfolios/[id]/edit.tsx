import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { Row, Col } from "reactstrap"
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import MyLoading from "components/shared/MyLoading";
import {useUser} from "@auth0/nextjs-auth0";
import withAuth from "hoc/withAuth";
import {useGetPortfolio, useUpdatePortfolio} from "helpers/projects"
import PortfolioForm from "components/PortfolioForm";
import { toast } from 'react-toastify';
interface Portfolio {
    body: string;
    id: number;
    title: string;
    userId: number;
}

const PortfolioEdit = ({user:userAdmin}) => {
    const { user:userAuthO, error, isLoading } = useUser();
    const router = useRouter();
    const portfolio = useGetPortfolio(router.query.id)
    // @ts-ignore
    const [ updatePortfolio, {error:updateError, loading}] = useUpdatePortfolio();
    let user = userAuthO || userAdmin;

    const _updatePortfolio = async (data) => {
        console.log("In _updateportfolio")
        try{
            // @ts-ignore
            updatePortfolio(router.query.id, data)
                .then(r => {
                    console.log("R:",r)
                    toast.success(`Portfolio Updated`, {
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
        catch(e){
            console.log("Catch Error:",e)
        }
    }
    return (
        <BaseLayout user={user} loading={isLoading}>
            <BasePage
                header="Portfolio Edit"
                title={'Edit Portfolio - Tumo Masire'}
            >
                { isLoading &&
                <div className="text-center">
                    <MyLoading size='3.5rem'/>
                </div>
                }
                {
                    <Row>
                        <Col md={"8"} ms={"10"} className="mx-auto">
                            {portfolio &&
                            <PortfolioForm
                                onSubmit={_updatePortfolio}
                                initialData={portfolio}
                                buttonText={'Update'}
                                loadingData={loading}
                            />
                            }
                        </Col>
                    </Row>
                }
                { error && !isLoading &&
                <div className="alert alert-danger"><h5>{error?.message}</h5></div>
                }
            </BasePage>
        </BaseLayout>
    )
}

// @ts-ignore
export default withAuth(PortfolioEdit)('admin');
