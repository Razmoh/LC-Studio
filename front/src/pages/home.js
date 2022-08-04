import style from '../style/home.module.css'
import { useNavigate, Link } from 'react-router-dom'

import Navbar from '../composants/navbar'

function Home() {

    const token = localStorage.getItem('Token')

    const navigate = useNavigate()

    const boutique = () => {
        navigate('/boutique')
    }

    const login = () => {
        navigate('/login')
    }

    const logout = () => {
        localStorage.removeItem('Token')
        navigate('/login')
    }

    return (
        <main className={style.container}>
            <div className={style.encart}>
                <span />
                <div className={style.devis}>DEVIS GRATUIT !</div>
                {token === null ? <div className={style.log} onClick={login}>Connexion</div> : <div className={style.log} onClick={logout}>Se déconnecter</div>}
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
                <div className={style.bloc}>
                    <img className={style.img} src={'/images/p-ethique.png'} alt="" />
                    <div className={style.garantie}>Design de qualité à prix éthique</div>
                </div>
                <div className={style.bloc1}>
                    <img className={style.img} src={'/images/origine-f.png'} alt="" />
                    <div className={style.garantie}>Fabrication et impression française</div>
                </div>
                <div className={style.bloc2}>
                    <img className={style.img} src={'/images/imprimvert.png'} alt="" />
                    <div className={style.garantie}>Production écologique</div>
                </div>
            </div><br />
            <div className={style.presentation}>
                <div className={style.title}>UN FAIRE-PART UNIQUE POUR CHAQUE EVENEMENT DE VOTRE VIE !</div><br /><br /><br />
                <div className={style.text}>Vous souhaitez organiser un événement sur un thème « non commun », qui sort de l'ordinaire ? Vous êtes au bon endroit !<br /><br />
                    Ici, vous allez pouvoir trouver des visuels d’événement (mariage, baptême, gender-reveal…) sur des thèmes tel que le baroque, le steampunk en passant par du World of Warcraft ou encore Marvel.<br /><br />
                    Vous trouverez également toute la déclinaison de ces thèmes : faire-part, save the date, coupon réponse, étiquette pour enveloppe, plan de table, marque place, menu.<br /><br />
                    Plus besoin de faire appel à plusieurs prestataires, vous avez tout au même endroit, et vous êtes sûr que tous les visuels concordent.</div><br /><br />
                <div className={style.title}>COMMENT CELA FONCTIONNE ?</div><br /><br />
                <div className={style.text}>Ajoutez dans votre panier les visuels de votre choix (vous devez être identifiés), en y indiquant le nombre d’exemplaire par article et validez. Un devis sous 24h, jours ouvrables, vous sera alors envoyé.<br /><br />
                    Après confirmation de votre part, nous échangerons sur les informations dont nous aurions besoin afin de personnaliser vos visuels, tel que la date, vos prénoms, le lieu, l’heure… Une fois toutes les données envoyées, les visuels vous seront communiqués sous 48h (jours ouvrables).<br /><br />
                    Il nous faudra alors votre validation afin d’envoyer les visuels à la fabrication.<br /><br />
                    La fabrication peut prendre plus ou moins de temps. Ce délai vous sera communiqué sur le devis. Mais en moyenne, il faudra compter entre 6 et 10 jours afin que vous receviez votre commande.</div>
            </div>
            <div className={style.contact}>
                <span></span>
                <div className={style.tel}>
                    <img className={style.img_tel} src={'/images/tel.png'} alt="" />
                    < div className={style.tel_text}> 06.47.72.01.12 <br /> Du lundi au vendredi de 9h à 17h</div>
                </div>
                <div className={style.client}>
                    <div className={style.client_text}><b>SERVICE CLIENT A VOTRE ÉCOUTE</b></div>
                    <div className={style.client_text}>Nous sommes là pour répondre à toutes vos questions</div>
                </div>
                <span></span>
            </div>
            <div className={style.footer}>
                <div className={style.information}>
                    <div><i>SERVICE CLIENT</i></div><br /><br />
                    <Link to={'/infoclient'}>Questions fréquentes</Link>
                    <Link to={'/infoclient'}>Délai et frais de livraison</Link>
                    <Link to={'/infoclient'}>Satisfait ou réimprimé</Link>
                </div>
                <div className={style.information}>
                    <div><i>INFORMATIONS PRODUIT</i></div><br /><br />
                    <Link to={'/infoproduit'}>Nouveautés</Link>
                    <Link to={'/infoproduit'}>Papiers et finitions</Link>
                    <Link to={'/infoproduit'}>Nos valeurs</Link>
                </div>
                <div className={style.information}>
                    <div><i>INFORMATIONS LÉGALES</i></div><br /><br />
                    <Link to={'/infolegale'}>Mentions légales</Link>
                    <Link to={'/infolegale'}>Conditions générales de vente</Link>
                    <Link to={'/infolegale'}>Données personnelles et cookies</Link>
                </div>
            </div>
        </main >
    )
}

export default Home