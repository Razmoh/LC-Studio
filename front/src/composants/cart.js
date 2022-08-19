import style from '../style/cart.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Cart() {
    const [panier, setPanier] = useState([])
    useEffect(() => {
        Button()
        // eslint-disable-next-line
    }, [])

    async function Button() {
        const storage = localStorage.getItem("Panier")
        if (storage === null) {
            let storage = []
            setPanier(storage)
        } else {
            setPanier(JSON.parse(storage))
        }
    }

    return (
        <div className={style.container}>
            {panier.map((value, key) =>
                <Link to={`/boutique/${value.id}`}>
                    <div key={key} className={style.test}>
                        <div className={style.title}>{value.title}</div>
                        {/* <div className={style.quantity}></div> */}
                        <div className={style.quantity}>{value.quantity}</div>
                    </div>
                </Link>
            )}

        </div>
    )
}
export default Cart