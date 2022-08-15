import Navbar from "../composants/navbar"
import { useState, useEffect } from 'react'
import style from '../style/boutique.module.css'
import Shop from '../composants/shop_card'


function Boutique() {

    const [product, setProduct] = useState([])
    const [filter, setFilter] = useState()
    const [filter2, setFilter2] = useState()
    const [message, setMessage] = useState()
    const [theme, setTheme] = useState([])
    const [categorie, setCategorie] = useState([])
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [message])

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
            setMessage("toto")
            setProduct(data)
        }
    }

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
            setProduct(data)
        }
    }
    return (
        <>
            <Navbar />
            <div className={style.container}>
                <div className={style.search}>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { getTheme(); setCategorie([]); setFilter(); setMessage("") }}>THEME</div>
                        <div className={style.filter_btn}>
                            {theme.map((value, key) =>
                                <button className={style.button} key={key} value={value.title} onClick={() => setFilter2(value.title)}>{value.title}</button>)}
                            {filter2 === undefined ? <div></div> : <button className={style.button} onClick={() => searchTheme(filter2)}>OK</button>}
                        </div>
                    </div>
                    <div className={style.filter}>
                        <div className={style.label} onClick={() => { getCat(); setTheme([]); setFilter2(); setMessage("") }}>CATEGORIE</div>
                        <div className={style.filter_btn}>
                            {categorie.map((value, key) =>
                                <button className={style.button} key={key} value={value.title} onClick={() => setFilter(value.title)}>{value.title}</button>)}
                            {filter === undefined ? <div></div> : <button className={style.button} onClick={() => searchCategorie(filter)}>OK</button>}
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