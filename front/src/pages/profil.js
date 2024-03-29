import Navbar from '../composants/navbar'
import style from '../style/profil.module.css'
import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup';
import Alert from '../composants/alert'

function Profil() {
    //STOCKER LES INFOS DE L'UTILISATEUR
    const [user, setUser] = useState([])

    //STOCKER LES STATES POUR L'UPDATE
    const [update, setUpdate] = useState({ nom: "", prenom: "", phone: "", email: "" })

    //GERER LES ERREURS
    const [message, setMessage] = useState("")

    //DECODER LE TOKEN
    const token = localStorage.getItem('Token')

    const decoded = jwt_decode(token);
    const email = decoded.email

    //PANIER
    let [panier, setPanier] = useState([])
    const [modify, setModify] = useState()
    const [quantity, setQuantity] = useState(0)

    //DEVIS
    const [wait, setWait] = useState([])
    const [progress, setProgress] = useState([])
    const [down, setDown] = useState([])

    //OBTENIR LES INFOS VIA LE MAIL DANS LE TOKEN
    useEffect(() => {
        getInfo(email)
        // eslint-disable-next-line
    }, [message])

    //OBTENIR SES INFOS PERSONNELLES
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
        getPanier()
    }

    //METTRE A JOUR SON PROFIL
    async function updateInfo(id) {
        if (user.nom === update.nom && user.prenom === update.prenom && user.phone === update.phone) {
            setMessage(<Alert type="primary">
                <p>Aucune modification apportée.</p>
            </Alert>)
            setUpdate({ ...update, nom: "", prenom: "", phone: "" })
        } else {
            if (update.phone.length !== 10) {
                setMessage(<Alert type="error">
                    <p>Veuillez entrer une donnée valide.</p>
                </Alert>)
            } else {
                var myHeaders = new Headers()
                myHeaders.append("Content-Type", "application/json");
                var property = JSON.stringify({
                    "nom": update.nom,
                    "prenom": update.prenom,
                    "phone": update.phone,
                });
                var requestOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: property,
                    redirect: 'follow'
                };
                await fetch('http://localhost:8000/profil/' + id, requestOptions)
                setMessage(<Alert type="success">
                    <p>Profil modifié avec succès.</p>
                </Alert>)
                setUpdate({ ...update, nom: "", prenom: "", phone: "" })
            }
        }
    }
    //PANIER

    async function getPanier() {
        const storage = localStorage.getItem("Panier")
        setPanier(JSON.parse(storage))
    }

    function getModifPanier() {
        const storage = localStorage.getItem("Panier")
        if (storage === null) {
            let storage = []
            return storage
        } else {
            return JSON.parse(storage)
        }
    }

    //VALIDER LE PANIER
    async function confirmPanier() {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var property = JSON.stringify({
            "email": email,
            panier
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: property,
            redirect: 'follow'
        };
        await fetch('http://localhost:8000/devis', requestOptions)
        setMessage(<Alert type="success">
            <p>Devis envoyé avec succès.</p>
        </Alert>)
        localStorage.removeItem('Panier')
    }

    //MODIFIER UNE QUANTITÉ
    function changeQuantity(id, quantity) {
        let n_quantity = parseInt(quantity)
        let n_panier = getModifPanier()
        let foundProduct = n_panier.find(p => p.id === id)
        if (foundProduct !== undefined) {
            foundProduct.quantity = n_quantity
            if (foundProduct.quantity <= 0) {
                Remove(id)
            }
            else {
                savePanier(n_panier)
                setMessage(<Alert type="primary">
                    <p>Le panier a été modifié.</p>
                </Alert>)
            }
        }
    }

    //SUPPRIMER UN ARTICLE
    function Remove(id) {
        panier = panier.filter(p => p.id !== id)
        savePanier(panier)
        if (panier.length <= 0) {
            localStorage.removeItem("Panier")
        }
        setMessage(<Alert type="error">
            <p>Article supprimé.</p>
        </Alert>)
    }
    //SAUVEGARDER LE NOUVEAU PANIER
    async function savePanier(product) {
        localStorage.setItem("Panier", JSON.stringify(product))
    }

    //CONSULTER LES DEVIS
    async function checkDevis() {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let w_result = await fetch("http://localhost:8000/profil/wait/" + email, requestOptions)
        let w_data = await w_result.json();
        setWait(w_data)

        let p_result = await fetch("http://localhost:8000/profil/progress/" + email, requestOptions)
        let p_data = await p_result.json();
        setProgress(p_data)

        let d_result = await fetch("http://localhost:8000/profil/down/" + email, requestOptions)
        let d_data = await d_result.json();
        setDown(d_data)
    }

    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.info}>
                    {user.email === "laetitia.chazot@gmail.com" || user.email === "albenji@orange.fr" ? <Link to={'/admin_boutique'}><button className={style.update}>Admin</button></Link> : <div></div>}
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
                        {update.email === "" ? <div className={style.field}>{user.email}</div> : <label>Pour modifier votre adresse email, merci de me contacter par <a target="blank" href="mailto:lc.studiographique@gmail.com">mail</a>.</label>}
                    </div>
                    <div></div>
                    <div className={style.info_update}>
                        {update.nom === "" ? <button className={style.update} onClick={() => { setUpdate({ ...update, nom: user.nom, prenom: user.prenom, phone: user.phone, email: user.email }); setMessage("") }} >Editer</button> : <div className={style.edit}><button className={style.update} onClick={() => { setUpdate({ ...update, nom: "", prenom: "", phone: "", email: "" }); setMessage("") }}>Annuler</button><button className={style.update} onClick={() => updateInfo(user.id)}>Modifier</button></div>}
                    </div>
                    <label>{message}</label>
                </div>
                <div className={style.panier}>
                    <div>Mon panier :</div>
                    {panier === null || panier === [] ? <div> Aucun article</div> :
                        <div>
                            {panier.map((value, key) =>
                                <div key={key} className={style.test}>
                                    {modify === value.id ? <input onInput={(e) => setQuantity(e.target.value)}></input> : <div className={style.quantity}>{value.quantity} pièce(s)</div>}
                                    <div className={style.title}>{value.title}</div>
                                    {modify === value.id ? <button onClick={() => setModify("un")}>Annuler</button> : <button className={style.cart_update} onClick={() => setModify(value.id)}>Modif</button>}
                                    {modify === value.id ? <button className={style.cart_delete} onClick={() => { changeQuantity(value.id, quantity); setModify() }}>V</button> : <Popup trigger={<button className={style.cart_delete}>Retirer</button>} position="right"><button className={style.cart_delete} onClick={() => { Remove(value.id) }}>Cliquer ici pour confirmer la suppression</button></Popup>}
                                </div>
                            )
                            }
                            <div className={style.confirm}>
                                <Popup trigger={<button className={style.send}>Envoyer le devis</button>} position="right"><button className={style.send} onClick={confirmPanier}> Confirmer l'envoi du devis</button></Popup>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className={style.check}>
                <button onClick={() => checkDevis(email)}>Consulter l'avancement de mes devis :</button>
                En attente :
                {wait.map((value, key) =>
                    <div key={key}>Le devis n° {value.id} en date du {value.date} est en attente.</div>
                )}
                En cours :
                {progress.map((value, key) =>
                    <div key={key}>Le devis n° {value.id} en date du {value.date} est en cours de traitement.</div>
                )}
                Terminé(s) :
                {down.map((value, key) =>
                    <div key={key}>Le devis n° {value.id} en date du {value.date} est terminé ! Pensez a consulter vos mails !</div>
                )}
            </div>
        </>
    )
}

export default Profil