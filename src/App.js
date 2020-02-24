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
    this.state={
      headerName : "company"
    };
  }

  setHeaderName(name){
    this.setState({headerName : name});
  }  

  render(){
    return (
      <div className="App">
        <Header name={this.state.headerName} setHeaderName={this.setHeaderName} headers={headers}/>
        {(this.state.headerName==="company")?<Company/>:<User/>}
        <Footer/>
      </div>
      );
    }
}

export default App;
