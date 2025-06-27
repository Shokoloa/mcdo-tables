import { useState } from 'react';

const tablesData = [
    // Playland
    { id: '354', numbers: [354], x: 90, y: 5, shape: 'rectangle-v' },
    { id: '361', numbers: [361], x: 70, y: 10, shape: 'square' },
    { id: '362', numbers: [362], x: 60, y: 10, shape: 'square' },
    { id: '360', numbers: [360], x: 50, y: 10, shape: 'square' },
    { id: '359', numbers: [359], x: 40, y: 10, shape: 'square' },
    { id: '358', numbers: [358], x: 30, y: 10, shape: 'square' },
    { id: '357', numbers: [357], x: 20, y: 10, shape: 'square' },
    { id: '356', numbers: [356], x: 10, y: 10, shape: 'square' },

    // Milieu gauche
    { id: '323', numbers: [323], x: 70, y: 19, shape: 'round' },
    { id: '334', numbers: [334], x: 40, y: 19, shape: 'rectangle' },
    { id: '344', numbers: [344], x: 10, y: 19, shape: 'round' },
    { id: '343', numbers: [343], x: 10, y: 30, shape: 'rectangle-vs' },
    { id: '333', numbers: [333], x: 40, y: 30, shape: 'rectangle-vs' },
    { id: '322', numbers: [322], x: 70, y: 30, shape: 'rectangle-vs' },

    // Salle gauche
    { id: '332', numbers: [332], x: 45, y: 40, shape: 'rectangle-vs' },
    { id: '342', numbers: [342], x: 35, y: 40, shape: 'rectangle-vs' },
    { id: '353', numbers: [353], x: 25, y: 40, shape: 'rectangle-vs' },
    { id: '352', numbers: [352], x: 15, y: 40, shape: 'rectangle-vs' },
    { id: '351', numbers: [351], x: 5, y: 48, shape: 'rectangle-s' },
    { id: '350', numbers: [350], x: 5, y: 53, shape: 'rectangle-s' },
    { id: '349', numbers: [349], x: 5, y: 58, shape: 'rectangle-s' },
    { id: '346', numbers: [346], x: 5, y: 63, shape: 'rectangle-s' },

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
    { id: '348', numbers: [348], x: 5, y: 89, shape: 'square' },
    { id: '300', numbers: [300], x: 5, y: 93, shape: 'square' },
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
            setTimeout(() => setHighlightedId(null), 3000);
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
                <div className="zone" style={{ top: '5%', left: '40%' }}>PlayLand</div>
                <div className="zone" style={{ top: '60%', left: '45%' }}>Salle</div>
                <div className="zone" style={{ top: '60%', left: '67%' }}>Bornes</div>

                {/* Comptoirs */}
                <div className="counter">Comptoir</div>

                {/* Entrées 
                <div className="door" style={{ top: '0%', left: '5%' }}>Entrée</div>*/}
                <div className="door" style={{ top: '27%', right: '5px' }}>Entrée</div>
                <div className="door" style={{ top: '27%', left: '5px' }}>Entrée</div>
                <div className="door" style={{ top: '5%', left: '5px' }}>Entrée</div>

                {/* Séparateurs */}
                <div className="dividor" style={{ top: '17%', width: '900px' }}></div>
                <div className="dividor" style={{ top: '17%', width: '150px', right: '0' }}></div>
                <div className="dividor" style={{ top: '38%', width: '900px' }}></div>
                <div className="dividor" style={{ top: '38%', width: '150px', right: '0' }}></div>
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
                        <strong>{table.numbers.join(', ')}</strong>
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