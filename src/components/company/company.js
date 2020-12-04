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
import { BASE_URL } from '../../App';
import { useDispatch, useSelector } from "react-redux";
import { insert_userLikeCompany, delete_userLikeCompany } from "../../store/modules/UserLikeCompany";

const Company = company =>{
    console.log(company);
    const [copenList, setCopen] = useState([]);
    const [nopenList, setNopen] = useState([]);
    
    const dispatch = useDispatch()
    const jwt = useSelector(state => state.jwt);
    const userLikeCompany = useSelector(state => state.userLikeCompany);

    const handleChange=(event,company)=>{
        const checked=event.target.checked;
        if(checked){
            axios.put(BASE_URL+"user/add_like_company",{},{
                headers:{
                    "X-AUTH-TOKEN": jwt
                }
            }).then(() => {
                dispatch(insert_userLikeCompany(company));
            }).catch(error => {
                console.log(error);
                alert("오류발생");
            });
        }else{
            axios.delete(BASE_URL+"user/delete_like_company",{
                headers:{
                    "X-AUTH-TOKEN": jwt
                }
            }).then(() =>{
                dispatch(delete_userLikeCompany(company.id));
            }).catch(error => {
                console.log(error);
                alert("오류발생");
            });
        }
    };

    const ListItemLink = props => {
        return <ListItem button component="a" {...props} />;
      }

    const isUserLikeCompany = companyId => {
        try{
        let flag = false;
        userLikeCompany.forEach(e => {
            if (e.id === companyId)
                flag = true;
        });
        return flag;
        } catch (error) {
            console.log(error);
        }
    };

    const isCopen = i => {
        let flag=false;
        copenList.forEach( element => {
            if (element === i)
                flag = true;
        });
        return flag;
    }

    const isNopen = i => {
        let flag = false;
        nopenList.forEach(element => {
            if (element === i)
                flag = true;
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
        {company.company.map((com,i)=>{
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

export default Company;