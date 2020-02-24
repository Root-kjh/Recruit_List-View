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

export default function Company({company}){

    const [copen, setCopen] = React.useState(false);
    const [nopen, setNopen]=React.useState(false);

    return(
    <div>
        {company.map((com,i)=>{
            return(<ExpansionPanel key={i}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {
                        (cookie.load('jwt')!=null)?
                    <FormControlLabel
                        control={<Checkbox />}
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
                        <ListItem button onClick={()=>setNopen(!nopen)}>
                            <ListItemText primary="채용공고" />
                                {nopen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={nopen} timeout="auto" unmountOnExit>
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
                            <ListItem button onClick={()=>setCopen(!copen)}>
                            <ListItemText primary="기업정보" />
                                {copen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={copen} timeout="auto" unmountOnExit>
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