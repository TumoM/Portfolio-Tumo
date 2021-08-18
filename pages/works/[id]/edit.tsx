import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { Row, Col } from "reactstrap"
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import MyLoading from "components/shared/MyLoading";
import {useUser} from "@auth0/nextjs-auth0";
import withAuth from "hoc/withAuth";
import {useGetWork, useUpdateWork} from "helpers/works"
import WorkForm from "components/WorkForm";
import { toast } from 'react-toastify';
interface Work {
    body: string;
    id: number;
    title: string;
    userId: number;
}

const WorkEdit = ({user:userAdmin}) => {
    const { user:userAuthO, error, isLoading } = useUser();
    const router = useRouter();
    const work = useGetWork(router.query.id)
    // @ts-ignore
    const [ updateWork, {error:updateError, loading}] = useUpdateWork();
    let user = userAuthO || userAdmin;

    const _updateWork = async (data) => {
        console.log("In _updatework")
        try{
            // @ts-ignore
            updateWork(router.query.id, data)
                .then(r => {
                    console.log("R:",r)
                    toast.success(`Work Updated`, {
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
                header="Work Edit"
                title={'Edit Work - Tumo Masire'}
            >
                { isLoading &&
                <div className="text-center">
                    <MyLoading size='3.5rem'/>
                </div>
                }
                {
                    <Row>
                        <Col md={"8"} ms={"10"} className="mx-auto">
                            {work &&
                            <WorkForm
                                onSubmit={_updateWork}
                                initialData={work}
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
export default withAuth(WorkEdit)('admin');
