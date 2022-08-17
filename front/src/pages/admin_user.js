import style from '../style/a_user.module.css'
import AdminNav from '../composants/adminNav';
import { useState } from "react";
import Popup from 'reactjs-popup';

function Admin() {
    //STOCKER TOUS LES UTILISATEURS
    const [users, setUsers] = useState([])
    //TERNAIRE
    const [modify, setModify] = useState()
    //METTRE A JOUR
    const [update, setUpdate] = useState()
    //MESSAGE (ERREUR/SUCCES)
    const [message, setMessage] = useState("")
    //SET LE FILTRE
    const [filter, setFilter] = useState()
    //AVOIR LE TOKEN
    const token = localStorage.getItem("Token")

    //TOUS LES UTILISATEURS
    async function getUsers() {
        var myHeaders = new Headers()
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/user", requestOptions)
        let data = await result.json();
        setUsers(data)
    }
    //METTRE UN UTILISATEUR A JOUR
    async function Update(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);
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
        await fetch("http://localhost:8000/user/" + id, requestOptions)
        setMessage("L'utilisateur a été mis à jour")
    }
    //SUPPRIMER UN UTILISATEUR
    async function Supprimer(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + token);

        var params = JSON.stringify({
            "id": id
        });
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: params,
            redirect: 'follow'
        };
        await fetch("http://localhost:8000/user/" + id, requestOptions)
        setUsers(old => old.filter(e => e.id !== id))
        setMessage("L'utilisateur a été supprimé")
    }
    //RECHERCHER UN UTILISATEUR
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
            let result = await fetch("http://localhost:8000/user/" + param, requestOptions)
            let data = await result.json();
            if (data === "Aucun utilisateur") {
                setMessage("Aucun utilisateur !")
                setUsers([])
            }
            else {
                setUsers(data)
            }
        }
    }

    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.message}>{message}</div>
                <div className={style.tableau}>
                    <div className={style.search}>
                        <button onClick={() => { (getUsers()); setMessage("") }}>Tous les utilisateurs</button>
                        <div className={style.filter}>
                            <label>Rechercher un utilisateur : </label>
                            <input placeholder="email" onInput={(e) => { setFilter(e.target.value) }}></input>
                            <button onClick={() => { searchMail(filter); setMessage("") }}>Ok</button>
                        </div>
                    </div>
                    <div className={style.tableau2}>
                        <table className={style.see}>
                            <thead>
                                <tr>
                                    <th className={style.id}>ID</th>
                                    <th className={style.cell}>Nom</th>
                                    <th >Prénom</th>
                                    <th >Adresse e-mail</th>
                                    <th >Téléphone</th>
                                    <th >Date d'inscription</th>
                                    <th className={style.gestion}>Gestion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((value, key) =>
                                    <tr key={key}>
                                        <td><p>{value.id}</p></td>
                                        <td>{modify === value.id ? <div><input value={update.nom} onInput={e => setUpdate({ ...update, nom: e.target.value })}></input></div> : <div><p>{value.nom}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.prenom} onInput={e => setUpdate({ ...update, prenom: e.target.value })}></input></div> : <div><p>{value.prenom}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.email} onInput={e => setUpdate({ ...update, email: e.target.value })}></input></div> : <div><p>{value.email}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.phone} onInput={e => setUpdate({ ...update, phone: e.target.value })}></input></div> : <div><p>{value.phone}</p></div>}</td>
                                        <td>{modify === value.id ? <div><p>{value.creation_date}</p></div> : <div><p>{value.creation_date}</p></div>}</td>
                                        <td className={style.gestion}>
                                            {modify === value.id ? <button className={style.button} onClick={() => setModify(null)}>Stop</button> : <div></div>}
                                            {modify === value.id ? <button className={style.button} onClick={() => { Update(value.id); setModify(null) }}>MàJ</button> : <button className={style.button} onClick={() => { setModify(value.id); setUpdate(value); setMessage("") }}>Gérer</button>}
                                            {modify === value.id ? <Popup trigger={<button className={style.button_del}>X</button>} position="right"><button className={style.button_del} onClick={() => Supprimer(value.id)}>Suppr</button></Popup> : <div></div>}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ >
    )
}

export default Admin