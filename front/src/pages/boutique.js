import Navbar from "../composants/navbar"
import { useState, useEffect } from 'react'
import Card from "../composants/card"
import style from '../style/boutique.module.css'


function Boutique() {

    const [product, setProduct] = useState([])

    useEffect(() => {
        getProducts()
        // eslint-disable-next-line
    }, [])

    console.log(product)

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

    return (
        <>
            <Navbar />
            <div className={style.cards}>
                {product.map((value, key) =>
                    <Card key={key} {...{ value: value }}></Card>
                )}
            </div>
        </>
    )
}

export default Boutique