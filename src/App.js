import React from 'react';
import { Footer } from "./components";
import { useSelector } from 'react-redux';
import { COMPANYFORM } from './store/modules/Form';
import { CompanyWrapper, UserLikeCompanyWrapper } from './containers';
import SideButtonWrapper from './containers/sideButtonWrapper/SideButtonWrapper';

// const HOST = "kjh-projects.kro.kr"
const HOST = "localhost"
export const BASE_URL = "http://"+HOST+":8080/recruit-list/"

const App = () => {

  const companyForm = useSelector(state => state.form)

    return (
      <div className="App">
        <SideButtonWrapper/>
          {companyForm === COMPANYFORM? <CompanyWrapper/> : <UserLikeCompanyWrapper/>}
        <Footer/>
      </div>
  );
}

export default App;
 