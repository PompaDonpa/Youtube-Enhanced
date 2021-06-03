import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const localIpUrl = require('local-ip-url')

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.span,
    backgroundColor: ({ green }) => (green ? '#5de4c7' : '#a5e12d'),

    padding: theme.spacing(0),
  },
}));


function Console() {
  const classes = useStyles();

  const [ date, setDate ] = useState(0);
  const [ local, setLocal ] = useState(0);


  const getDate = () =>{ 
      let date = new Date().toDateString();
      return date
   }
  
  useEffect(()=>{
      let local = localIpUrl('public','ipv6')
      setLocal(local)
      setDate(getDate())
  },[])


  return <div className={classes.root}>&emsp;[&emsp;Transilvania&emsp;]&emsp;&emsp;&emsp;&emsp;{local}&emsp;:&emsp;Youtube Enhanced&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" MacBook Pro"&emsp;&emsp;&emsp;&emsp;{date}</div>;
}
export default Console