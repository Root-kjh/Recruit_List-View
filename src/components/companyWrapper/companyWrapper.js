import React from "react";
import { Company } from "../";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';

let pageElement=null;

const useStyles = {
    root:{
        margin: '10px',
        alignItems:'center'
    },
    TextField:{
        margin: '8px'
    },
    Form: {
        width: '1000px',
        border: 'solid 1px #115293',
        borderRadius: '8px',
        margin: '25px auto'
    },
    Checkbox: {
        marginTop: '15px'
    }
};

class  CompanyWrapper extends React.Component{

    constructor(props){
        super(props);
        this.searchCompany=this.searchCompany.bind(this);
        this.pageDown=this.pageDown.bind(this);
        this.pageUp=this.pageUp.bind(this);
        this.state={
            CompanyName : "",
            isRecruit : false,
            employeesNum : 0,
            foundingYear : new Date().getFullYear(),
            page : 0,
            company : []
          };
    }

    componentDidMount(){
        this.setState({page : 0});
        pageElement=null;
    }

    getRequestURI(){
        if(this.state.CompanyName.length>0){
            return("http://13.125.62.254:8080/company/search/companyname/"+this.state.CompanyName+"/page/0")
        }
        return("http://13.125.62.254:8080/company/is-recruit/"
        +this.state.isRecruit+
        "/employeesnum-min/"+this.state.employeesNum+
        "/foundingyear-max/"+this.state.foundingYear+
        "/page/"+this.state.page);
    }

    pageDown(){
        this.setState({
            page: this.state.page-1
        });
        this.searchCompany();
    }

    pageUp(){
        this.setState({
            page: this.state.page+1
        });
        this.searchCompany();
    }

    searchCompany() {
        axios.get(this.getRequestURI()).then(Response=>{pageElement=(<div style={{width:"106px", margin:"20px auto",marginBottom:"100px"}}>{this.state.page>0 && <IconButton onClick={this.pageDown}><ArrowBackIosIcon/></IconButton >}{this.state.page}<IconButton onClick={this.pageUp}><ArrowForwardIosIcon/></IconButton></div>);
        this.setState({company : Response.data});});
    }

    paging(page){
        this.setState({page : {page}});
    }

    handleChange=(e)=>{
        this.setState({
            CompanyName : document.getElementsByName("companyName")[0].value,
            isRecruit : document.getElementsByName("isRecruit")[0].checked,
            employeesNum : document.getElementsByName("employeesNum")[0].value,
            foundingYear : document.getElementsByName("foundingYear")[0].value
        });
    }

    render(){
        const {classes} = this.props;
    return(
        <div className={classes.root}>
            <div className={classes.Form}>
                <TextField className={classes.TextField} fullWidth name="companyName" style={{width:"800px",marginLeft:"100px"}} label="CompanyName" onChange={this.handleChange} value={this.state.CompanyName}/>
                <TextField className={classes.TextField} id="outlined-basic" type="number" name="employeesNum" style={{marginLeft:"100px"}} onChange={this.handleChange} value={this.state.employeesNum} label="최소 직원수" variant="outlined" />
                <TextField className={classes.TextField} id="outlined-basic" type="number" name="foundingYear" onChange={this.handleChange} value={this.state.foundingYear} label="최대 창립년도" variant="outlined" />
                <FormControlLabel
                    control={
                        <Checkbox
                            className={classes.Checkbox}
                            onChange={this.handleChange} 
                            checked={this.state.isRecruit}
                            name="isRecruit" 
                            color="primary"
                        />
                    }
                    label="채용 진행중"
                />
                <Button variant="contained" style={{float:"right",marginRight:"30px"}} color="primary" onClick={this.searchCompany}>
                    검색
                </Button>
            </div>
            <Company company={this.state.company}/>
            {pageElement}
        </div>
    );
    }
}
export default withStyles(useStyles)(CompanyWrapper);