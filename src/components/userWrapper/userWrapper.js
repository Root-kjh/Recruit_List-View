import React from "react";
import { SignIn } from "../";
import { Company } from "../";
import cookie from 'react-cookies'
import axios from 'axios';

class  UserWrapper extends React.Component{

    constructor(props){
        super(props);
        this.searchCompany=this.searchCompany.bind(this);
        this.state={
            name : '',
            email : '',
            company : []
        };
    }

    searchCompany() {
        axios.get("http://127.0.0.1:8756/user/company",{headers:{
            jwt:cookie.load('jwt')
        }}).then(Response=>{
            console.log(Response.data);
            if(Response.data=="login"){
                cookie.remove('jwt');
                window.location.reload();
            }else
                this.setState({company : Response.data});
        });
    }

    render(){
        if(cookie.load('jwt')!=null){
            this.searchCompany();
            return(
                <div>
                    <Company company={this.state.company}/>
                </div>
            );
        }else{
            return(
                <div>
                    <SignIn/>
                </div>
            );
        }
    }
}
export default UserWrapper;