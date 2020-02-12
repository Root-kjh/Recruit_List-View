import React from "react";
import { Checkbox } from "react-md";
import { Company } from "../";
import { CompanyInfo } from "../";

class  CompanyWrapper extends React.Component{

    constructor(props){
        super(props);
        this.searchCompany=this.searchCompany.bind(this);
        this.state={
            CompanyName : "",
            isRecruit : false,
            employeesNum : new Date().getFullYear()
          };
    }

    searchCompany() {
        this.setState({
            CompanyName : document.getElementsByName("companyName")[0].value,
            isRecruit : document.getElementsByName("isRecruit")[0].value,
            employeesNum : document.getElementsByName("employeesNum")[0].value,
            foundingYear : document.getElementsByName("foundingYear")[0].value
        });
    }

    render(){

    return(
        <div>
            <label>CompanyName</label><input name="companyName" value={this.state.CompanyName}/>
            <label>채용 진행중</label><Checkbox name="isRecruit" value={this.state.isRecruit}/>
            <label>최소 직원수</label><input name="employeesNum" value={this.state.employeesNum}/>
            <label>최대 창립년도</label><input name="foundingYear" value={this.state.foundingYear}/>
            <button onClick={this.searchCompany}>검색</button>
            <Company isUser={this.props.isUser}/>
            <CompanyInfo isUser={this.props.isUser}/>
        </div>
    );
    }
}
export default CompanyWrapper;