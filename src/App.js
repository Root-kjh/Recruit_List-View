import React from 'react';
import { Header } from "./components";
import { Footer } from "./components";
import { chooseContainers } from './components';

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
        {chooseContainers(this.state.headerName)}
        <Footer/>
      </div>
      );
    }
}

export default App;
