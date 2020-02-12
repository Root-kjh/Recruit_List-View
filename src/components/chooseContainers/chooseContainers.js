import React from "react";
import { Company } from "../../containers";
import { User } from "../../containers";

function chooseContainers(name) {
    if(name==="company")
        return (<Company/>);
    if (name==="user")
        return (<User/>);
}

export default chooseContainers;