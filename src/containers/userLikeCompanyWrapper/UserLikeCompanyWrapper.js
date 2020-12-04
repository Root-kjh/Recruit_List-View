import React from "react";
import { useSelector } from "react-redux";
import { Company } from "../../components";

const UserLikeCompanyWrapper = () => {
    
    const userLikeCompany = useSelector(state => state.userLikeCompany);

    return(
        <div><Company company={userLikeCompany}/></div>
    );
}

export default UserLikeCompanyWrapper;