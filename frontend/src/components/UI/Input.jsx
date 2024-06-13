export default function Input({label, id, ...props}) {
    return (
        <p className="control">
            <label htmlFor={id}>{label}</label>
            <input type={props.type} name={id} {...props} required/>
        </p>
    )
}

