import React from "react";
import { Checkbox } from "react-md";
import { Company } from "../";
import { CompanyInfo } from "../";
import axios from 'axios';

let pageElement=null;

class  CompanyWrapper extends React.Component{

    constructor(props){
        super(props);
        this.searchCompany=this.searchCompany.bind(this);
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
            return("http://127.0.0.1:8080/company/search/companyname/"+this.state.CompanyName+"/page/0")
        }
        return("http://127.0.0.1:8080/company/is-recruit/"
        +this.state.isRecruit+
        "/employeesnum-min/"+this.state.employeesNum+
        "/foundingyear-max/"+this.state.foundingYear+
        "/page/"+this.state.page);
    }



    searchCompany() {
        axios.get(this.getRequestURI()).then(Response=>{this.setState({company : Response.data});});
        pageElement=(<div><button>prev Page</button>{this.state.page}<button>next Page</button></div>);
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

    return(
        <div>
            <label>CompanyName</label><input name="companyName" onChange={this.handleChange} value={this.state.CompanyName}/>
            <label>채용 진행중</label><input type="checkbox" name="isRecruit"  onChange={this.handleChange} checked={this.state.isRecruit} />
            <label>최소 직원수</label><input name="employeesNum" onChange={this.handleChange} value={this.state.employeesNum}/>
            <label>최대 창립년도</label><input name="foundingYear" onChange={this.handleChange} value={this.state.foundingYear}/>
            <button onClick={this.searchCompany}>검색</button>
            <Company isUser={this.props.isUser} company={this.state.company}/>
            <CompanyInfo isUser={this.props.isUser} company={this.state.company}/>
            {pageElement}
        </div>
    );
    }
}
export default CompanyWrapper;