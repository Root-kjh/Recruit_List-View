import React from "react";
import { Company } from "../../containers";
import { User } from "../../containers";

function chooseContainers(name,setJWT,jwt) {
    if(name==="company")
        return (<Company/>);
    if (name==="user")
        return (<User setJWT={setJWT} jwt={jwt}/>);
}

export default chooseContainers;