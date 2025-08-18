import { useState } from 'react';

const tablesData = [
    // Playland
    { id: '354', numbers: [354, 355], x: 90, y: 5, shape: 'rectangle-v' },
    { id: '361', numbers: [361], x: 67, y: 10, shape: 'square' },
    { id: '362', numbers: [362], x: 57, y: 10, shape: 'square' },
    { id: '360', numbers: [360], x: 47, y: 10, shape: 'square' },
    { id: '359', numbers: [359], x: 37, y: 10, shape: 'square' },
    { id: '358', numbers: [358], x: 27, y: 10, shape: 'square' },
    { id: '357', numbers: [357], x: 17, y: 10, shape: 'square' },
    { id: '356', numbers: [356], x: 7, y: 10, shape: 'square' },

    // Milieu gauche
    { id: '323', numbers: [323], x: 60, y: 19, shape: 'round' },
    { id: '334', numbers: [334], x: 37, y: 19, shape: 'rectangle' },
    { id: '344', numbers: [344], x: 10, y: 19, shape: 'round' },
    { id: '343', numbers: [343], x: 10, y: 30, shape: 'rectangle-vs' },
    { id: '333', numbers: [333], x: 40, y: 30, shape: 'rectangle-vs' },
    { id: '322', numbers: [322], x: 60, y: 30, shape: 'rectangle-vs' },

    // Salle gauche
    { id: '332', numbers: [332], x: 45, y: 40, shape: 'rectangle-vs' },
    { id: '342', numbers: [342], x: 35, y: 40, shape: 'rectangle-vs' },
    { id: '353', numbers: [353], x: 25, y: 40, shape: 'rectangle-vs' },
    { id: '352', numbers: [352], x: 15, y: 40, shape: 'rectangle-vs' },
    { id: '351', numbers: [351], x: 5, y: 48, shape: 'rectangle-s' },
    { id: '350', numbers: [350], x: 5, y: 53, shape: 'rectangle-s' },
    { id: '349', numbers: [349], x: 5, y: 58, shape: 'rectangle-s' },
    { id: '348', numbers: [348], x: 5, y: 63, shape: 'rectangle-s' },

    { id: '341', numbers: [341, 365], x: 30, y: 50, shape: 'rectangle-v' },
    { id: '366', numbers: [366, 340], x: 30, y: 58, shape: 'rectangle-v' },

    { id: '331', numbers: [331], x: 55, y: 53, shape: 'square' },
    { id: '330', numbers: [330], x: 55, y: 57, shape: 'rectangle-vs' },
    { id: '329', numbers: [329], x: 55, y: 63, shape: 'rectangle-vs' },
    { id: '328', numbers: [328], x: 55, y: 69, shape: 'square' },

    { id: '321', numbers: [321, 320], x: 60, y: 80, shape: 'rectangle-l' },
    { id: '315', numbers: [315, 314], x: 78, y: 80, shape: 'rectangle-l' },

    { id: '326', numbers: [326], x: 45, y: 73, shape: 'square' },
    { id: '327', numbers: [327], x: 38, y: 73, shape: 'rectangle-s' },
    { id: '338', numbers: [338], x: 31, y: 73, shape: 'rectangle-s' },
    { id: '339', numbers: [339], x: 25, y: 73, shape: 'square' },

    { id: '324', numbers: [324], x: 45, y: 79, shape: 'square' },
    { id: '325', numbers: [325], x: 40, y: 79, shape: 'square' },
    { id: '335', numbers: [335], x: 35, y: 79, shape: 'square' },
    { id: '336', numbers: [336], x: 30, y: 79, shape: 'square' },
    { id: '337', numbers: [337], x: 25, y: 79, shape: 'square' },

    { id: '347', numbers: [347], x: 5, y: 85, shape: 'square' },
    { id: '346', numbers: [346], x: 5, y: 89, shape: 'square' },
    { id: '345', numbers: [345], x: 5, y: 93, shape: 'square' },

    // Salle droite
    { id: '300', numbers: [300], x: 94, y: 88, shape: 'square' },
    { id: '301', numbers: [301], x: 94, y: 84, shape: 'square' },
    { id: '302', numbers: [302], x: 94, y: 80, shape: 'square' },
    { id: '303', numbers: [303], x: 94, y: 76, shape: 'square' },
    { id: '304', numbers: [304], x: 94, y: 72, shape: 'square' },
    { id: '305', numbers: [305], x: 94, y: 68, shape: 'square' },
    { id: '306', numbers: [306], x: 94, y: 64, shape: 'square' },
    { id: '307', numbers: [307], x: 94, y: 60, shape: 'square' },
    { id: '308', numbers: [308], x: 94, y: 56, shape: 'square' },
    { id: '309', numbers: [309], x: 94, y: 52, shape: 'square' },
    { id: '310', numbers: [310], x: 94, y: 48, shape: 'square' },
    { id: '312', numbers: [312], x: 94, y: 44, shape: 'square' },
    { id: '313', numbers: [313, 364], x: 94, y: 38, shape: 'round' },
    { id: '318', numbers: [318], x: 88, y: 38, shape: 'square' },
    { id: '319', numbers: [319], x: 83, y: 38, shape: 'square' },
    { id: '316', numbers: [316], x: 79, y: 70, shape: 'rectangle-s' },
    { id: '317', numbers: [317], x: 79, y: 60, shape: 'rectangle-s' },
];

export const Home = () => {
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const [highlightedId, setHighlightedId] = useState(null);

    const handleSearch = () => {
        const num = parseInt(search);
        const table = tablesData.find(t => t.numbers.includes(num));
        if (table) {
            setHighlightedId(table.id);
            setTimeout(() => setHighlightedId(null), 10000);
        } else {
            setHighlightedId(null);
            if (isNaN(num)) setError(`"${search}" n'est pas un numéro de table valide.`);
            else setError(`La table ${num} est introuvable.`);
        }
    };

    return (
        <main className="app">
            <section className="top">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="000"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        maxLength={3}
                    />
                    <button onClick={handleSearch}>Rechercher</button>
                </div>
            </section>

            <div className="floor-plan">
                <div className="zone" style={{ top: '5%', left: '40%' }}><i className="fa-solid fa-gamepad"></i>PlayLand</div>
                <div className="zone" style={{ top: '60%', left: '41%' }}>
                    <svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512" version="1.1" sodipodi:docname="table-picnic.svg">
                        <defs id="defs1" />
                        <path d="M23.876,18.903l-1.691-3.903h.315c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5h-1.615l-2.6-6h1.215c.828,0,1.5-.672,1.5-1.5s-.672-1.5-1.5-1.5H4.5c-.828,0-1.5,.672-1.5,1.5s.672,1.5,1.5,1.5h1.215l-2.6,6H1.5c-.828,0-1.5,.672-1.5,1.5s.672,1.5,1.5,1.5h.315L.124,18.903c-.33,.761,.02,1.644,.779,1.973,.194,.085,.396,.124,.596,.124,.58,0,1.132-.338,1.377-.903l2.209-5.097h13.831l2.209,5.097c.245,.565,.797,.903,1.377,.903,.199,0,.401-.039,.596-.124,.76-.329,1.109-1.212,.779-1.973ZM6.385,12l2.6-6h6.031l2.6,6H6.385Z" id="path1" />
                    </svg>
                    Salle</div>
                <div className="zone" style={{ top: '60%', left: '65.5%' }}><i className="fa-solid fa-receipt"></i> Bornes</div>

                {/* Comptoirs */}
                <div className="counter"><i className="fa-solid fa-bell-concierge"></i> Comptoir</div>

                {/* Couleurs */}
                <div className="zone-hover playland" style={{ height: '17%' }}></div>
                <div className="zone-hover sas" style={{ height: '21%', top: '17%', backgroundColor: '#7b2cbf' }}></div>
                <div className="zone-hover lobby" style={{ height: '62%', top: '38%', backgroundColor: '#e63946' }}></div>
                <div className="zone-hover bornes" style={{ width: '16%', height: '20%', top: '55%', left: '62%', backgroundColor: '#457b9d' }}></div>

                {/* Entrées */}
                <div className="door" style={{ top: '80%', left: '0' }}><i className="fa-solid fa-door-open"></i> Porte</div>
                <div className="door" style={{ top: '27%', right: '0' }}>Porte <i className="fa-solid fa-door-open right"></i></div>
                <div className="door" style={{ top: '27%', left: '0' }}><i className="fa-solid fa-door-open"></i> Porte</div>
                <div className="door" style={{ top: '5%', left: '0' }}><i className="fa-solid fa-door-open"></i> Porte</div>

                {/* Poubelles */}
                <div className="trash" style={{ top: '72%', left: '5%' }}><i className="fa-solid fa-trash-can"></i> Poubelle</div>
                <div className="trash" style={{ top: '40%', right: '35%' }}><i className="fa-solid fa-trash-can"></i> Poubelle</div>
                <div className="trash" style={{ top: '11%', right: '20%', transform: 'rotate(-90deg)' }}><i className="fa-solid fa-trash-can"></i> Poubelle</div>

                {/* Séparateurs */}
                <div className="dividor" style={{ top: '17%', width: '920px' }}></div>
                <div className="dividor" style={{ top: '17%', width: '150px', right: '0' }}></div>
                <div className="dividor" style={{ top: '38%', width: '800px' }}></div>
                <div className="dividor" style={{ top: '37%', width: '150px', right: '0' }}></div>
                <div className="dividor" style={{ top: '78%', width: '400px', left: '20%', backgroundColor: 'transparent', border: '2px dashed #999' }}></div>

                <div className="dividor-v" style={{ top: '65%', left: '50%', width: '300px' }}></div>
                <div className="dividor-v" style={{ top: '65%', left: '65%', width: '300px' }}></div>

                {/* Tables */}
                {tablesData.map(table => (
                    <div
                        key={table.id}
                        className={`table ${table.shape} ${highlightedId === table.id ? 'blink' : ''}`}
                        style={{ left: `${table.x}%`, top: `${table.y}%` }}
                    >
                        <strong>{table.numbers.join(' ')}</strong>
                    </div>
                ))}
            </div>
            {error && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480L40 480c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24l0 112c0 13.3 10.7 24 24 24s24-10.7 24-24l0-112c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                        </svg>
                        <p>{error}</p>
                        <button onClick={() => setError(null)}>OK</button>
                    </div>
                </div>
            )}
        </main>
    );
}