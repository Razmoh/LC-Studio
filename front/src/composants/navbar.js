import style from '../style/navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {
     const navigate = useNavigate()
     const token = localStorage.getItem('Token')

     const profil = () => {
        if((token !== null)){
            navigate('/profil')
        }
    }
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.navbar}>
                    <Link to={'/'}>
                        <img className={style.logo} src={'/images/logo.jpg'} alt="" />
                    </Link>
                </div>
                <div className={style.container}>
                    <Link to={'/visuel'}>
                        <div className={style.btn}>
                            Visuels
                        </div>
                    </Link>
                    <Link to={'/boutique'}>
                        <div className={style.btn}>
                            Boutique
                        </div>
                    </Link>
                    <Link to={"/about"}>
                        <div className={style.btn_lc}>
                            Qui suis-je ?
                        </div>
                    </Link>
                    <div className={style.logos}>
                        <a target='blank' href='https://www.facebook.com/Laetitia.Chazot.Monnot'>
                            <img className={style.images} src={'/images/fb.jpg'} alt="fb" />
                        </a>&nbsp;
                        <a target='blank' href='https://www.instagram.com/lc_studiographique/?hl=fr'>
                            <img className={style.images} src={'/images/insta.jpg'} alt="insta" />
                        </a>&nbsp;
                        <a target="blank" href="mailto:lc.studiographique@gmail.com">
                            <img className={style.images} src={'/images/mail.jpg'} alt="message" />
                        </a>&nbsp;
                        <img className={style.images} src={'/images/profil.jpg'} alt="profil" onClick={profil} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar