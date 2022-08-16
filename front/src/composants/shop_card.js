import styles from '../style/shop.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function ShopCard(prop) {
    // eslint-disable-next-line
    const [data, setData] = useState(prop.value)
    return (
        <>
            <div className={styles.wrapper}>
                <Link to={`/boutique/${data.id}`}>
                    <img className={styles.image} src={`http://localhost:8000/static/images/${data.id}/image1.jpg`} alt=""
                      onMouseOver={e => (e.currentTarget.src =`http://localhost:8000/static/images/${data.id}/image2.jpg`)}
                      onMouseOut={e => (e.currentTarget.src =`http://localhost:8000/static/images/${data.id}/image1.jpg`)}/>
                    <div className={styles.info}>
                        <div className={styles.ref}>
                            <div>Reférence n° {data.ref}</div>
                            <div className={styles.price}>A partir de {data.price}</div>
                        </div>
                        <div className={styles.title}>{data.title}</div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ShopCard