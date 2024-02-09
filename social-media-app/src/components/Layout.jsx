/* Imports */
import React, {createContext, useMemo, useState} from "react";
import NavigationBar from "./Navbar";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Toaster from "./Toaster";
import { useNavigate } from "react-router-dom";



/* Context creation */
export const Context = createContext("unknown");



/* Layout function */
function Layout(props) {
    /* Constants */
    const {hasNavigationBack} = props;
    const navigate = useNavigate();
    const [toaster, setToaster] = useState({
        title: "",
        show: false,
        message: "",
        type: "",
    });

    // useMemo is a hook that helps to memorize the context value (caching the value of
    // the context) and avoiding the creation of new objects every time there is a 
    // re-rendering of the Layout component
    const value = useMemo(() => ({
        toaster,
        setToaster
    }), [toaster])



    /* Return */
    return (
        <Context.Provider value={value}>
            <div>
                <NavigationBar/>

                {hasNavigationBack && (
                    <ArrowLeftOutlined
                        style={{
                            color: "#06D6EFD",
                            fontSize: "24px",
                            marginLeft: "5%",
                            marginTop: "1%",
                        }}
                        onClick={() => navigate(-1)}
                    />                    
                )}

                <div className="container my-2">{props.children}</div>
            </div>            

            <Toaster
                title={toaster.title}
                message={toaster.message}
                type={toaster.type}
                showToast={toaster.show}
                onClose={() => setToaster({...toaster, show: false})}
            />
        </Context.Provider>                    
    );
}



/* Exports */
export default Layout;



