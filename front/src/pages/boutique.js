import Navbar from "../composants/navbar"
import { useState, useEffect } from 'react'
import style from '../style/boutique.module.css'
import Shop from '../composants/shop_card'
//PAGE BOUTIQUE
function Boutique() {
    //STOCKER TOUS LES PRODUITS
    const [product, setProduct] = useState([])
    //MESSAGE 
    const [message, setMessage] = useState()
    //STOCKER LES THEMES
    const [theme, setTheme] = useState([])
    //STOCKER LES CATEGORIES
    const [categorie, setCategorie] = useState([])
    //OBTENIR TOUS LES PRODUITS AU CHARGEMENT DE LA PAGE
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])
    //OBTENIR TOUS LES PRODUITS
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
        setProduct(data)
    }
    //OBTENIR LES CATEGORIES
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
    //FAIRE UNE RECHERCHE DE PRODUIT PAR THEME
    async function searchTheme(theme) {
        setMessage("")
        setProduct([])
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
            setMessage("")
            setProduct(data)
        }
    }
    //FAIRE UNE RECHERCHE DE PRODUIT PAR CATEGORIE
    async function searchCategorie(categorie) {
        setMessage("")
        setProduct([])
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
            setProduct(data)
        }
    }

    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.search}>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { getTheme(); setCategorie([]); setMessage("") }}>THEME</div>
                        <div className={style.filter_btn}>
                            {theme.map((value, key) =>
                                <button className={style.button} key={key} value={value.title} onClick={() => searchTheme(value.title)}>{value.title}</button>)}
                        </div>
                    </div>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { getCat(); setTheme([]); setMessage("") }}>CATEGORIE</div>
                        <div className={style.filter_btn}>
                            {categorie.map((value, key) =>
                                <button className={style.button} key={key} value={value.title} onClick={() => searchCategorie(value.title)}>{value.title}</button>)}
                        </div>
                    </div>
                    <div>{message}</div>
                </div>
            </div>
            <div className={style.cards}>
                {product.map((value, key) =>
                    <Shop key={key} {...{ value: value }}></Shop>
                )}
            </div>
        </>
    )
}

export default Boutique