import AdminNav from "../composants/adminNav"
import style from '../style/a_boutique.module.css'

import { useState } from 'react'

function AdminBoutique() {

    const [product, setProduct] = useState({})
    const [image, setImage] = useState({ image1: "" })
    const [preview, setPreview] = useState({ une: "" })

    const input = (file) => {
        setImage({ ...image, image1: file })
        setPreview({ ...preview, une: URL.createObjectURL(file) });
    }

    async function createProduct() {
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
    }
    return (
        <>
            <AdminNav />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.categorie}>
                        <div className={style.title}>Gérer les catégories :</div>
                    </div>
                    <div className={style.create}>
                        <div className={style.title}>Ajouter un article :</div>
                        <div className={style.theme}>
                            <div >Thème :</div>
                            <select className={style.select} onClick={e => setProduct({ ...product, theme: e.target.value })}>
                                <option value="Mariage">Mariage</option>
                                <option value="Naissance">Naissance</option>
                            </select>
                        </div>
                        <div className={style.theme}>
                            <div >Catégorie :</div>
                            <select className={style.select} onClick={e => setProduct({ ...product, categorie: e.target.value })}>
                                <option value="Marvel">Marvel</option>
                                <option value="Pokemon">Pokémon</option>
                            </select>
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
                    <div className={style.display}>
                        <div className={style.title}>Preview</div>
                        <div>{product.theme}</div>
                        <div>{product.categorie}</div>
                        <div>{product.title}</div>
                        <img className={style.preview} src={preview.une} alt="" />
                        <div>{product.description}</div>
                        <div>{product.price}</div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default AdminBoutique