import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import style from "../style/login.module.css";

function Login() {
    const [login, setLogin] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('Token')
    
    useEffect(() => {
        if(token !==null){
            navigate('/')
        }
    })

    function Login() {
        if (login.email === "" || login.password === "") {
            setError("Merci de remplir tout les champs")
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "email": login.email,
                "password": login.password
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/auth/login", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result.Token) {
                        localStorage.setItem("Token", result.Token);
                        navigate("/");
                    }
                    else if (result.message) {
                        setError("Adresse e-mail ou mot de passe invalide")
                    }
                })
        }
    }

    return (
        <>
            <div className={style.jclogo}>
                <Link to={"/"}>
                    <img
                        className={style.logo}
                        src={'/images/logo.jpg'}
                        alt="logo"
                    />
                </Link>
            </div>
            <div className={style.bcontainer}>
                <div className={style.container}>
                    <h1>Connexion</h1>
                    <label name="email">Email :</label>
                    <input
                        type="text"
                        name="email"
                        onInput={e => setLogin({ ...login, email: e.target.value })}
                    ></input>

                    <label name="password">Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        onInput={e => setLogin({ ...login, password: e.target.value })}
                    ></input>
                    <div className={style.error}>{error}</div>
                    <button className={style.btn} onClick={Login}> Login </button>
                    <div className={style.more}>
                        Besoin de créer votre compte ? Rendez-vous &nbsp;
                        <Link to="/register" className={style.link}>ICI</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;