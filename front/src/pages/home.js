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
            <div className={style.atout}>
                <div className={style.garantie}>Design de qualité à prix éthique</div>
                <div className={style.garantie_1}>Fabrication et impression française</div>
                <div className={style.garantie}>Je ne sais pas encore le texte</div>
            </div><br />
            <div className={style.presentation}>
                <div className={style.title}>Un faire-part unique pour chaque événement de votre vie !</div><br /><br />
                <div className={style.text}>Vous souhaitez organiser un événement sur un thème « non commun », qui sort de l'ordinaire ? Vous êtes au bon endroit !<br /><br />
                    Ici, vous allez pouvoir trouver des visuels d’événement (mariage, baptême, gender-reveal…) sur des thèmes tel que le baroque, le steampunk en passant par du World of Warcraft ou encore Marvel.<br /><br />
                    Vous trouverez également toute la déclinaison de ces thèmes : faire-part, save the date, coupon réponse, étiquette pour enveloppe, plan de table, marque place, menu.<br /><br />
                    Plus besoin de faire appel à plusieurs prestataires, vous avez tout au même endroit, et vous êtes sûr que tous les visuels concordent.</div>
            </div>
            <div className={style.contact}>
                <span></span>
                <div className={style.tel}>
                    <img className={style.img} src={'/images/tel.jpg'} />
                    < div className={style.tel_text}> 06.47.72.01.12 <br/> Du lundi au vendredi de 9h à 17h</div>
                </div>
                <div className={style.client}>
                    <div className={style.client_text}><i>SERVICE CLIENT A VOTRE ECOUTE</i></div>
                    <div className={style.client_text}>Nous sommes la pour répondre à toutes vos questions</div>
                </div>
                <span></span>
            </div>
        </main >
    )
}

export default Home