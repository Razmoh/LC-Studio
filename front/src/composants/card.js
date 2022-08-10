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
                    <div className={styles.card_container}>
                        <img className={styles.image} src={`http://localhost:8000/static/images/${data.id}/image.jpg`} alt="" />
                        <div className={styles.info}>
                            <div className={styles.title}>
                                {data.title}
                            </div>
                            <div className={styles.text}>
                                Référence n° :  {data.ref}
                            </div>
                            <div className={styles.text}>
                                A partir de {data.price} / pièce.
                            </div>
                            <div className={styles.description}>
                                {data.description}
                            </div>
                            <div className={styles.theme}>{data.theme} / {data.categorie}</div>

                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Card