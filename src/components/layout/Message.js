import { useEffect, useState } from 'react'
import styles from './Message.module.css'
import bus from '../../utils/bus'

function Message(){
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('')

    // usado para evitar algumas execuções desnecessarias
    useEffect(() =>{
        bus.addListener('flash',({message, type}) =>{
            setVisibility(true)
            setMessage(message)
            setType(type)

            // tempo em que a menssagem fica visivel
            setTimeout(() =>{
                setVisibility(false)
            },3000)
        })
    },[])

    const [type, setType] = useState('')
    return(
        visibility && (
            <div className={`${styles.message} ${styles[type]}`}>{message}</div>
        )
        
    )
}

export default Message