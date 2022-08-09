import styles from '../style/card.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Card(prop) {
    // eslint-disable-next-line
    const [data, setData] = useState(prop.value)
    return (
        <>
            <div className={styles.card_wrapper}>
                <Link to={`/boutique/${data.ref}`}>
                    <div className={styles.title}>{data.title}</div>
                    <div className={styles.image}>
                        <img className={styles.img_src} src={`http://localhost:8000/static/images/${data.id}/image.jpg`} alt="" />
                    </div>
                    <div className={styles.cat}>
                        <div className={styles.theme}>{data.theme}</div>
                        <div className={styles.categorie}>{data.categorie}</div>
                    </div>
                    <div className={styles.description}>{data.description}</div>
                    <div className={styles.price}>{data.price}</div>
                </Link>

            </div>
        </>
    )
}

export default Card