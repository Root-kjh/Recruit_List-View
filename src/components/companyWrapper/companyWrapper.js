import React from "react";
import { Checkbox } from "react-md";
import { Company } from "../";
import { CompanyInfo } from "../";

const CompanyWrapper=({isUser})=>(
    <div>
        <label>CompanyName</label><input name="companyName"/>
        <label>채용 진행중</label><Checkbox/>
        <label>최소 직원수</label><input name="employeesNum"/>
        <label>최대 창립년도</label><input name="foundingYear"/>
        <button>검색</button>
        <Company isUser={isUser}/>
        <CompanyInfo isUser={isUser}/>
    </div>
)

export default CompanyWrapper;