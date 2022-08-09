import Navbar from "../composants/navbar"
import style from '../style/aboutme.module.css'
function AboutMe() {
    return (
        <>
            <Navbar />
            <div className={style.container}>
                <img className={style.profil_pic} src={'/images/laeti.jpg'} alt="" />
                <div className={style.parag_un}>
                    Graphiste depuis 2016 en agence de communication / imprimerie, j’ai décidé en 2020 de me lancer à mon compte.<br /><br />
                    Ayant passé plusieurs années à être au service des professionnels, j’ai décidé de diversifier mon offre et de proposer mes services aux particuliers, notamment dans le domaine de l’événementiel, avec la création et l’impression de la papeterie(faire-part, plan de table, cartons de remerciements, marque-places).<br /><br />
                    Suite à mon mariage en 2017 sur le thème Steampunk, j’ai pu remarquer qu'a cette époque, se marier sur un thème qui sortait de l’ordinaire pouvait être un vrai casse-tête et avoir un coût élevé, notamment sur la décoration mais plus particulièrement sur les visuels papier.<br /><br />
                    Aujourd’hui en 2022, il est plus facile de réaliser un événement sur un thème dit « décalé », il est plus facilement possible de trouver de la décoration à moindre coût, ainsi que quelques idées de faire-part sur internet. Mais la plupart des visuels sont faits à l’étranger a des prix abusifs, et encore faut il trouver le reste (plan de table…), ou bien le faire dessiner par un graphiste. Tout cela engendre un cout rapidement élevé, sans parler de l'impression.
                    <br /><br />
                    J’ai donc décidé de diversifier mon offre et proposer des visuels avec gamme complète, faire-part, marque place, plan de table, save the date, sur des thèmes qui sortent de l'ordinaire, tel que Steampunk, World of Warcraft, Studio Ghibli et plus encore !

                    Les visuels seront disponibles à la personnalisation, changement de texte, prénom, date.

                    Pour plus d’information sur le fonctionnement des commandes, veuillez cliquer <b>ICI</b>.
                </div>


            </div>
        </>
    )
}

export default AboutMe