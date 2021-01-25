  
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
import { BASE_URL } from '../../App';
import { Grid } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';

const CompanyWrapper = () => {

    const [filter, setFilter] = useState({
        companyName : "",
        isRecruit : false,
        employeesNum : 0,
        foundingYear : new Date().getFullYear(),
        page : 0,
        company : Array(0)
    })

    const {companyName, isRecruit, employeesNum, foundingYear, page, company} = filter;

    const [searchType, setSearchType] = useState("none");

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
        });
    }

    const searchCompany = () => {
        axios.get(BASE_URL+"company/search/"+companyName+"/"+page).then(response => {
            setFilter({...filter, company: response.data});
        }).catch(error => {
            console.log(error);
        });
    }

    const filterCompany = () => {
        axios.post(BASE_URL+"company/filter",{
            "isRecruiting": isRecruit,
            "foundingYear": foundingYear,
            "employeesNum": employeesNum,
            "page": page
        }).then( response => {
            setFilter({...filter, company: response.data});
        }).catch(error => {
            console.log(error);
        });
    }

    const clickSearchButton = () => {
        setFilter({...filter, page: 0});
        if (companyName === ""){
            setSearchType("none");
            showCompany();
        }else{
            setSearchType("search");
            searchCompany();
        }
    }

    const clickFilterButton = () => {
        setFilter({...filter, page: 0});
        setSearchType("filter");
    }

    const handleChange = e => {
        const [name, value] = e.target;
        setFilter({...filter, [name]: value});
    }

    const pageElement = {
        backButton: <IconButton onClick={()=>setPage(page-1)}><ArrowBackIosIcon/></IconButton>,
        page: page+1,
        forwardButton: <IconButton onClick={()=>setPage(page+1)}><ArrowForwardIosIcon/></IconButton>
    }
    
    const GetPageButton = () => {
        console.log(pageElement)
        if(page === 0 && company === []){
            return null
        } else if (company.length < 20){
            return <div>{pageElement.backButton}{pageElement.page}</div>
        } else if (page === 0){
            return <div>{pageElement.page}{pageElement.forwardButton}</div>
        } else {
            return <div>{pageElement.backButton}{pageElement.page+pageElement.forwardButton}</div>
        }
    }

    return(
        <center>
            <Grid 
                container
                justify="center"
                alignItems="center"
                xs={6}
            >
                <Grid item xs={12} style={{marginBottom:10}}>
                    <FormControl style={{width:"80%"}}>
                        <TextField
                            name="companyName"
                            label="CompanyName"
                            onChange={handleChange}
                            value={companyName}
                        />
                        </FormControl>
                    <FormControl style={{width:"10%", marginTop:'15px', marginLeft:'30px'}}>
                        <Button variant="contained" color="primary" onClick={clickSearchButton}>
                            검색
                        </Button>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-size-small"
                        type="number"
                        name="employeesNum"
                        onChange={handleChange}
                        value={employeesNum}
                        label="최소 직원수"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="outlined-size-small"
                        type="number"
                        name="foundingYear"
                        onChange={handleChange}
                        value={foundingYear}
                        label="최대 창립년도"
                        variant="outlined"
                        size="small"
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label="채용 진행중"
                        labelPlacement="bottom"
                        control={
                            <Checkbox
                                style={{padding:0}}
                                // onChange={handleChange} 
                                checked={isRecruit}
                                name="isRecruit" 
                                color="primary"
                                size="small"
                            />
                        }
                    />
                    <Button variant="contained" color="primary" onClick={clickFilterButton}>
                        필터
                    </Button>
                </Grid>
            </Grid>
            <Company company={company}/>
            <GetPageButton/>
        </center>
    );
}
export default CompanyWrapper;