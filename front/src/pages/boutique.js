import Navbar from "../composants/navbar"
import { useState, useEffect } from 'react'
import style from '../style/boutique.module.css'
import Shop from '../composants/shop_card'


function Boutique() {

    const [product, setProduct] = useState([])
    const [filter, setFilter] = useState()
    const [message, setMessage] = useState()
    const [theme, setTheme] = useState([])
    const [categorie, setCategorie] = useState([])
    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])
 console.log(categorie)
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
                        <label onClick={getTheme}>Rechercher par thème :</label>
                        <div>
                            <input className={style.filter_input} onInput={(e) => setFilter(e.target.value)}></input>
                            <button className={style.filter_btn} onClick={() => searchTheme(filter)}>Rechercher</button>
                        </div>
                    </div>
                    <div className={style.filter}>
                        <label onClick={getCat}>Rechercher par catégorie :</label>
                        <div>
                            <input className={style.filter_input} onInput={(e) => setFilter(e.target.value)}></input>
                            <button className={style.filter_btn} onClick={() => searchCategorie(filter)}>Rechercher</button>
                        </div>
                    </div>
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