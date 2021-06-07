import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const localIpUrl = require('local-ip-url')

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.span,
    backgroundColor: '#a5e12d',
    padding: theme.spacing(0),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
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


  return (
          <div className={classes.root}>
              <span>[&emsp;Transylvania&emsp;]</span>
              <span>{local}</span>
              <span>Youtube Enhanced</span>
              <span>" MacBook Pro"</span>
              <span>{date}</span>  
          </div>
  )
}
export default Console