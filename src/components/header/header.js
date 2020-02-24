import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import cookie from 'react-cookies'

class Header extends React.Component{

    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.logout=this.logout.bind(this);
        this.state={
            value:0
        };
    }

    logout(){
        cookie.remove('jwt');
    }

    handleChange(e,value){
        this.setState({value : value});
        this.props.setHeaderName(this.props.headers[value]);
    }

    render(){
      
        const headers=this.props.headers.map((header,index)=>
        <Tab key={index} label={header}/>);

        return(
            <div>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange}>
                        {headers}
                        {(cookie.load('jwt')!=null)? <Tab label="logout" onClick={this.logout}/>:null}
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

export default Header;