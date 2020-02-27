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

    componentDidMount(){
        if(cookie.load('jwt')!=null)
            this.searchCompany();
    }

    searchCompany() {
        axios.get("http://13.125.62.254:8080/user/company",{headers:{
            jwt:cookie.load('jwt')
        }}).then(Response=>{
            console.log(Response.data);
            if(Response.data==="login"){
                cookie.remove('jwt');
                window.location.reload();
            }else
                this.setState({company : Response.data});
        });
    }

    render(){
        if(cookie.load('jwt')!=null){
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