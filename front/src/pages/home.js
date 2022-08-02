import style from '../style/home.module.css'
import { useNavigate } from 'react-router-dom'

import Navbar from '../composants/navbar'


function Home() {

    const token = localStorage.getItem('Token')
    const navigate = useNavigate()

    const boutique = () => {
        navigate('/boutique')
    }
    return (
        <main className={style.container}>
            <div className={style.encart}>
                <span />
                <div className={style.devis}>DEVIS GRATUIT !</div>
                {token === null ? <div className={style.log}>Connexion</div> : <div className={style.log}>Se déconnecter</div>}
            </div>
            <Navbar />
            <div className={style.bandeau}>
                <div className={style.contener_slideshow}>
                    <div className={style.contener_slide} onClick={boutique}>
                        <div className={style.slid_1}><img className={style.img_bandeau} src={'/images/annonce.jpg'} alt="" /></div>
                        <div className={style.slid_2}><img className={style.img_bandeau} src={'/images/flyer.jpg'} alt="" /></div>
                        <div className={style.slid_3}><img className={style.img_bandeau} src={'/images/visite.jpg'} alt="" /></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home