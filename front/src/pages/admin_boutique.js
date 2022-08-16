//PAGE ADMIN POUR GERER LA BOUTIQUE

import AdminNav from "../composants/adminNav"
import style from '../style/a_boutique.module.css'
import styles from '../style/shop.module.css'
import Popup from 'reactjs-popup';
import { useState } from 'react'

function AdminBoutique() {

    //CREER LE PRODUIT
    const [product, setProduct] = useState({ title: "", price: "", description: "", theme: "", categorie: "", ref: "" })
    const [image, setImage] = useState({ image1: "", image2: "" })
    //PREVIEW PRODUIT
    const [preview, setPreview] = useState({ une: "", deux: "" })
    //METTRE LE PRODUIT A JOUR
    const [update, setUpdate] = useState({})
    //TERNAIRE
    const [modify, setModify] = useState({})
    //RESULTAT DES FETCH
    const [result, setResult] = useState([])
    //SET LE MESSAGE (SUCCES/ERREUR)
    const [message, setMessage] = useState("")
    //UTILISER LES FILTRES
    const [filter, setFilter] = useState("")
    //CATEGORIE / THEME
    const [theme, setTheme] = useState([])
    const [categorie, setCategorie] = useState([])

    //RECHERCHER TOUS LES PRODUITS
    async function getProducts() {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/create_product", requestOptions)
        let data = await result.json();
        setResult(data)
    }

    async function getCat() {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/categorie", requestOptions)
        let data = await result.json();
        setCategorie(data)
    }

    async function getTheme() {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/theme", requestOptions)
        let theme = await result.json();
        setTheme(theme)
    }

    //RECUPERER L'IMAGE
    const input = (file) => {
        setImage({ ...image, image1: file })
        setPreview({ ...preview, une: URL.createObjectURL(file) });
    }

    const input2 = (file) => {
        setImage({...image, image2: file})
        setPreview({ ...preview, deux: URL.createObjectURL(file) });
    }
    //CREER LE PRODUIT
    async function createProduct() {
        if (image.image1 === "" && image.image2 === "") {
            setMessage("Ajouter une image !")
        }
        else {
            if (product.title === "" || product.ref === "" || product.description === "" || product.price === "" || product.categorie === "" || product.theme === "") {
                setMessage("Champs manquants !")
            } else {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var body = JSON.stringify({
                    "title": product.title,
                    "ref": product.ref,
                    "description": product.description,
                    "price": product.price,
                    "categorie": product.categorie,
                    "theme": product.theme
                })
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: body,
                    redirect: 'follow'
                };
                let data = await fetch("http://localhost:8000/create_product", requestOptions)
                const result = await data.json()
                const Id = result.id

                var formdata = new FormData();
                formdata.append("image1", image.image1);
                formdata.append("image2", image.image2);

                var Options = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };
                await fetch("http://localhost:8000/image/" + Id, Options)
                setMessage("Le produit a été ajouté")
            }
        }
    }
    //METTRE UN PRODUIT A JOUR
    async function Update(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var producterty = JSON.stringify({
            "title": update.title,
            "ref": update.ref,
            "description": update.description,
            "price": update.price,
            "theme": update.theme,
            "categorie": update.categorie
        });
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: producterty,
            redirect: 'follow'
        };
        await fetch("http://localhost:8000/create_product/" + id, requestOptions)
        setMessage("Le produit a été mit à jour.")
    }
    //SUPPRIMER UN PRODUIT
    async function Supprimer(id) {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/delete/" + id, requestOptions)
        let data = await result;
        if (data.status === 200) {
            var params = JSON.stringify({
                "id": id
            });
            var requestOption = {
                method: 'DELETE',
                headers: myHeaders,
                body: params,
                redirect: 'follow'
            };
            await fetch("http://localhost:8000/create_product/" + id, requestOption)
            setResult(old => old.filter(e => e.id !== id))
            setMessage("Le produit a été supprimé.")
        }
    }
    //RECHERCHER PAR THEME
    async function searchTheme(theme) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/filter/theme/" + theme, requestOptions)
        let data = await result.json();
        if (data === "aucun produit") {
            setMessage("Aucun produit !")
        }
        else {
            setResult(data)
        }
    }
    //RECHERCHER PAR CATEGORIE
    async function searchCategorie(categorie) {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/filter/categorie/" + categorie, requestOptions)
        let data = await result.json();
        if (data === "aucun produit") {
            setMessage("Aucun produit !")
        }
        else {
            setResult(data)
        }
    }
    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.create}>
                        <div className={style.title}>Ajouter un article :</div>
                        <div className={style.theme}>
                            <div onClick={getTheme} >Thème :</div>
                            <div className={style.map}>
                                {theme.map((value, key) =>
                                    <button className={style.map_btn} key={key} value={value.title} onClick={e => setProduct({ ...product, theme: e.target.value })}>{value.title}</button>)}
                            </div>
                        </div>
                        <div className={style.theme}>
                            <div onClick={getCat}>Catégorie :</div>
                            <div className={style.map}>
                                {categorie.map((value, key) =>
                                    <button className={style.map_btn} key={key} value={value.title} onClick={e => setProduct({ ...product, categorie: e.target.value })}>{value.title}</button>)}
                            </div>
                        </div>
                        <div className={style.titre}>
                            <label>TItre du produit :</label>
                            <input className={style.input} onInput={e => setProduct({ ...product, title: e.target.value })}></input>
                        </div>
                        <div className={style.titre}>
                            <label >Référence</label>
                            <input className={style.input} onInput={e => setProduct({ ...product, ref: e.target.value })}></input>
                        </div>
                        <label className={style.titre}>Description :</label>
                        <textarea className={style.description} onInput={e => setProduct({ ...product, description: e.target.value })}></textarea>
                        <div className={style.titre}>
                            <label >Prix à l'unité :</label>
                            <input className={style.input} onInput={e => setProduct({ ...product, price: e.target.value })}></input>
                        </div>
                        <label className={style.titre}>Choisir une image :</label>
                        <input className={style.picture} type="file" onChange={(e) => input(e.target.files[0])} />
                        <input className={style.picture} type="file" onChange={(e) => input2(e.target.files[0])} />
                        <div className={style.map_create}>
                            <button onClick={createProduct}>Créer</button>
                        </div>
                    </div>
                    <div className={styles.wrapper}>
                        <img className={styles.image} src={preview.une} alt="" />
                        <div className={styles.info}>
                            <div className={styles.ref}>
                                <div>Reférence n° {product.ref}</div>
                                <div className={styles.price}>A partir de {product.price}</div>
                            </div>
                            <div className={styles.title}>{product.title}</div>
                            <div className={styles.ref}>
                                <div>{product.categorie}</div>
                                <div className={styles.price}>{product.theme}</div>
                            </div>
                            <div className={styles.title}>{product.title}</div>
                        </div>
                    </div>
                </div>
                <div className={style.message}>{message}</div>
                <div className={style.tableau}>
                    <div className={style.search}>
                        <div className={style.filter}>
                            <label onClick={getProducts}>Tous les produits</label>
                        </div>
                        <div className={style.filter}>
                            <label>Rechercher par thème :</label>
                            <div>
                                <input className={style.filter_input} onInput={(e) => setFilter(e.target.value)}></input>
                                <button className={style.filter_btn} onClick={() => searchTheme(filter)}>Rechercher</button>
                            </div>
                        </div>
                        <div className={style.filter}>
                            <label>Rechercher par catégorie :</label>
                            <div>
                                <input className={style.filter_input} onInput={(e) => setFilter(e.target.value)}></input>
                                <button className={style.filter_btn} onClick={() => searchCategorie(filter)}>Rechercher</button>
                            </div>
                        </div>
                    </div>
                    <div className={style.tableau2}>
                        <table className={style.see}>
                            <thead>
                                <tr>
                                    <th className={style.id}>ID</th>
                                    <th className={style.cell}>Référence</th>
                                    <th >Titre</th>
                                    <th >Description</th>
                                    <th className={style.cell}>Prix</th>
                                    <th className={style.cell}>Catégorie</th>
                                    <th className={style.cell}>Thème</th>
                                    <th className={style.gestion}>Gestion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((value, key) =>
                                    <tr key={key}>
                                        <td><p>{value.id}</p></td>
                                        <td>{modify === value.id ? <div><input value={update.ref} onInput={e => setUpdate({ ...update, ref: e.target.value })}></input></div> : <div><p>{value.ref}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.title} onInput={e => setUpdate({ ...update, title: e.target.value })}></input></div> : <div><p>{value.title}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.description} onInput={e => setUpdate({ ...update, description: e.target.value })}></input></div> : <div><p>{value.description}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.price} onInput={e => setUpdate({ ...update, price: e.target.value })}></input></div> : <div><p>{value.price}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.categorie} onInput={e => setUpdate({ ...update, categorie: e.target.value })}></input></div> : <div><p>{value.categorie}</p></div>}</td>
                                        <td>{modify === value.id ? <div><input value={update.theme} onInput={e => setUpdate({ ...update, theme: e.target.value })}></input></div> : <div><p>{value.theme}</p></div>}</td>
                                        <td className={style.gestion}>
                                            {modify === value.id ? <button className={style.button} onClick={() => { Update(value.id); setModify(null) }}>MàJ</button> : <button className={style.button} onClick={() => { setModify(value.id); setUpdate(value) }}>Edit</button>}
                                            {modify === value.id ? <button className={style.button} onClick={() => setModify(null)}>Stop</button> : <Popup trigger={<button className={style.button_del}>Suppr</button>} position="right"><button className={style.button_del} onClick={() => Supprimer(value.id)}>Suppr</button></Popup>}
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminBoutique