import AdminNav from "../composants/adminNav"
import style from '../style/a_boutique.module.css'

function AdminBoutique() {
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
                            <select className={style.select}>
                                <option value="1">Mariage</option>
                            </select>
                        </div>
                        <div className={style.theme}>
                            <div >Catégorie :</div>
                            <select className={style.select}>
                                <option value="1">Marvel</option>
                            </select>
                        </div>
                        <div className={style.titre}>
                            <label>TItre du produit :</label>
                            <input></input>
                        </div>
                    </div>
                    <div className={style.display}>
                        <div className={style.title}>Preview</div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default AdminBoutique