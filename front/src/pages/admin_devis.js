import AdminNav from "../composants/adminNav"
import style from '../style/a_devis.module.css'
import { useState, useEffect } from 'react'
import Alert from '../composants/alert'

function AdminDevis() {

    //Stocker les différentes réponses pour demande/ en cours/terminé
    const [wait, setWait] = useState([{ email: "", panier: "" }])
    const [progress, setProgress] = useState([])
    const [old, setOld] = useState([])
    //Gérer les messages d'erreurs
    const [message, setMessage] = useState("")
    //Stocker le mail pour la recherche
    const [filter, setFilter] = useState("")

    useEffect(() => {
        getDevis()
        // eslint-disable-next-line
    }, [message])

    async function getDevis() {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let wait = await fetch("http://localhost:8000/devis/wait", requestOptions)
        let r_wait = await wait.json();
        setWait(r_wait)
        let progress = await fetch("http://localhost:8000/devis/progress", requestOptions)
        let r_progress = await progress.json()
        setProgress(r_progress)
    }
    //Mettre un devis de demande a en cours de traitement
    async function Progress(id) {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
        let data = await fetch("http://localhost:8000/devis/progress/" + id, requestOptions)
        let result = await data.json();
        if (result === "OK") {
            setMessage(<Alert type="primary">
                <p>Le devis est maintenant en cours de traitement.</p>
            </Alert>)
        }
    }
    //Mettre un devis de en cours de traitement a terminé
    async function Down(id) {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
        let data = await fetch("http://localhost:8000/devis/down/" + id, requestOptions)
        let result = await data.json();
        if (result === "OK") {
            setMessage(<Alert type="success">
                <p>Le devis est terminé.</p>
            </Alert>)
        }
    }
    //Obtenir tous les devis terminés
    async function Old() {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let old = await fetch("http://localhost:8000/devis/down", requestOptions)
        let r_old = await old.json();
        setOld(r_old)
    }
    //Obtenir les devis suivants le mail
    async function searchMail(param) {
        if (filter === undefined) {
            setMessage("aucune adresse email renseignée")
        }
        else {
            var myHeaders = new Headers()
            // myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            let result = await fetch("http://localhost:8000/devis/" + param, requestOptions)
            let data = await result.json();
            if (data === "NONE") {
                setOld([])
            }
            else {
                setOld(data)
            }
        }
    }

    return (
        <>
            <AdminNav />
            <div className={style.message}>{message}</div>
            <div className={style.section}>
                <div className={style.title}><u>Devis en attente</u></div>
                {wait.map((value, key) =>
                    <div key={key} className={style.devis}>
                        <div className={style.mail}>{value.email} a envoyé le {value.date} :</div>
                        <div className={style.panier}>{value.panier}</div>
                        <button onClick={() => { setMessage(""); Progress(value.id) }}>Mettre a jour</button>
                    </div>
                )}
            </div>
            <div className={style.section}>
                <div className={style.title}><u>Devis en cours</u></div>
                {progress.map((value, key) =>
                    <div key={key} className={style.devis}>
                        <div className={style.mail}>{value.email} a envoyé le {value.date} :</div>
                        <div className={style.panier}>{value.panier}</div>
                        <button onClick={() => { setMessage(""); Down(value.id) }}>Mettre a jour</button>
                    </div>
                )}
            </div>
            <div className={style.section}>
                <div className={style.title} ><u>Consulter les anciens devis :</u></div>
                <button onClick={Old}>Tous les devis</button>
                <div>
                    <label>Rechercher un utilisateur : </label>
                    <input placeholder="email" onInput={(e) => { setFilter(e.target.value) }}></input>
                    <button onClick={() => { searchMail(filter); setMessage("") }}>Ok</button>
                </div>
                {old.map((value, key) =>
                    <div key={key} className={style.devis}>
                        <div className={style.mail}>{value.email} a envoyé le {value.date} :</div>
                        <div className={style.panier}>{value.panier}</div>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminDevis