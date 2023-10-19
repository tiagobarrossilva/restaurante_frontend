import styles from "./Input.module.css"

function Input({type, text, name, placeholder, haldleOnChange, value, multiple, step}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input type={type} step={step} name={name} id={name} placeholder={placeholder} onChange={haldleOnChange} value={value} {...(multiple ? {multiple} : '')}/>
        </div>
    )
}

export default Input