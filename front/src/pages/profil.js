import Navbar from '../composants/navbar'
import style from '../style/profil.module.css'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"

function Profil() {
    const [user, setUser] = useState([])
    const [update, setUpdate] = useState({ nom: "", prenom: "", phone: "", email: "" })
    const token = localStorage.getItem('Token')
    const decoded = jwt_decode(token);
    const email = decoded.email
    
    useEffect(() => {
        getInfo(email)
    }, [])

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
    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.info}>
                    <label name="nom">Nom :</label>
                    <div className={style.champ}>
                        {update.nom === "" ? <div className={style.field}>{user.nom}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, nom: e.target.value })}></input>}
                        {update.nom === "" ? <button className={style.update} onClick={() => setUpdate({ ...update, nom: user.nom })}>Modifier</button> : <button className={style.update} onClick={() => setUpdate({ ...update, nom: "" })}>&nbsp;Annuler</button>}
                    </div>
                    <label name="nom">Prénom :</label>
                    <div className={style.champ}>
                        {update.prenom === "" ? <div className={style.field}>{user.prenom}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, prenom: e.target.value })}></input>}
                        {update.prenom === "" ? <button className={style.update} onClick={() => setUpdate({ ...update, prenom: user.prenom })}>Modifier</button> : <button className={style.update} onClick={() => setUpdate({ ...update, prenom: "" })}>Annuler</button>}
                    </div>
                    <label name="civilite">Numéro de téléphone :</label>
                    <div className={style.champ}>
                        {update.phone === "" ? <div className={style.field}>{user.phone}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, phone: e.target.value })}></input>}
                        {update.phone === "" ? <button className={style.update} onClick={() => setUpdate({ ...update, phone: user.phone })}>Modifier</button> : <button className={style.update} onClick={() => setUpdate({ ...update, phone: "" })}>Annuler</button>}
                    </div>
                    <label name="civilite">Email :</label>
                    <div className={style.champ}>
                        {update.email === "" ? <div className={style.field}>{user.email}</div> : <input className={style.change} onInput={e => setUpdate({ ...update, email: e.target.value })}></input>}
                        {update.email === "" ? <button className={style.update} onClick={() => setUpdate({ ...update, email: user.email })}>Modifier</button> : <button className={style.update} onClick={() => setUpdate({ ...update, email: "" })}>Annuler</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profil