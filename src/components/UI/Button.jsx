import React from "react";

function Button({children, textOnly, className, ...props}) {
    const classes = textOnly ? `text-button ${className}` : `button ${className}`;

    //let cssClasses = textOnly ? 'text-button' : 'button';
    //cssClasses += "" + className;

    return (
        <button className={classes} {...props}>{children}</button>
    )
}



export default Button;
