import React from 'react';
import { Header } from "./components";
import { Footer } from "./components";
import { Company } from "./containers";
import { User } from "./containers";

const headers=["company","user"];

class App extends React.Component {
  constructor(props){
    super(props);
    this.setHeaderName=this.setHeaderName.bind(this);
    this.setJWT=this.setJWT.bind(this);
    this.state={
      headerName : "company",
      jwt:null
    };
  }

  setJWT(jwt){
    this.setState({jwt:jwt});
  }

  setHeaderName(name){
    this.setState({headerName : name});
  }  

  render(){
    return (
      <div className="App">
        <Header name={this.state.headerName} setHeaderName={this.setHeaderName} headers={headers}/>
        {(this.state.headerName=="company")?<Company/>:<User setJWT={this.setJWT} jwt={this.state.jwt}/>}
        <Footer/>
      </div>
      );
    }
}

export default App;
