import AdminNav from "../composants/adminNav"
import style from '../style/a_devis.module.css'
import { useState, useEffect } from 'react'

function AdminDevis() {

    const [wait, setWait] = useState([{ email: "", panier: "" }])
    const [progress, setProgress] = useState([])
    // console.log('TOTO', panier)

    useEffect(() => {
        getDevis()
        // eslint-disable-next-line
    }, [])

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
        // setWait({...wait, email: r_wait.email, panier: JSON.parse(r_wait.panier)})

        let progress = await fetch("http://localhost:8000/devis/progress", requestOptions)
        let r_progress = await progress.json()
        setProgress(r_progress)
    }
    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.section}>
                    <div className={style.title}><u>Devis en attente</u></div>
                    {wait.map((value, key) =>
                        <div key={key} className={style.devis}>
                            <div className={style.mail}>{value.email} a envoyé le {value.date} :</div>
                            <div className={style.panier}>{value.panier}</div>
                        </div>
                    )}
                </div>
                <div className={style.section}>
                    <div className={style.title}><u>Devis en cours</u></div>
                    {progress.map((value, key) =>
                        <div key={key} className={style.devis}>
                            <div className={style.mail}>{value.email}</div>
                            <div className={style.panier}>{value.panier}</div>
                            <div>{value.date}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminDevis