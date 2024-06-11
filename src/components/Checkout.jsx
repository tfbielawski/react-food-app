import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import CartContext from "../store/CartContext"; 
import Input from "./UI/Input.jsx";
import UserProgressContext from '../store/UserProgressContext.jsx';
import useHttp from "../hooks/useHttp.js";

//create the config object outside of the component to avoid infinite loops
const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data, 
        isLoading: isSending, 
        error, 
        sendRequest,
        clearData
    } = useHttp("http://localhost:3000/orders", requestConfig);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price , 0 );

    function handleClose(){
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSumbit(e){
        //Prevent default submit behavior
        e.preventDefault();

        const fd = new FormData(e.target);

        //creates object with key-value pairs of form data
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let actions = (
        <>
            <Button textOnly type="button" onClick={handleClose}>Close</Button>
            <Button>SUBMIT</Button>
        </>
    );

    if(isSending){
        actions = <span>Sending order data...</span>
    }

    if(data){
        return (
            <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
                <h2>SUCCESS!</h2>
                <p> Order submitted successfully.</p>
                <p> Expect an order confirmation email within a few moments.</p>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>OK</Button>
                </p>
            </Modal>
        )
    }
    return (
        <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSumbit}>
                <h2>Checkout</h2>
                <p> Total Amount: ${currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street Address" type="text" id="street" />
                <div className="control-row">
                    <Input label="City" type="text" id="city" />
                    <Input label="State" type="text" id="state" />
                    <Input label="Postal Code" type="text" id="postal-code" />
                </div>
                <p className="modal-actions">{actions}</p>

                {error && <Error title="Failed to submit order" message={error} />}
            </form>
        </Modal>
    )
}

