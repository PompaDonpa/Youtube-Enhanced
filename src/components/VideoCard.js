import React from 'react';
import { Link } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityIcon from '@material-ui/icons/Visibility';
import moment from 'moment'
import 'moment-duration-format'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 480,
    justifySelf: 'space-between',
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    backgroundColor: '#6272a4',
  },title:{
    textTransform: 'capitalize',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  statDurationLive: { 
    position: 'relative',
    bottom: '28px',
    left: '380px',
    color: 'white', 
    backgroundColor: 'red',
    borderRadius: 6,
    padding: theme.spacing(0.5,0,0.5)
  },
  statDuration: {
    position: 'relative',
    bottom: '28px',
    left: '380px',
    color: 'white', 
    backgroundColor: 'black',
    borderRadius: 6,
    padding: theme.spacing(0.5,0,0.5),

  },
}));

const VideoCard = ({list, duration}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
const tagsList = list.snippet.tags ? list.snippet.tags : []
const tags = tagsList.map(tag =>{ return (
  <Typography variant='subtitle2'>
    # {tag}
  </Typography>
)})


  return (
    <Card className={classes.root}>
      <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                 {list.snippet.title[0]}
               </Avatar>
             }
             title={   
                   <Button component={Link} to={`/videos/${list.id}`} className={classes.title}>
                       {list.snippet.title}
                    </Button>
             }  
             subheader={moment(list.snippet.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
      />
      <CardMedia 
            className={classes.media}
            image={list.snippet.thumbnails.high.url} 
            title={list.snippet.title}
      />
          <Typography variant='span' className={ duration === 'LIVE' ? classes.statDurationLive : classes.statDuration } >
             &emsp;{duration}&emsp;
          </Typography>

      <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
              <strong>Channel Title&emsp;&emsp;&emsp;</strong>&emsp;{list.snippet.channelTitle}
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <strong>Licensed content&emsp;</strong>&emsp;&emsp;{list.contentDetails.licensedContent ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
             <strong>Definition&emsp;&emsp;&emsp;&emsp;&ensp;</strong>&emsp;&emsp;{list.contentDetails.definition === 'hd' ? 'HD': '480'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
              <strong>Description&emsp;&emsp;&emsp;&ensp;</strong>&emsp; Click <span style={{fontSize:'24px'}}>⌄</span>
          </Typography>
      </CardContent>

      <CardActions disableSpacing>
          <IconButton aria-label="views">
                <VisibilityIcon />
                <Typography span>
                  &ensp;&ensp;{parseInt(list.statistics.viewCount).toLocaleString()}
                </Typography>
          </IconButton>
          <IconButton aria-label="like">
                <ThumbUpAltIcon />
                <Typography span>
                 &ensp;&ensp;{parseInt(list.statistics.likeCount || 0).toLocaleString()}
                </Typography>
          </IconButton>
        <IconButton aria-label="dislike">
                <ThumbDownIcon />
                <Typography span>
                  &ensp;&ensp;{parseInt(list.statistics.dislikeCount || 0).toLocaleString()}
                </Typography>
        </IconButton>
        <IconButton 
              className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
        >
                <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description :</Typography>
          <Typography paragraph>
            {list.snippet.description}
          </Typography>
          <Typography paragraph>Tags :</Typography>
          <Typography paragraph>
          {tags}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
export default VideoCard