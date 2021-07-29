import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
import React from "react";

const descriptionLength = 150;
const PortfolioCard = ({portfolio, children}) =>
  <Card className="portfolio-card">
    <CardHeader className="portfolio-card-header">{portfolio.jobTitle}</CardHeader>
    <CardBody>
      <p className="portfolio-card-city">{portfolio.location}</p>
      <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
      <CardText className="portfolio-card-text">{
        portfolio.description.substring(0, descriptionLength) + (portfolio.description.length > descriptionLength ? '...' : '')
      }</CardText>
      {children}
    </CardBody>
  </Card>

export default PortfolioCard;
