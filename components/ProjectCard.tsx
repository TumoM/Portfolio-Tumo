// import { Card, CardHeader, CardBody, CardText, CardTitle } from 'reactstrap';
// import React from "react";
import React, { useState } from 'react';
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

const descriptionLength = 150;
// const ProjectCard2 = ({project, children}) =>
//   <Card className="project-card">
//     <CardHeader className="project-card-header">{project.jobTitle}</CardHeader>
//     <CardBody>
//       <p className="project-card-city">{project.location}</p>
//       <p className="project-card-dates">{moment(project.startDate).format('MMM, YYYY')} - {project.endDate ? moment(project.endDate).format('MMM, YYYY') : "Current"}</p>
//       <CardTitle className="project-card-title">{project.title}</CardTitle>
//       <CardText className="project-card-text">{
//         project.description.substring(0, descriptionLength) + (project.description.length > descriptionLength ? '...' : '')
//       }</CardText>
//       {children}
//     </CardBody>
//   </Card>

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 20,
  },
  media: {
    height: 200,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const ProjectCard = ({project, children}) => {
  const classes = useStyles();
  console.log("TAGS:",project.tags);
  
  const [chipData, setChipData] = useState(project?.tags)

  return (
    <Card className={classes.root+ ' mx-auto'}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={project.thumbnail}
          title="Project Thumbnail"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {project.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {project.description.substring(0, descriptionLength) + (project.description.length > descriptionLength ? '...' : '')}
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

export default ProjectCard;

