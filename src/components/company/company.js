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
import { useState } from "react";
export default function Company({company,userLikeCompany}){

    const [copenList, setCopen] = useState([]);
    const [nopenList, setNopen] = useState([]);
    const [checkedList, setCheck]=useState([]);
        
    const handleChange=(event,companyId)=>{
        console.log(userLikeCompany)
        console.log(event);
        const checked=event.target.checked;
        const uri="http://127.0.0.1:8080/user/company/"+companyId;
        const headers={headers:{jwt:cookie.load('jwt')}};
        if(event.target.checked){
            axios.put(uri,{},headers).then(Response=>{
                if(Response.data===true)
                    event.target.checked=checked;
            });
        }else{
            axios.delete(uri,headers).then(Response=>{
                if(Response.data===true)
                    event.target.checked=checked;
            });
        }
    };

    const isUserLikeCompany=companyId=>{
        userLikeCompany.filter((e)=>{
            return e===companyId;
        })
    };

    const handleCopen=(i)=>{
        console.log(i);
        if (i in copenList)
            setCopen(copenList.filter((n)=>{return n!=i}));
        else
            setCopen(copenList.concat(i));
        console.log(copenList);
    }

    const handleNopen=(i)=>{
        if (i in nopenList)
            setNopen(nopenList.filter((n)=>{return n!=i}));
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
                        control={<Checkbox checked={i in checkedList} onClick={handleChange.bind(com.id)}/>}
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
                        <ListItem button onClick={handleNopen.bind(i)}>
                            <ListItemText primary="채용공고" />
                                {(i in nopenList) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={i in nopenList} timeout="auto" unmountOnExit>
                                <List>
                                    {com.recruitmentNotices.map((notice,j)=>{
                                        return(
                                            <ListItem key={j}>
                                                <ListItemText  primary={notice.siteName+" : "+notice.uri}/>
                                            </ListItem>
                                        )
                                    })}
                                </List>
                            </Collapse>
                            <ListItem button value={i} onClick={()=>{handleCopen(this)}}>
                            <ListItemText primary="기업정보" />
                                {(i in copenList) ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={i in copenList} timeout="auto" unmountOnExit>
                                <List>
                                    {com.companyInfos.map((info,j)=>{
                                        return(
                                            <ListItem key={j}>
                                                <ListItemText  primary={info.siteName+" : "+info.uri}/>
                                            </ListItem>
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