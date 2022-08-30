import Navbar from '../composants/navbar'
import style from '../style/visuel.module.css'
import Popup from 'reactjs-popup';

function Visuel() {
        return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.presentation}>
                    Ici, vous pouvez voir une partie du travail que j'ai déjà réalisé. Certains de ces visuels ont été réalisé lors de mes études, d'autres sont des commandes réalisées pour des professionnels, et encore d'autres sont des petits projets personnels pour des entreprises fictives.<br /><br />
                    Quoi qu'il en soit, j'espère que mon travail vous plaira et, pourquoi pas, pouvoir contribuer à la réussite de votre événement.
                </div>
                <div className={style.visuel}>
                    <Popup trigger={<img className={style.image} src={"/visuel/01canadgoo.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/01canadgoo.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/02canadgoo.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/02canadgoo.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/03canadgoo.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/03canadgoo.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/04canadgoo.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/04canadgoo.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/11cjoli.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/11cjoli.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/12cjoli.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/12cjoli.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/13cjoli.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/13cjoli.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/14cjoli.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/14cjoli.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/21chazot.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/21chazot.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/22chazot.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/22chazot.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/31noelia.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/31noelia.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/32noelia.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/32noelia.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/caribou1.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/caribou1.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/caribou2.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/caribou2.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/etiquette2.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/etiquette2.jpg"} alt="" /></Popup>
                    <Popup trigger={<img className={style.image} src={"/visuel/etiquette1.jpg"} alt="" />} position="center"><img className={style.popup} src={"/visuel/etiquette1.jpg"} alt="" /></Popup>
                </div>
            </div>
        </>
    )
}

export default Visuel