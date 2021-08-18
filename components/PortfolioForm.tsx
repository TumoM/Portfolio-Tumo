import React, { useEffect, useState } from "react";
import {Button, Form, FormGroup, Input, Label, Spinner} from "reactstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form"
import axios from "axios";
// import {IPortfolio} from "../helpers/Portfolios";

interface IInitialData {
    // data: {IPortfolio}|IPortfolio
}

interface IProps {
    onSubmit: any,
    loadingData?: boolean,
    buttonText?: string,
    initialData?: any,
}
const PortfolioForm = ({onSubmit, loadingData=false,buttonText="Create", initialData = null}:IProps) => {
    // const { width } = useWindowDimensions(); // Causing an error?
    // const { register, handleSubmit, setValue, reset } = useForm({defaultValues:initialData.data});
    const { register, handleSubmit, setValue } = useForm({defaultValues: initialData?.data});

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [tags, setTags] = useState("")
    const [disableEndDate, setDisableEndDate] = useState(false)

/*
    useEffect(() => {
        // setValue(initialData.data)
        console.log("Initial Data:",initialData)
    }, [reset, initialData]);
*/

    useEffect(() => {
        console.log("Doing Date Magic")
        if (initialData && initialData.data){
            // @ts-ignore
            const { startDate, endDate } = initialData?.data;
            if (startDate) { setStartDate(new Date(startDate))}
            if (endDate) { setEndDate(new Date(endDate))}
        }
        else{
            console.log("Magic didn't work")
        }

    }, [initialData])

    const handleDateChange = (field, date: any) => {
        if (field === "startDate"){
            setStartDate(date)
        }
        else if (field === "endDate"){

            setEndDate(date)
        }

        // @ts-ignore
        setValue(field,date);
    }

    useEffect(() => {
        // @ts-ignore
        register('startDate');
        // @ts-ignore
        register('endDate');
    },[register])

    const handleSubmitProcess = (e) => {
        if (e.tags != undefined) {
            try{
                e.tags = e.tags.split(/,\s*/).map(item => item.trim())
            }
            catch{null}
        }
        if (e.technologies != undefined) {
            try{
                e.technologies = e.technologies.split(/\n/).map(item => item.trim())
            }
            catch{null}
        }
        onSubmit(e)
        // alert(JSON.stringify(e,null,2))
    }

    // @ts-ignore
    // @ts-ignore
    return (
        <Form onSubmit={handleSubmit(handleSubmitProcess)}>
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                name="title"
                type="text"
                defaultValue={initialData?.data?.title}

                placeholder="My Portfolio Title"
                {...register("title")}
                id="title"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input
                name="thumbnail"
                type="text"
                defaultValue={initialData?.data?.thumbnail }

                placeholder="https://example.com"
                {...register("thumbnail")}
                id="thumbnail"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input
                name="description"
                rows="5"
                type="textarea"
                defaultValue={ initialData?.data?.description }
                placeholder="This portfolio is about XYZ..."
                {...register("description")}

                id="description">
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="technologies">Technologies</Label>
                <Input
                name="technologies"
                rows="5"
                type="textarea"
                defaultValue={ initialData?.data?.technologies.join('\n') }
                placeholder="This portfolio is about XYZ..."
                {...register("technologies")}

                id="technologies">
                </Input>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="portfolioLink">Portfolio Link</Label>
                <Input
                name="portfolioLink"
                type="text"
                defaultValue={ initialData?.data?.portfolioLink }
                placeholder="https://example.com"
                {...register("portfolioLink")}

                id="portfolioLink"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="tags">Tags</Label>
                <Input
                name="tags"
                type="text"
                defaultValue={initialData?.data?.tags.join(", ").trim() }
                placeholder="Frontend, Backend, Express, MongoDB"
                {...register("tags")}

                id="tags"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="imageCaptions">Images URL(s)</Label>
                <Input
                name="imageCaptions"
                type="textarea"
                defaultValue={ initialData?.data?.imageCaptions }
                placeholder="Web Developer"
                {...register("imageCaptions")}

                id="imageCaptions"/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="imageCaptions">Images Caption(s)</Label>
                <Input
                name="imageCaptions"
                type="textarea"
                defaultValue={ initialData?.data?.imageCaptions }
                placeholder="Web Developer"
                {...register("imageCaptions")}

                id="imageCaptions"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="startDate">Start Date</Label>
                <div id="startDate">
                    <DatePicker
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        allowSameDay
                        scrollableYearDropdown={true}
                        selected={startDate}
                        onChange={(date) => handleDateChange("startDate",date)}
                    />

                </div>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="endDate">End Date</Label>
                <div id="endDate">
                    <DatePicker
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        allowSameDay = {false}
                        endDate={new Date()}
                        // scrollableYearDropdown={width<=576?true:false}
                        selected={endDate}
                        disabled={disableEndDate}
                        selectsEnd={true}
                        onChange={(date) => handleDateChange("endDate",date)}
                    />
                </div>
            </FormGroup>
            <div className="form-group form-check">
                <input
                name="disableEndDate"
                type="checkbox"
                {...register('disableEndDate')}
                id="disableEndDate"
                defaultChecked ={ initialData?.data?.disableEndDate}
                className={`form-check-input`}
                onChange={(d)=>{
                    console.log(d.target.checked);
                    setDisableEndDate(d.target.checked);
                    if (d.target.checked) handleDateChange("endDate",null)
                }} />
                <label htmlFor="disableEndDate" className="form-check-label">No end Date</label>
                {/* <div className="invalid-feedback">{errors.acceptTerms?.message}</div> */}
            </div>
            <Button
                type="submit"
                className={'mb-3'}
                color="primary"
                disabled={loadingData}
                >
                {
                    loadingData?
                        <Spinner />
                        :buttonText
                }
            </Button>
        </Form>
    
    )
}

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }

export default PortfolioForm;



