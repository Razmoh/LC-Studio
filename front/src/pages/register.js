import style from '../style/login.module.css'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {

    const [user, setUser] = useState({ nom: "", prenom: "", phone: "", password: "", confirm_password: "", email: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem('Token')
    
    useEffect(() => {
        if(token !==null){
            navigate('/')
        }
    })

    function Register() {
        if (user.nom === "" || user.prenom === "" || user.email === "" || user.password === "" || user.confirm_password === "") {
            return setError("Champ(s) manquant(s).")
        }
        if (user.password !== user.confirm_password) {
            return setError("Les mots de passe ne correspondent pas.")
        }
        if (user.password.length < 5 && user.confirm_password.length < 5) {
            return setError("Mot de passe : 6 caractères min.")
        }
        if (user.phone.length !== 10) {
            return setError("Téléphone invalide.")
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "nom": user.nom,
                "prenom": user.prenom,
                "email": user.email,
                "password": user.password,
                "phone": user.phone
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("http://localhost:8000/auth/register", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setError(result.message)
                    if (!result.message) {
                        navigate('/login')
                    }
                })
                .catch(error => console.log("--> Register error: ", error));
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
                    <h1>Bienvenue !</h1>
                    {error === "" ? <div></div> : <div className={style.error}>{error}</div>}

                    <label name="lastname">Nom :</label>
                    <input
                        type="text"
                        name="lastname"
                        placeholder=""
                        onInput={e => setUser({ ...user, nom: e.target.value })}
                    ></input>

                    <label name="firstname">Prénom :</label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder=""
                        onInput={e => setUser({ ...user, prenom: e.target.value })}

                    ></input>

                    <label name="phone">Téléphone :</label>
                    <input
                        type="text"
                        name="phone"
                        onInput={e => setUser({ ...user, phone: e.target.value })}
                    ></input>

                    <label name="email">Email :</label>
                    <input
                        type="email"
                        name="email"
                        placeholder=""
                        onInput={e => setUser({ ...user, email: e.target.value })}
                    ></input>

                    <label name="password">Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        placeholder=""
                        onInput={e => setUser({ ...user, password: e.target.value })}
                    ></input>

                    <label name="confirm_password">Confirmer mot de passe :</label>
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder=""
                        onInput={e => setUser({ ...user, confirm_password: e.target.value })}
                    ></input>

                    <button className={style.btn} onClick={() => { setError(""); Register() }} > Créer mon compte </button>
                    <br />

                    <div className={style.more}>
                        Vous avez déjà un compte ? Connectez-vous &nbsp;
                        <Link className={style.link} to="/login">ICI</Link>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Register;
