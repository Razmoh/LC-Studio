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
    const [toggleTheme, setToggleTheme] = useState(false)
    //STOCKER LES CATEGORIES
    const [categorie, setCategorie] = useState([])
    const [toggleCat, setToggleCat] = useState(false)
    const [current, setCurrent] = useState("")
    console.log(current)
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
        getTheme()
        getCat()
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
                        <div className={style.label} onClick={() => { setToggleTheme(prevtoggleTheme => !prevtoggleTheme); setToggleCat(false) }}>THEME</div>
                        {toggleTheme === true ? <div className={style.filter_btn}>
                            {theme.map((value, key) =>
                                <div className={style.button} key={key} value={value.title} onClick={() => {searchTheme(value.title); setCurrent(value.title)}}>{value.title}</div>)}
                        </div> : <div></div>}
                    </div>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { setToggleCat(prevtoggleCat => !prevtoggleCat); setToggleTheme(false) }}>CATÉGORIE </div>
                        {toggleCat === true ?
                            <div className={style.filter_btn}>
                                {categorie.map((value, key) =>
                                    <button className={style.button} key={key} value={value.title} onClick={() => searchCategorie(value.title)}>{value.title}</button>)}
                            </div> : <div></div>}
                    </div>
                    <div>{message}</div>
                </div>
                <div className={style.cards}>
                    {current !== "" ? <div>Résultat :</div> : <div>Résultat : {current}</div>}
                    {product.map((value, key) =>
                        <Shop key={key} {...{ value: value }}></Shop>
                    )}
                </div>
            </div>

        </>
    )
}

export default Boutique