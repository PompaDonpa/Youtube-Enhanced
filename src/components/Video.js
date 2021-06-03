import React from 'react';
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { Typography } from '@material-ui/core';

const Video = () => {
    return (
        <div>
            <Button 
                    component={Link} 
                    to="/home" 
                    variant="contained"
                    color="primary">
                        
                <Typography variant="h5">
                    Go back - Home
                </Typography>
            </Button>
            
        </div>
    );
};

export default Video