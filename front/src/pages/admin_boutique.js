import AdminNav from "../composants/adminNav"
import style from '../style/a_boutique.module.css'
import styles from '../style/card.module.css'

import { useState, useEffect } from 'react'

function AdminBoutique() {

    const [product, setProduct] = useState({})
    const [image, setImage] = useState({ image1: "" })
    const [preview, setPreview] = useState({ une: "" })
    const [update, setUpdate] = useState({})
    const [modify, setModify] = useState({})
    const [result, setResult] = useState([])
    const [message, setMessage] = useState("")

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [message])
    //RECHERCHER TOUS LES PRODUITS

    async function getProducts() {
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
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

    const input = (file) => {
        setImage({ ...image, image1: file })
        setPreview({ ...preview, une: URL.createObjectURL(file) });
    }

    async function createProduct() {
        if (image.image1 === "") {
            setMessage("Ajouter une image")
        }
        else {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            // myHeaders.append("Authorization", "Bearer " + token);
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
            formdata.append("image", image.image1);
            var Options = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };
            await fetch("http://localhost:8000/image/" + Id, Options)
            setMessage("Le produit a été ajouté")
        }
    }

    async function Update(id) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("Authorization", "Bearer " + token);
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
        setMessage("Le produit a été mis à jour.")
    }

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
    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.message}>{message}</div>
                <div className={style.container}>
                    <div className={style.create}>
                        <div className={style.title}>Ajouter un article :</div>
                        <div className={style.theme}>
                            <div >Thème :</div>
                            <input className={style.input} onInput={e => setProduct({ ...product, theme: e.target.value })}></input>
                        </div>
                        <div className={style.theme}>
                            <div >Catégorie :</div>
                            <input className={style.input} onInput={e => setProduct({ ...product, categorie: e.target.value })}></input>
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
                        <div className={style.button}>
                            <button onClick={createProduct}>Créer</button>
                        </div>
                    </div>
                    <div className={styles.card_wrapper}>
                        <div className={styles.container}>
                            <div className={styles.title}>{product.title}</div>
                            <div className={styles.image}>
                                <img className={styles.img_src} src={preview.une} alt="" />
                            </div>
                            <div className={styles.cat}>
                                <div className={styles.theme}>{product.theme}</div>
                                <div className={styles.categorie}>{product.categorie}</div>
                            </div>
                            <div className={styles.description}>{product.description}</div>
                            <div className={styles.footer}>
                                <div className={styles.price}>{product.ref}</div>
                                <div className={styles.price}>{product.price}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.tableau}>
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
                                        <td>{modify === value.id ? <div><p>{value.categorie}</p></div> : <div><p>{value.categorie}</p></div>}</td>
                                        <td>{modify === value.id ? <div><p>{value.theme}</p></div> : <div><p>{value.theme}</p></div>}</td>
                                        <td className={style.gestion}>
                                            {modify === value.id ? <button className={style.button} onClick={() => { Update(value.id); setModify(null) }}>✓</button> : <button className={style.button} onClick={() => { setModify(value.id); setUpdate(value) }}>Edit</button>}
                                            {modify === value.id ? <button className={style.button} onClick={() => setModify(null)}>X</button> : <button className={style.button} onClick={() => { Supprimer(value.id) }}>Supr</button>}
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