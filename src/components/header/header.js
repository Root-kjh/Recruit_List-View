import React from "react";

class Header extends React.Component{

    constructor(props){
        super(props);
        this.setHeader=this.setHeader.bind(this);
    }

    setHeader(e){
        this.props.setHeaderName(e.target.textContent);
    }

    render(){
      
        const headers=this.props.headers.map((header)=>
        <li onClick={this.setHeader}>{header}</li>);

        return(
        <header>
            <ul>
                {headers}
            </ul>
        </header>
        );
    }
}

export default Header;