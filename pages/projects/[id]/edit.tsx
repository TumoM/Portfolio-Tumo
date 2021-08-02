import axios from "axios";
import BaseLayout from "components/layouts/BaseLayout"
import { Row, Col } from "reactstrap"
import { useRouter } from "next/router"
import BasePage from 'components/BasePage'
import React from "react";
import MyLoading from "components/shared/MyLoading";
import {useUser} from "@auth0/nextjs-auth0";
import withAuth from "hoc/withAuth";
import {useGetProject, useUpdateProject} from "helpers/projects"
import ProjectForm from "components/ProjectForm";
import { toast } from 'react-toastify';
interface Project {
    body: string;
    id: number;
    title: string;
    userId: number;
}

const ProjectEdit = ({user:userAdmin}) => {
    const { user:userAuthO, error, isLoading } = useUser();
    const router = useRouter();
    const project = useGetProject(router.query.id)
    // @ts-ignore
    const [ updateProject, {error:updateError, loading}] = useUpdateProject();
    let user = userAuthO || userAdmin;

    const _updateProject = async (data) => {
        console.log("In _updateproject")
        try{
            // @ts-ignore
            updateProject(router.query.id, data)
                .then(r => {
                    console.log("R:",r)
                    toast.success(`Project Updated`, {
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
                header="Project Edit"
                title={'Edit Project - Tumo Masire'}
            >
                { isLoading &&
                <div className="text-center">
                    <MyLoading size='3.5rem'/>
                </div>
                }
                {
                    <Row>
                        <Col md={"8"} ms={"10"} className="mx-auto">
                            {project &&
                            <ProjectForm
                                onSubmit={_updateProject}
                                initialData={project}
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
export default withAuth(ProjectEdit)('admin');
