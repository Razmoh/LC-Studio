import Navbar from '../composants/navbar'
import style from '../style/profil.module.css'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { useNavigate, Link } from 'react-router-dom'

function Profil() {
    const navigate = useNavigate()
    const [user, setUser] = useState([])
    const [update, setUpdate] = useState({ nom: "", prenom: "", phone: "", email: "" })
    const [message, setMessage] = useState("")
    const token = localStorage.getItem('Token')
    const decoded = jwt_decode(token);
    const email = decoded.email


    useEffect(() => {
        getInfo(email)
        // eslint-disable-next-line
    }, [])

    const profil = () => {
        localStorage.removeItem('Token')
        navigate('/login')
    }

    async function getInfo() {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/profil/" + email, requestOptions)
        let data = await result.json();
        setUser(data)
    }

    async function updateInfo(id) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var property = JSON.stringify({
            "nom": update.nom,
            "prenom": update.prenom,
            "phone": update.phone,
            "email": update.email
        });
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: property,
            redirect: 'follow'
        };
        let result = await fetch('http://localhost:8000/profil/' + id, requestOptions)
        let data = await result.json()
        if (data.email !== email && data.email !== undefined) {
            profil()
        }
        else {
            setMessage("Cette adresse email est déjà utilisée !")
        }
    }

    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.info}>
                    {user.email === "laetitia.chazot@gmail.com" ? <Link to={'/admin_boutique'}><button className={style.update}>Admin</button></Link> : <div></div>}
                    <label name="nom">Nom :</label>
                    <div className={style.champ}>
                        {update.nom === "" ? <div className={style.field}>{user.nom}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, nom: e.target.value })}></input>}
                    </div>
                    <label name="prenom">Prénom :</label>
                    <div className={style.champ}>
                        {update.prenom === "" ? <div className={style.field}>{user.prenom}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, prenom: e.target.value })}></input>}
                    </div>
                    <label name="phone">Numéro de téléphone :</label>
                    <div className={style.champ}>
                        {update.phone === "" ? <div className={style.field}>{user.phone}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, phone: e.target.value })}></input>}
                    </div>
                    <label name="email">Email :</label>
                    <div className={style.champ}>
                        {update.email === "" ? <div className={style.field}>{user.email}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, email: e.target.value })}></input>}
                    </div>
                    <div></div>
                    <div className={style.info_update}>
                        {update.nom === "" ? <button className={style.update} onClick={() => setUpdate({ ...update, nom: user.nom, prenom: user.prenom, phone: user.phone, email: user.email })} >Editer</button> : <div className={style.edit}><button className={style.update} onClick={() => setUpdate({ ...update, nom: "", prenom: "", phone: "", email: "" })}>Annuler</button><button className={style.update} onClick={() => updateInfo(user.id)}>Modifier</button></div>}
                    </div>
                    <div>{message}</div>
                </div>
            </div>
        </>
    )
}

export default Profil