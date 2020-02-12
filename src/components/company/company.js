import React from "react";
import axios from "../../api/axios";
class Company extends React.Component{

    constructor(props){
        super(props);
        this.state={
            Company : []
        };
    }

    function=async text=>{
        const response=await axios.get('/company/');

        this.setState({
            Company : response.data.result
        });
    }

    getCompany();

    render(){
        return(
            <div>
            {this.responseOK && await this.response.data}
            </div>
        )
    }
}
export default Company;