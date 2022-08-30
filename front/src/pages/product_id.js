import Navbar from "../composants/navbar"
import { useEffect, useState } from "react";
import style from '../style/product_id.module.css'
import Alert from '../composants/alert'
import { Link } from 'react-router-dom'

function Product() {
    const [product, setProduct] = useState([])
    const [panier, setPanier] = useState({ id: "", title: "", ref: "", quantity: "" })
    const [message, setMessage] = useState("")
    const token = localStorage.getItem("Token")
    const [img, setImg] = useState()
    const [other, setOthers] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        getProduct()
    }, [toggle])

    //OBTENIR LES INFOS DU PRODUIT
    async function getProduct() {
        const id = (new URL(window.location.href).pathname).slice(10)
        var myHeaders = new Headers()
        // myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/create_product/" + id, requestOptions)
        let data = await result.json();
        setProduct(data)
        let main = document.getElementById("one").src
        setImg(main)
    }

    //OBTENIR LES AUTRES PRODUITS
    async function getOthers(id, theme) {
        console.log(theme)
        var myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        let result = await fetch("http://localhost:8000/create_product/theme/" + theme + "/" + id, requestOptions)
        let data = await result.json();
        setOthers(data)
    }

    //GÉRER LE PANIER   

    //SAUVEGARDER LE PANIER
    function savePanier(product) {
        localStorage.setItem("Panier", JSON.stringify(product))
    }
    //OBTENIR LE PANIER
    function getPanier() {
        let panier = localStorage.getItem("Panier")
        if (panier == null) {
            return []
        } else {
            return JSON.parse(panier)
        }
    }

    //SAUVEGARDER UN PRODUIT
    function addProduct(product) {
        if (token === null) {
            setMessage(<a href='/login'>Vous devez vous connecter pour ajouter ce produit au panier.</a>)
        } else {
            if (product.quantity === "") {
                setMessage(<Alert type="error">
                    <p>Veuillez séléctionner le nombre de produit.</p>
                </Alert>)
            } else {

                if (isNaN(product.quantity) || product.quantity === 0) {
                    setMessage(<Alert type="error">
                        <p>Veuillez entrer une donnée valide.</p>
                    </Alert>)
                } else {
                    let panier = getPanier()
                    let foundProduct = panier.find(p => p.ref === product.ref)
                    if (foundProduct !== undefined) {
                        foundProduct.quantity += product.quantity
                    } else {
                        panier.push(product)
                    }
                    savePanier(panier)
                    setMessage(<Alert type="success">
                        <p>Le produit a été ajouté au panier.</p>
                    </Alert>)
                }
            }
        }
    }

    function switchImg2(param) {
        setImg(param)
        document.getElementById('one').src = param
    }
    function switchImg3(param) {
        setImg(param)
        document.getElementById('one').src = param
    }
    function switchImg4(param) {
        setImg(param)
        document.getElementById('one').src = param
    }
    function switchImg5(param) {
        setImg(param)
        document.getElementById('one').src = param
    }

    return (
        <>
            <Navbar />
            <div className={style.wrapper}>
                {product.map((value, key) =>
                    <>
                        <div key={key} className={style.container}>
                            <img id="one" className={style.image} src={`http://localhost:8000/static/images/${value.id}/image1.jpg`} alt="" />
                            <div className={style.info}>
                                <div className={style.title}>{value.title}</div>
                                <div className={style.ref}>
                                    <div className={style.ref}><i>Référence n° {value.ref}</i></div>
                                    <div><i>A partir de <b>{value.price}</b> unitaire</i>.</div>
                                </div>
                                <div>Quantité :</div>
                                <div className={style.cart_devis}>
                                    {/*eslint-disable-next-line*/}
                                    <input placeholder="?" onInput={(e) => { { setPanier({ ...panier, id: value.id, title: value.title, ref: value.ref, quantity: parseInt(e.target.value) }) }; setMessage("") }}></input>
                                    &nbsp;&nbsp;&nbsp;<button onClick={() => { addProduct(panier) }}>Ajouter au devis</button>
                                </div>
                                <div>Détails de l'article : </div>
                                <div className={style.description}>{value.description}</div>
                            </div>
                            <div className={style.message}>{message}</div>

                        </div>
                        <div className={style.footer}>
                            <div className={style.sup_images}>
                                <img id="two" className={style.sup_image} onClick={(e) => { switchImg2(e.currentTarget.src); e.currentTarget.src = img }} src={value.images >= 2 ? `http://localhost:8000/static/images/${value.id}/image2.jpg` : `http://localhost:8000/static/images/default.jpg`} alt="" />
                                <img id="three" className={style.sup_image} onClick={(e) => { switchImg3(e.currentTarget.src); e.currentTarget.src = img }} src={value.images >= 3 ? `http://localhost:8000/static/images/${value.id}/image3.jpg` : `http://localhost:8000/static/images/default.jpg`} alt="" />
                                <img id="four" className={style.sup_image} onClick={(e) => { switchImg4(e.currentTarget.src); e.currentTarget.src = img }} src={value.images >= 4 ? `http://localhost:8000/static/images/${value.id}/image4.jpg` : `http://localhost:8000/static/images/default.jpg`} alt="" />
                                <img id="five" className={style.sup_image} onClick={(e) => { switchImg5(e.currentTarget.src); e.currentTarget.src = img }} src={value.images === 5 ? `http://localhost:8000/static/images/${value.id}/image5.jpg` : `http://localhost:8000/static/images/default.jpg`} alt="" />
                            </div>
                            <div className={style.other} onClick={(e) => { getOthers(value.id, value.theme) }}>== Découvrir la gamme complète du thème == </div>
                        </div>
                    </>
                )}
                <div className={style.other_product}>
                    {other.map((value, key) =>
                        < >
                            <Link to={`/boutique/${value.id}`} onClick={() => {getProduct(value.id); setToggle(prevtoggle => !prevtoggle)}}>
                                <div className={style.wrap}>
                                    <img key={key} className={style.other_img} src={`http://localhost:8000/static/images/${value.id}/image1.jpg`} alt="" />
                                    <div>{value.title}</div>
                                </div>
                            </Link>
                        </>
                    )}
                </div>


            </div>
        </>
    )
}


export default Product