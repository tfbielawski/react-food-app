import React, {useRef, useEffect} from "react";
import {createPortal} from "react-dom";

export default function Modal({children, open, onClose, className = ""}){
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if(open){
            modal.show();
        }
        // else{
        //     dialog.current.close();
        // }
        //cleanup function instead of else
        return () => {
            modal.close();
        }
    }, [open]);


    //Use create portal to inject the diablog into the modal div in the index.html file
    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
            {children}
        </dialog>, 
        document.getElementById("modal")
    );
}

