import React from 'react';
import { Header } from "./components";
import { Footer } from "./components";
import { useSelector } from 'react-redux';
import { COMPANYFORM } from './store/modules/Form';
import { CompanyWrapper, UserLikeCompanyWrapper } from './containers';

// const HOST = "kjh-projects.kro.kr"
const HOST = "localhost"
export const BASE_URL = "http://"+HOST+":8080/recruit-list/"

const App = () => {

  const companyForm = useSelector(state => state.form)

    return (
      <div className="App">
        <Header/>
          {companyForm === COMPANYFORM? <CompanyWrapper/> : <UserLikeCompanyWrapper/>}
        <Footer/>
      </div>
  );
}

export default App;
 