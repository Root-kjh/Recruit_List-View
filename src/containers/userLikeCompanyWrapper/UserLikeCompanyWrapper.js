import React from "react";
import { useSelector } from "react-redux";
import { Company } from "../../components";
const UserLikeCompanyWrapper = () => {
    
    const userLikeCompany = useSelector(state => state.userLikeCompany);

    return(
        <center><Company company={userLikeCompany}/></center>
    );
}

export default UserLikeCompanyWrapper;