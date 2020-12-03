import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import cookie from 'react-cookies'
import axios from 'axios';
import { useState,useEffect } from "react";
import BASE_URL from '../../App';

export default function Company({company,userLikeCompany}){
    const [copenList, setCopen] = useState([]);
    const [nopenList, setNopen] = useState([]);
    const [checkedList, setCheck]=useState([]);
        
    const handleChange=(event,company)=>{
        const checked=event.target.checked;
        const uri="http://13.125.62.254:8080/user/company/"+company.id;
        const headers={headers:{jwt:cookie.load('jwt')}};
        if(checked){
            axios.put(uri,{},headers).then(
                setCheck(checkedList.concat(company))
            );
        }else{
            axios.delete(uri,headers).then(
                setCheck(checkedList.filter((value)=>{
                    return value.id!==company.id;
                }))
            );
        }
    };

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }

    useEffect(()=>{
            axios.get("http://13.125.62.254:8080/user/company",{headers:{
                jwt:cookie.load('jwt')
            }}).then(Response=>{    
                setCheck(Response.data);
            });
    },[]);

    const isUserLikeCompany=companyId=>{
        try{
        let flag=false;
        checkedList.forEach((e)=>{
            if(e.id===companyId)
                flag=true;
        });
        return flag;
        }catch{
        }
    };

    const isCopen=i=>{
        let flag=false;
        copenList.forEach(element => {
            if(element===i)
                flag=true;
        });

        return flag;
    }

    const isNopen=i=>{
        let flag=false;
        nopenList.forEach(element => {
            if(element===i)
                flag=true;
        });

        return flag;
    }

    const handleCopen=(event,i)=>{
        if (isCopen(i))
            setCopen(copenList.filter((n)=>{return n!==i}));
        else
            setCopen(copenList.concat(i));
    }

    const handleNopen=(event,i)=>{
        if (isNopen(i))
            setNopen(nopenList.filter((n)=>{return n!==i}));
        else
            setNopen(nopenList.concat(i));
    }

    return(
    <div>
        {company.map((com,i)=>{
            return(<ExpansionPanel key={i}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {
                        (cookie.load('jwt')!=null)?
                    <FormControlLabel
                        control={<Checkbox checked={isUserLikeCompany(com.id)} value={com.id} onClick={(e)=>handleChange(e,com)}/>}
                        label={com.companyName}
                    />:
                    <Typography>{com.companyName}</Typography>
                    }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        <ListItem>
                            <ListItemText primary={"직원수 : "+com.employeesNum}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={"창립년도 : "+com.foundingYear}/>
                        </ListItem>
                        <ListItem button onClick={(e)=>handleNopen(e,i)}>
                            <ListItemText primary="채용공고" />
                                {isNopen(i) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={isNopen(i)} timeout="auto" unmountOnExit>
                                <List>
                                    {com.recruitmentNotices.map((notice,j)=>{
                                        return(
                                            <ListItemLink key={j} href={notice.uri}>
                                                <ListItemText  primary={notice.siteName}/>
                                            </ListItemLink>
                                        )
                                    })}
                                </List>
                            </Collapse>
                            <ListItem button value={i} onClick={(e)=>{handleCopen(e,i)}}>
                            <ListItemText primary="기업정보" />
                                {isCopen(i) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={isCopen(i)} timeout="auto" unmountOnExit>
                                <List>
                                    {com.companyInfos.map((info,j)=>{
                                        return(
                                            <ListItemLink key={j} href={info.uri}>
                                                <ListItemText  primary={info.siteName}/>
                                            </ListItemLink>
                                        )
                                    })}
                                </List>
                            </Collapse>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>) 
        })}
    </div>
    );
}