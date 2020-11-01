import React from 'react';
import {Link} from "react-router-dom";

function Landing() {
    return (
        <div id="page-landing">
            <div>
                <Link to="/real-state/create" className="enter-app">
                    Cadastrar Imobiliária
                </Link>
                <br/>
                <Link to="/property/create" className="enter-app">
                    Cadastrar Imóvel
                </Link>
            </div>
            {/*<div className="content-wrapper">
                <img src={logoImg} alt="Logo"/>
                <main>
                    <h1>Leve felicidade para o mundo.</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                <div className="location">
                    <strong>Sumaré</strong>
                    <span>São Paulo</span>
                </div>
                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
                </Link>
            </div>*/}
        </div>
    )
}

export default Landing;
