import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import React from "react";
import moment from "moment";

const descriptionLength = 150;
const ProjectCard = ({project, children}) =>
  <Card className="project-card">
    <CardHeader className="project-card-header">{project.jobTitle}</CardHeader>
    <CardBody>
      <p className="project-card-city">{project.location}</p>
      <p className="project-card-dates">{moment(project.startDate).format('MMM, YYYY')} - {project.endDate ? moment(project.endDate).format('MMM, YYYY') : "Current"}</p>
      <CardTitle className="project-card-title">{project.title}</CardTitle>
      <CardText className="project-card-text">{
        project.description.substring(0, descriptionLength) + (project.description.length > descriptionLength ? '...' : '')
      }</CardText>
      {children}
    </CardBody>
  </Card>

export default ProjectCard;
