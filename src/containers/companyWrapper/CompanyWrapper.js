  
import React, { useState } from "react";
import axios from 'axios';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import IconButton from '@material-ui/core/IconButton';
import { Company } from "../../components";
import BASE_URL from '../../App';

let pageElement=null;

const CompanyWrapper = () => {

    const [filter, setFilter] = useState({
        companyName : "",
        isRecruit : false,
        employeesNum : 0,
        foundingYear : new Date().getFullYear(),
        page : 0,
        company : []
    })
    const {companyName, isRecruit, employeesNum, foundingYear, page, company} = filter;

    const [searchType, setSearchType] = useState("none");

    const getRequestURI = () => {
        if(companyName.length>0){
            return("http://13.125.62.254:8080/company/search/companyname/"+companyName+"/page/"+page)
        }
        return("http://13.125.62.254:8080/company/is-recruit/"
        +isRecruit+
        "/employeesnum-min/"+employeesNum+
        "/foundingyear-max/"+foundingYear+
        "/page/"+page);
    }

    const setPage = pg => {
        setFilter({...filter, page: pg});
        if (searchType === "none")
            showCompany();
        else if (searchType === "filter")
            filterCompany();
        else
            searchCompany();
    }

    const showCompany = () => {
        axios.get(BASE_URL+"company/show/"+page).then(response => {
            setFilter({...filter, company: response.data});
        }).catch(error => {
            console.log(error);
            alert("오류 발생");
        });
    }

    const searchCompany = () => {
        axios.get(getRequestURI()).then(Response=>{pageElement=(
        <div >{page>0 && <IconButton onClick={setPage(page-1)}><ArrowBackIosIcon/></IconButton >}
        {page+1}{Response.data.length===20 && <IconButton onClick={setPage(page+1)}><ArrowForwardIosIcon/></IconButton>}</div>);
        this.setState({company : Response.data});});
    }

    const filterCompany = () => {

    }

    const clickSearchButton = () => {
        setFilter({...filter, page: 0});
        setSearchType("search");
        searchCompany();
    }

    const clickFilterButton = () => {
        setFilter({...filter, page: 0});
        setSearchType("filter");
    }

    const handleChange = e => {
        const [name, value] = e.target;
        setFilter({...filter, [name]: value});
    }

    return(
        <div >
            <div >
                <TextField fullWidth name="companyName" label="CompanyName" onChange={handleChange} value={companyName}/>
                <Button variant="contained" color="primary" onClick={clickSearchButton}>
                    검색
                </Button>
                <TextField id="outlined-basic" type="number" name="employeesNum" onChange={handleChange} value={employeesNum} label="최소 직원수" variant="outlined" />
                <TextField id="outlined-basic" type="number" name="foundingYear" onChange={handleChange} value={foundingYear} label="최대 창립년도" variant="outlined" />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={handleChange} 
                            checked={isRecruit}
                            name="isRecruit" 
                            color="primary"
                        />
                    }
                    label="채용 진행중"
                />
                <Button variant="contained" color="primary" onClick={clickFilterButton}>
                    필터
                </Button>
            </div>
            <Company company={company}/>
            {(page === 0 && company === [])? null : pageElement}
        </div>
    );
}
export default CompanyWrapper;