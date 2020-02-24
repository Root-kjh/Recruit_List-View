import React from "react";
import { SignIn } from "../";
import { Company } from "../";

class  UserWrapper extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name : '',
            email : '',
            company : []
        };
    }

    // getRequestURI(){
    //     if(this.state.CompanyName.length>0){
    //         return("http://127.0.0.1:8080/company/search/companyname/"+this.state.CompanyName+"/page/0")
    //     }
    //     return("http://127.0.0.1:8080/company/is-recruit/"
    //     +this.state.isRecruit+
    //     "/employeesnum-min/"+this.state.employeesNum+
    //     "/foundingyear-max/"+this.state.foundingYear+
    //     "/page/"+this.state.page);
    // }

    // searchCompany() {
    //     axios.get(this.getRequestURI()).then(Response=>{this.setState({company : Response.data});});
    //     pageElement=(<div><button>prev Page</button>{this.state.page}<button>next Page</button></div>);
    // }

    render(){
        if(this.props.jwt!=null){
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