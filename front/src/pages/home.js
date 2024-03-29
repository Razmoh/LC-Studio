import style from '../style/home.module.css'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../composants/navbar'

function Home() {

    //DEFINIR LE TOKEN POUR LOGIN/LOGOUT
    const token = localStorage.getItem('Token')
    //NAVIGUER ENTRE LES PAGES
    const navigate = useNavigate()
    //ALLER A LA BOUTIQUE
    const boutique = () => {
        navigate('/boutique')
    }
    //ALLER AU LOGIN
    const login = () => {
        navigate('/login')
    }
    //SE DECONNECTER : supprime le token et la panier
    const logout = () => {
        localStorage.removeItem('Token')
        localStorage.removeItem('Panier')
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
                    <div className={style.contener_slide}>
                        <div className={style.slid_1}><img className={style.img_bandeau} src={'/images/annonce.jpg'} alt="" /></div>
                        <div className={style.slid_2}><img  onClick={boutique} className={style.img_bandeau} src={'/images/bandeau1.jpg'} alt="" /></div>
                        <div className={style.slid_3}><img   onClick={boutique}className={style.img_bandeau} src={'/images/visite.jpg'} alt="" /></div>
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
                <div className={style.title}>UN FAIRE-PART UNIQUE POUR CHAQUE ÉVÉNEMENT DE VOTRE VIE !</div><br /><br /><br />
                <div className={style.text}>Vous souhaitez organiser un événement sur un thème « non commun », qui sort de l'ordinaire ? Vous êtes au bon endroit !<br /><br />
                    Ici, vous allez pouvoir trouver des visuels d’événement (mariage, baptême, gender-reveal…) sur des thèmes tels que baroque, steampunk, en passant par World of Warcraft ou encore Marvel.<br /><br />
                    Vous trouverez également toute la déclinaison de ces thèmes : faire-part, save the date, coupon réponse, étiquette pour enveloppe, plan de table, marque place, menu.<br /><br />
                    Plus besoin de faire appel à plusieurs prestataires, vous avez tout au même endroit, et vous êtes sûr que tous les visuels concordent.</div><br /><br />
                <div className={style.title} id="fonctionnement">COMMENT CELA FONCTIONNE ?</div><br /><br />
                <div className={style.text}>Tout d'abord, vous devez posséder un compte et être identifié. Ajoutez dans votre panier les visuels de votre choix, en y indiquant le nombre d’exemplaire par article. Le prix indiqué n'est qu'à titre informatif et évoluera suivant la quantité de produits séléctionnés. Une fois le panier rempli, rendez vous dans votre page profil (en haut a droite ) pour le valider et me le faire parvenir, il vous sera retourné sous 24h (jours ouvrables).<br /><br />
                    Après confirmation du devis, nous échangerons sur les informations dont nous aurons besoin afin de personnaliser vos visuels, telles que date, prénoms, lieu, heure… Une fois toutes les données envoyées, les visuels vous seront communiqués sous 48h (jours ouvrables).<br /><br />
                    Il vous faudra de nouveau valider les visuels, afin que je puisse les envoyer à la fabrication.<br /><br />
                    La fabrication peut prendre plus ou moins de temps. Ce délai vous sera communiqué sur le devis. En moyenne, il faut compter entre 6 et 10 jours pour reçevoir votre commande.</div>
            </div>
            <div className={style.contact}>
                <span></span>
                <div className={style.tel}>
                    <img className={style.img_tel} src={'/images/tel.png'} alt="" />
                    < div className={style.tel_text}> 06.47.72.01.12 <br /> Du lundi au vendredi de 9h à 17h</div>
                </div>
                <div className={style.client}>
                    <div className={style.client_text}><b>SERVICE CLIENT À VOTRE ÉCOUTE</b></div>
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
                <div className={style.information_r}>
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