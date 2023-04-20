import { Link } from "react-router-dom";
import "../styles/NotFound.css";

export default function NotFound() {
return (

<>
<div className="bl_page404">
  
  <div className="bl_page404__wrapper">
    <img
      src="https://github.com/BlackStar1991/Pictures-for-sharing-/blob/master/404/bigBoom/cloud_warmcasino.png?raw=true"
      alt="cloud_warmcasino.png"
    />
    <div className="bl_page404__el1" />
    <div className="bl_page404__el2" />
    <div className="bl_page404__el3" />
    <h1 className="h1_not_found">Erreur</h1>
  <p className="p_not_found">
 Oups ! Il semblerait que la page que vous recherchez n'existe pas.
  </p>
    <Link to="/" className="bl_page404__link">
      Retour à l'accueil
    </Link>
  </div>
</div>
</>

)
}