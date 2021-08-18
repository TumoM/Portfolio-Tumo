// import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
// import React from "react";
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

const descriptionLength = 150;
// const PortfolioCard2 = ({portfolio, children}) =>
//   <Card className="portfolio-card">
//     <CardHeader className="portfolio-card-header">{portfolio.jobTitle}</CardHeader>
//     <CardBody>
//       <p className="portfolio-card-city">{portfolio.location}</p>
//       <p className="portfolio-card-dates">{moment(portfolio.startDate).format('MMM, YYYY')} - {portfolio.endDate ? moment(portfolio.endDate).format('MMM, YYYY') : "Current"}</p>
//       <CardTitle className="portfolio-card-title">{portfolio.title}</CardTitle>
//       <CardText className="portfolio-card-text">{
//         portfolio.description.substring(0, descriptionLength) + (portfolio.description.length > descriptionLength ? '...' : '')
//       }</CardText>
//       {children}
//     </CardBody>
//   </Card>
const imageOptions = {
  height:345,
  alt: 'Portfolio Thumbnail',
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: imageOptions.height,
    marginBottom: 20,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  media: {
    height: 200,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));



const PortfolioCard = ({portfolio, children}) => {
  const classes = useStyles();
  console.log("TAGS:",portfolio.tags);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [chipData, setChipData] = useState(portfolio?.tags)

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);

  return (
    <Card className={classes.root+ ' mx-auto portfolio-card'}>
      <CardActionArea>
      {visible
      ? <CardMedia
          className={classes.media}
          image={portfolio.thumbnail}
          title="Portfolio Thumbnail"
        /> : 
        <div className={classes.box}style={{height: imageOptions.height, backgroundColor: '#e2e2e2', display: 'flex'}} aria-label={imageOptions.alt} ref={placeholderRef}>
          <CircularProgress color="primary" />
        </div>}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {portfolio.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {portfolio.description.substring(0, descriptionLength) + (portfolio.description.length > descriptionLength ? '...' : '')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider/>
      <CardActions>
      {chipData.map((data, i) => {
        if (data.trim().length > 0) {
          return (
            <Chip
              key={i}
              label={data}
              size="small"
              className={classes.chip}
            />
        );
        }
       
      })}
      </CardActions>
      <Divider/>

      <div className='my-2 ml-2'>
        {children}
      </div>
    </Card>
  );
}

export default PortfolioCard;

