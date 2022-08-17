import Navbar from "../composants/navbar"
import { useEffect, useState } from "react";
import style from '../style/product_id.module.css'

function Product() {
    //eslint-disable-next-line
    const [product, setProduct] = useState([])
    console.log(product)

    useEffect(() => {
        getProduct()
        // eslint-disable-next-line
    }, [])

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
    }

    return (
        <>
            <Navbar />
            <div className={style.wrapper}>
                {product.map((value, key) =>
                    <div key={key} className={style.container}>
                        <img className={style.image} src={`http://localhost:8000/static/images/${value.id}/image1.jpg`} alt="" />
                        <div className={style.info}></div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Product