import style from '../style/alert.module.css'
import css from 'classnames'
import React from 'react'
import { useState } from 'react'

export default function Alert({ children, type, message }) {

    const [isShow, setShow] = useState(true)

    const renderAlert = function () {
        return React.cloneElement(children)
    }

    const handleClose = (e) => {
        e.preventDefault()
        setShow(false)
    }

    return (
        <div className={css(style.alert, style[type], !isShow && style.hide)}>
            <span className={style.closebtn}  onClick={handleClose}>
                &times;
            </span>
            {children ? renderAlert() : message}
        </div>
    )
}

