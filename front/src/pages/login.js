import { Link } from "react-router-dom";
import style from "../style/login.module.css";


    function Login() {
        return (
            <>
                <Link to={"/"}>
                    <img
                        className={style.logo}
                        src={'/images/logo.jpg'}
                        alt="logo"
                    />
                </Link>
                <div className={style.container}>
                    <h1>CONNEXION</h1>

                    <label name="email">Email :</label>
                    <input
                        type="text"
                        name="email"
                    ></input>

                    <label name="password">Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                    ></input>

                    <button className={style.btn}> Login </button>
                    <div className={style.more}>
                        Besoin de créer votre compte ? Rendez-vous &nbsp;
                        <Link to="/register" className={style.link}>ICI</Link>
                    </div>
                </div>
            </>
        )
    }

    export default Login