/* Imports */
import React from "react";
import { Link } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";



/* More toggle icon constant */
const MoreToggleIcon = React.forwardRef(({onClick}, ref) => (
    <Link        
        to="#"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >                        
        <MoreOutlined />
    </Link>
));



/* Exports */
export default MoreToggleIcon;



