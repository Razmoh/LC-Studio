import Navbar from "../composants/navbar"
import { useState, useEffect } from 'react'
import style from '../style/boutique.module.css'
import Shop from '../composants/shop_card'
//PAGE BOUTIQUE
function Boutique() {
    //Stocker tous les produits pour le map
    const [product, setProduct] = useState([])
    //Gérer le message d'erreur/succès
    const [message, setMessage] = useState()
    //Stocker les thèmes pour le map + toggle
    const [theme, setTheme] = useState([])
    const [toggleTheme, setToggleTheme] = useState(false)
    //Stocker les catégories pour le map + toggle
    const [categorie, setCategorie] = useState([])
    const [toggleCat, setToggleCat] = useState(false)
    //Stocker la catégorie actuelle choisie
    const [current, setCurrent] = useState("")
    //Obtenir les produits au chargement de la page
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])

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
    //Obtenir les catégories
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
    //Obtenir les thèmes
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
    //Faire une recherche par thème
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
            setMessage("Oups ! Il semblerait qu'il n'y ai aucun produit..")
        }
        else {
            setMessage("")
            setProduct(data)
        }
    }
    //Faire une recherche par catégorie
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
            setMessage("Oups ! Il semblerait qu'il n'y ai aucun produit..")
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
                                <div className={style.button} key={key} value={value.title} onClick={() => { searchTheme(value.title); setCurrent(value.title) }}>{value.title}</div>)}
                        </div> : <div></div>}
                    </div>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { setToggleCat(prevtoggleCat => !prevtoggleCat); setToggleTheme(false) }}>CATÉGORIE </div>
                        {toggleCat === true ?
                            <div className={style.filter_btn}>
                                {categorie.map((value, key) =>
                                    <button className={style.button} key={key} value={value.title} onClick={() => { searchCategorie(value.title); setCurrent(value.title) }}>{value.title}</button>)}
                            </div> : <div></div>}
                    </div>
                </div>
                <div className={style.result}>
                    {current !== "" ? <div>Résultat de la recherche pour <b>{current}</b> :</div> : <div></div>}
                    <div className={style.message}>{message}</div>
                    <div className={style.cards}>
                        {product.map((value, key) =>
                            <Shop key={key} {...{ value: value }}></Shop>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Boutique