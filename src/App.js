import React from 'react';
import { Header } from "./components";
import { Footer } from "./components";
import { Company } from "./containers";
import { User } from "./containers";
import { useSelector } from 'react-redux';
import { containerClassSelector } from './store/lib/ClassSelector';

const App = () => {

  const containerClass = containerClassSelector();

    return (
      <div className="App">
        <Header/>
          {containerClass}
        <Footer/>
      </div>
  );
}

export default App;
 