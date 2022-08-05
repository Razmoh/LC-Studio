import { Link } from 'react-router-dom'
import style from '../style/navbar.module.css'


function AdminNav() {
    return (
        <div className={style.wrapper}>
            <div className={style.navbar}>
                <Link to={'/'}>
                    <img className={style.logo} src={'/images/logo.jpg'} alt="" />
                </Link>
            </div>
            <div className={style.container}>
                <Link to={'/admin'}>
                    <div className={style.btn}>
                        Gérer les visuels
                    </div>
                </Link>
                <Link to={"/admin_boutique"}>
                    <div className={style.btn}>
                        Gérer la boutique
                    </div>
                </Link>
                <Link to={'/admin_user'}>
                    <div className={style.btn}>
                        Gérer les utilisateurs
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default AdminNav