import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form"

const PortfolioForm = ({onSubmit}) => {
    const { width } = useWindowDimensions();
    const { control, register, handleSubmit, setValue } = useForm();
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [disableEndDate, setDisableEndDate] = useState(false)

    const handleDateChange = (field, date: any) => {
        if (field === "startDate"){
            setStartDate(date)
        }
        else if (field === "endDate"){
            
            setEndDate(date)
        }
        
        setValue(field,date);
    }

    // const handleEndDate = (date: any) => {
    //     setValue("endDate",date.toISOString());
    // }

    useEffect(() => {
        register('startDate');
        register('endDate');
    },[register])

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                name="title"
                type="text"
                placeholder="XYZ"
                {...register("title")}
                id="title"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="company">Company</Label>
                <Input
                name="company"
                type="text"
                placeholder="Company X"
                {...register("company")}
                id="company"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                name="companyWebsite"
                type="text"
                placeholder="https://example.com"
                {...register("companyWebsite")}
                id="companyWebsite"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="location">Location</Label>
                <Input
                name="location"
                type="text"
                placeholder="Gaborone, Botswana"
                {...register("location")}
                id="location"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                name="jobTitle"
                type="text"
                placeholder="Web Developer"
                {...register("jobTitle")}
                id="jobTitle"/>
            </FormGroup>

            <FormGroup>
                <Label htmlFor="description">Description</Label>
                <Input 
                name="description"
                rows="5"
                type="text"
                placeholder="I worked on XYZ..."
                {...register("description")}
                id="description">
                </Input>
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
                        scrollableYearDropdown={width<=576?true:false}
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
                className=""
                color="primary"
                >
                    Create
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



