import React from 'react';
import { Footer } from "./components";
import { useSelector } from 'react-redux';
import { COMPANYFORM } from './store/modules/Form';
import { CompanyWrapper, UserLikeCompanyWrapper } from './containers';
import SideButtonWrapper from './containers/sideButtonWrapper/SideButtonWrapper';

// const HOST = "kjh-projects.kro.kr"
const HOST = "localhost"
export const BASE_URL = "http://"+HOST+":8080/recruit-list/"
export const testCompanyData = [
  {
      "id" : "0",
      "companyName" : "test1",
      "foundingYear" : 2000,
      "employeesNum" : 10,
      "companyInfos" : [
          {
              "siteName" : "testSite1",
              "uri" : 'http://localhost:3000'
          },
          {
              "siteName" : "testSite2",
              "uri" : 'http://localhost:3000'
          }
      ],
      "recruitmentNotices" : [
          {
              "siteName" : "testReSite1",
              "uri" : 'http://localhost:3000'
          },
          {
              "siteName" : "testReSite2",
              "uri" : 'http://localhost:3000'
          }
      ]
  },
  {
      "id" : "1",
      "companyName" : "test2",
      "foundingYear" : 2010,
      "employeesNum" : 5,
      "companyInfos" : [
          {
              "siteName" : "testSite3",
              "uri" : 'http://localhost:3000'
          },
          {
              "siteName" : "testSite4",
              "uri" : 'http://localhost:3000'
          }
      ],
      "recruitmentNotices" : [
          {
              "siteName" : "testReSite3",
              "uri" : 'http://localhost:3000'
          },
          {
              "siteName" : "testReSite4",
              "uri" : 'http://localhost:3000'
          }
      ]
  }
]

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
 