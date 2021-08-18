import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import React from "react";
import moment from "moment";

const descriptionLength = 150;
const WorkCard = ({work, children}) =>
  <Card className="work-card">
    <CardHeader className="work-card-header">{work.jobTitle}</CardHeader>
    <CardBody>
      <p className="work-card-city">{work.location}</p>
      <p className="work-card-dates">{moment(work.startDate).format('MMM, YYYY')} - {work.endDate ? moment(work.endDate).format('MMM, YYYY') : "Current"}</p>
      <CardTitle className="work-card-title">{work.title}</CardTitle>
      <CardText className="work-card-text">{
        work.description.substring(0, descriptionLength) + (work.description.length > descriptionLength ? '...' : '')
      }</CardText>
      {children}
    </CardBody>
  </Card>

export default WorkCard;
