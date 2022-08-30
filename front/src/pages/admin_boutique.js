//PAGE ADMIN POUR GERER LA BOUTIQUE

import AdminNav from "../composants/adminNav"
import style from '../style/a_boutique.module.css'
import styles from '../style/shop.module.css'
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react'
import Alert from '../composants/alert'

function AdminBoutique() {

    //CREER LE PRODUIT
    const [product, setProduct] = useState({ title: "", price: "", description: "", theme: "", categorie: "", ref: "" })
    const [image, setImage] = useState({ image1: "", image2: "", image3: "", image4: "", image5: "" })
    const [count, setCount] = useState(0)
    //PREVIEW PRODUIT
    const [preview, setPreview] = useState({ une: "", deux: "", trois: "", quatre: "", cinq: "" })
    //METTRE LE PRODUIT A JOUR
    const [update, setUpdate] = useState({})
    //TERNAIRE
    const [modify, setModify] = useState({})
    //RESULTAT DES FETCH
    const [result, setResult] = useState([])
    //SET LE MESSAGE (SUCCES/ERREUR)
    const [message, setMessage] = useState("")
    //CATEGORIE / THEME
    const [theme, setTheme] = useState([])
    const [togTheme, setTogTheme] = useState(false)
    const [categorie, setCategorie] = useState([])
    const [togCat, setTogCat] = useState(false)
    //TOGGLE POUR LA RECHERCHE DU TABLEAU
    const [toggleCat, setToggleCat] = useState(false)
    const [toggleTheme, setToggleTheme] = useState(false)
    //PARAM POUR CREER THEME/CAT
    const [param, setParam] = useState("")

    useEffect(() => {
        getCat()
        // eslint-disable-next-line
    }, [])
    //RECHERCHER TOUS LES PRODUITS
    async function getProducts() {
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/create_product/admin", requestOptions)
        let data = await result.json();
        setResult(data)
    }

    function Count() {
        setCount(count + 1)
    }
    //OBTENIR TOUTES LES CATEGORIES
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
        getTheme()
    }

    //AJOUTER UNE CATEGORIE
    async function addCat() {
        if (param === "") {
            setMessage(<Alert type="error">
                <p>Ajoutez du texte.</p>
            </Alert>)
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var body = JSON.stringify({
                "title": param
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: body,
                redirect: 'follow'
            };
            let data = await fetch("http://localhost:8000/create_product/categorie", requestOptions)
            const result = await data.json()
            if (result) {
                setMessage(<Alert type="success">
                    <p>La catgéorie a été ajoutée.</p>
                </Alert>)
            }
        }
    }
    //OBTENIR TOUS LES THEMES
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
    //AJOUTER UN THEME
    async function addTheme() {
        if (param === "") {
            setMessage(<Alert type="error">
                <p>Ajoutez du texte.</p>
            </Alert>)
        } else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var body = JSON.stringify({
                "title": param
            })
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: body,
                redirect: 'follow'
            };
            let data = await fetch("http://localhost:8000/create_product/theme", requestOptions)
            const result = await data.json()
            if (result) {
                setMessage(<Alert type="success">
                    <p>Le thème a été ajoutée.</p>
                </Alert>)
            }
        }
    }

    //RECUPERER L'IMAGE
    const input = (file) => {
        setImage({ ...image, image1: file })
        setPreview({ ...preview, une: URL.createObjectURL(file) });
        Count()
    }

    const input2 = (file) => {
        setImage({ ...image, image2: file })
        setPreview({ ...preview, deux: URL.createObjectURL(file) });
        Count()
    }

    const input3 = (file) => {
        setImage({ ...image, image3: file })
        setPreview({ ...preview, trois: URL.createObjectURL(file) });
        Count()
    }

    const input4 = (file) => {
        setImage({ ...image, image4: file })
        setPreview({ ...preview, quatre: URL.createObjectURL(file) });
        Count()
    }

    const input5 = (file) => {
        setImage({ ...image, image5: file })
        setPreview({ ...preview, cinq: URL.createObjectURL(file) });
        Count()
    }
    //CREER LE PRODUIT
    async function createProduct() {
        if (image.image1 === "" || image.image2 === "") {
            setMessage(<Alert type="error">
                <p>Ajoutez une image.</p>
            </Alert>)
        }
        else {
            if (product.title === "" || product.ref === "" || product.description === "" || product.price === "" || product.categorie === "" || product.theme === "") {
                setMessage(<Alert type="error">
                    <p>Champ(s) manquant(s).</p>
                </Alert>)
            } else {
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                var body = JSON.stringify({
                    "title": product.title,
                    "ref": product.ref,
                    "description": product.description,
                    "price": product.price,
                    "categorie": product.categorie,
                    "theme": product.theme,
                    "images": count
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
                formdata.append("image3", image.image3);
                formdata.append("image4", image.image4);
                formdata.append("image5", image.image5);

                var Options = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };
                await fetch("http://localhost:8000/image/" + Id, Options)
                setMessage(<Alert type="success">
                    <p>Le produit a été ajouté.</p>
                </Alert>)
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
        setMessage(<Alert type="primary">
            <p>Le produit a été modifié.</p>
        </Alert>)
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
            setMessage(<Alert type="error">
                <p>Le produit a été supprimé.</p>
            </Alert>)
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
            setMessage(<Alert type="error">
                <p>Aucun produit.</p>
            </Alert>)
        }
        else {
            setResult(data)
            setMessage("")
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
            setMessage(<Alert type="error">
                <p>Aucun produit.</p>
            </Alert>)
        }
        else {
            setResult(data)
            setMessage("")
        }
    }
    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.categorie}>
                        <div className={style.create_theme}>
                            <div className={style.create_title}>
                                <u> Thèmes :</u>
                            </div>
                            {theme.map((value, key) =>
                                <div className={style.teuteu} key={key} value={value.title}>{value.id} ) {value.title}</div>)}
                            <div>
                                <input onInput={(e) => setParam(e.target.value)}></input>
                                <Popup trigger={<button>+</button>} position="bottom"><button onClick={() => addTheme(param)}>Confirmer la création</button></Popup>
                            </div>
                        </div>
                        <div className={style.create_cat}>
                            <div className={style.create_title}>
                                <u>Catégories :</u>
                            </div>
                            {categorie.map((value, key) =>
                                <div className={style.teuteu} key={key} value={value.title}>{value.id} ) {value.title}</div>)}
                            <div>
                                <input onInput={(e) => setParam(e.target.value)}></input>
                                <Popup trigger={<button>+</button>} position="bottom"><button onClick={() => addCat(param)}>Confirmer la création</button></Popup>
                            </div>
                        </div>

                    </div>
                    <div className={style.create}>
                        <div className={style.title}>Ajouter un article :</div>
                        <div className={style.theme}>
                            <div onClick={() => { setTogTheme(true) }} >Thème :</div>
                            {togTheme === true ?
                                <div className={style.map}>
                                    {theme.map((value, key) =>
                                        <button className={style.map_btn} key={key} value={value.title} onClick={e => setProduct({ ...product, theme: e.target.value })}>{value.title}</button>)}
                                </div> : <div></div>}
                        </div>
                        <div className={style.theme}>
                            <div onClick={() => { setTogCat(true) }}>Catégorie :</div>
                            {togCat === true ?
                                <div className={style.map}>
                                    {categorie.map((value, key) =>
                                        <button className={style.map_btn} key={key} value={value.title} onClick={e => setProduct({ ...product, categorie: e.target.value })}>{value.title}</button>)}
                                </div> : <div></div>}
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
                        {image.image2 !== "" ? <input className={style.picture} type="file" onChange={(e) => input3(e.target.files[0])} /> : <div></div>}
                        {image.image3 !== "" ? <input className={style.picture} type="file" onChange={(e) => input4(e.target.files[0])} /> : <div></div>}
                        {image.image4 !== "" ? <input className={style.picture} type="file" onChange={(e) => input5(e.target.files[0])} /> : <div></div>}
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
                            <label onClick={() => { setToggleTheme(prevtoggleTheme => !prevtoggleTheme); setToggleCat(false) }}>Rechercher par thème :</label>
                            {toggleTheme === true ? <div className={style.search_btn}>
                                {theme.map((value, key) =>
                                    <button className={style.map_btn} key={key} value={value.title} onClick={(e) => searchTheme(e.target.value)}>{value.title}</button>)}
                            </div> : <div></div>}
                        </div>
                        <div className={style.filter}>
                            <label onClick={() => { setToggleCat(prevtoggleCat => !prevtoggleCat); setToggleTheme(false) }}>Rechercher par catégorie :</label>
                            {toggleCat === true ? <div className={style.search_btn}>
                                {categorie.map((value, key) =>
                                    <button className={style.map_btn} key={key} value={value.title} onClick={(e) => searchCategorie(e.target.value)}>{value.title}</button>)}
                            </div> : <div></div>}
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