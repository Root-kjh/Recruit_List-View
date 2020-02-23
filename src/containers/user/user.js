import React from "react";
import { UserWrapper } from "../../components";

const User=(props)=>(
    <div>
        <UserWrapper setJWT={props.setJWT} jwt={props.jwt}/>
    </div>
)

export default User;