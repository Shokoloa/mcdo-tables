import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import gsap from "gsap";
import img from '../assets/images/404.svg';

export const Error = ({ saveError }) => {
    let { error } = useParams();
    const [view, setView] = useState(null);
    const errorList = ['404', '403', '500', '503'];

    const [svgContent, setSvgContent] = useState(null);

    useEffect(() => {
        document.getElementById('globalbackgroundimage').style.display = 'none';
        if (!error && saveError) error = saveError;

        if (errorList.includes(error)) setView(error);
        else setView(null);
    });

    useEffect(() => {
        if (view !== '404' && view !== null) return;
        const fetchSVG = async () => {
            try {
                const response = await fetch(img);
                const svgText = await response.text();
                setSvgContent(svgText);
            } catch (error) { console.error(error); }
        };

        fetchSVG();
    }, []);

    useEffect(() => {
        if (view !== '404' && view !== null) return;
        const animateSVG = () => {
            if (svgContent) {
                gsap.to(["#headStripe", "#spaceman", "#craterSmall", "#craterBig", "#planet"], {
                    y: 0.5,
                    rotation: 1,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut",
                    duration: 1
                });

                gsap.to("#planet", {
                    rotation: -2,
                    yoyo: true,
                    repeat: -1,
                    duration: 1,
                    ease: "sine.inOut",
                    transformOrigin: "50% 50%"
                });

                gsap.to("#starsBig g", {
                    rotation: "random(-30,30)",
                    transformOrigin: "50% 50%",
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                });

                gsap.fromTo("#starsSmall g", { scale: 0 }, { scale: 1, yoyo: true, repeat: -1, stagger: 0.1 });

                gsap.to(["#circlesSmall circle", "#circlesBig circle"], {
                    y: -4,
                    yoyo: true,
                    duration: 1,
                    ease: "sine.inOut",
                    repeat: -1
                });

                gsap.set("#glassShine", { x: -68 });

                gsap.to("#glassShine", {
                    x: 80,
                    duration: 2,
                    rotation: -30,
                    ease: "expo.inOut",
                    transformOrigin: "50% 50%",
                    repeat: -1,
                    repeatDelay: 8,
                    delay: 2
                });
            }
        };

        animateSVG();
    }, [svgContent]);

    const redirectButtons = () => {
        return (
            <article className="errorbuttons" style={{ marginTop: '5vh' }}>
                <button className="secondary-button" onClick={() => { window.history.back(); setTimeout(() => { location.reload(); }, 100) }}>Précédent</button>
                <button className="secondary-button" onClick={() => window.location.href = '/'}>Accueil</button>
            </article>
        )
    }

    return (
        <main className="errorpage">
            <section className="errorBackground">
                <div></div>
            </section>
            <section className="content">
                {view === '404' || view === null ? (
                    <div className="notfound">
                        <div className="cat-container">
                            <div className="row anim-2" style={{ '--duration': '2s' }}>
                                <div>
                                    <div dangerouslySetInnerHTML={{ __html: svgContent }} />
                                </div>
                                <div className="anim-3" style={{ '--duration': '2s' }}>
                                    <h1>Oops! Vous vous êtes perdus.</h1>
                                    <p>La page <code>{useLocation().pathname}</code> n'existe pas. Comment êtes-vous arrivé ici est un mystère.</p>
                                    {redirectButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : view === '403' ? (
                    <div className="defaulterror">
                        <h1>🚨 Oops! Vous n'avez pas accès à ce contenu. 🚨</h1>
                        <p>Cette page et tous les liens liés à celle-ci sont inacessible sans une clé d'authentification.</p>
                        {redirectButtons()}
                    </div>
                ) : view === '500' ? (
                    <div className="defaulterror">
                        <h1>🚨 Oops... Quelque chose s'est mal passé de notre côté. 🚨</h1>
                        <p>Notre serveur a rencontré un problème inattendu. Essayez de recharger la page ou revenez plus tard.</p>
                        {redirectButtons()}
                    </div>
                ) : view === '503' ? (
                    <div className="defaulterror">
                        <h1>🚨 Oops... Ce service est momentanément indisponible. 🚨</h1>
                        <p>Cela peut être dû à une maintenance ou à une surcharge. Réessayez dans quelques instants !</p>
                        {redirectButtons()}
                    </div>
                ) : (<></>)}
            </section>
        </main>
    )
}