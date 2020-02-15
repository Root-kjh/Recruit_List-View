import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';

const useStyles = makeStyles({
    root: {
        position:"fixed",
        left:"40%",
        bottom:"0"
    },
    navTab:{
        width:"200px"
    }
  });  

export default function Footer(){
    
    const classes=useStyles();

    const handleToggle=(e)=>{
        window.location.href=e;
    }

    return(
    <footer className={classes.root}>
        <BottomNavigation showLabels>
            <BottomNavigationAction onClick={event=>window.location.href='https://github.com/Root-kjh'} className={classes.navTab} label="github" icon={<GitHubIcon />} />
            <BottomNavigationAction onClick={event=>window.location.href='mailto:wldnro3141@gmail.com'} className={classes.navTab} label="Gmail" icon={<AlternateEmailOutlinedIcon />} />
            <BottomNavigationAction onClick={event=>window.location.href='https://root-kjh.github.io/'} className={classes.navTab} label="Blog" icon={<FormatBoldOutlinedIcon />} />
        </BottomNavigation>
    </footer>
    );
}