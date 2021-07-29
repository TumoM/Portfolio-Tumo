import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { Row, Col } from "reactstrap"
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import MyLoading from "components/shared/MyLoading";
import {useUser} from "@auth0/nextjs-auth0";
import withAuth from "hoc/withAuth";
import {useGetPortfolio, useUpdatePortfolio} from "helpers/portfolios"
import PortfolioForm from "components/PortfolioForm";

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
    const [ updatePortfolio, {data, error:updateError, loading}] = useUpdatePortfolio();
    let user = userAuthO || userAdmin;

    const _updatePortfolio = (data) => {
        updatePortfolio(router.query.id,data)
    }
    return (
        <BaseLayout user={user} loading={isLoading}>
            <BasePage
                header="Portfolio Edit"
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

export default withAuth(PortfolioEdit)('admin')
