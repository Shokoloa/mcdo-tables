import { useState } from 'react';

const tablesData = [
    { id: 1, numbers: [101, 102], x: 10, y: 20, shape: 'square' },
    { id: 2, numbers: [103], x: 30, y: 20, shape: 'square' },
    { id: 3, numbers: [104], x: 50, y: 20, shape: 'round' },
    { id: 4, numbers: [105, 106], x: 30, y: 50, shape: 'rectangle' },
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
                {tablesData.map(table => (
                    <div
                        key={table.id}
                        className={`table ${table.shape} ${highlightedId === table.id ? 'blink' : ''}`}
                        style={{ left: `${table.x}%`, top: `${table.y}%` }}
                    >
                        <strong>Table {table.numbers.join(', ')}</strong>
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