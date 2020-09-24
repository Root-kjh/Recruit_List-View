import React,{ useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector } from 'react-redux';
import { changeForm } from '../../store/modules/Form';
import moduleName from 'module';

const Header = () => {

    const [TabsValue, SetTabsValue] = useState(0);
    const logout = () => {}
    
    const handleChange = (e,value) => {
        SetTabsValue(value);

    }

    const beforeLoginHeader = ["Company", "Signin", "Signup"];
    const afterLoginHeader = ["Company", "UserLikeCompany", "Logout"];
    const jwt = useSelector(state => state.jwt, []);
    const headers = jwt? afterLoginHeader : beforeLoginHeader;
    const tabList = headers.map((header,index)=>
    <Tab key={index} label={header}/>);

    return(
            <div>
                <AppBar position="static">
                    <Tabs value={TabsValue} onChange={handleChange}>
                        {tabList}
                    </Tabs>
                </AppBar>
            </div>
    );
}

export default Header;