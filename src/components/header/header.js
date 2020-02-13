import React from "react";
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
class Header extends React.Component{

    constructor(props){
        super(props);
        this.setHeader=this.setHeader.bind(this);
        this.state={
            open:false
        };
    }

    setHeader(e){
        this.props.setHeaderName(e.target.textContent);
    }

    handleToggle(){
        console.log("test");
    }

    render(){
      
        const headers=this.props.headers.map((header)=>
        <li onClick={this.setHeader}>{header}</li>);

        return(
            <MuiThemeProvider>
                <AppBar
                    title={this.props.name}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onRightIconButtonClick={console.log("Test2")}
                    showMenuIconButton={true}
                    children={this.headers}
                />
            </MuiThemeProvider>
        );
    }
}

export default Header;