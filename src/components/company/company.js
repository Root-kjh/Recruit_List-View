import React from "react";

const Company=({company})=>(
    <div>
        <ul>
            {company.map((com,i)=>{
                return(<li key={i}>
                    {com.companyName}
                </li>) 
            })}
        </ul>
    </div>
)

export default Company;