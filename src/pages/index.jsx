import { useState } from 'react';

const tablesData = [
    { id: 1, numbers: [101, 102], x: 10, y: 20 },
    { id: 2, numbers: [103], x: 30, y: 20 },
    { id: 3, numbers: [104], x: 50, y: 20 },
    { id: 4, numbers: [105, 106], x: 30, y: 50 },
];

export const Home = () => {
    const [search, setSearch] = useState('');
    const [highlightedId, setHighlightedId] = useState(null);

    const handleSearch = () => {
        const num = parseInt(search);
        const table = tablesData.find(t => t.numbers.includes(num));
        if (table) {
            setHighlightedId(table.id);
            setTimeout(() => setHighlightedId(null), 3000);
        } else {
            setHighlightedId(null);
        }
    };

    return (
        <div className="app">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Numéro de table"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Rechercher</button>
            </div>

            <div className="floor-plan">
                {tablesData.map(table => (
                    <div
                        key={table.id}
                        className={`table ${highlightedId === table.id ? 'blink' : ''}`}
                        style={{ left: `${table.x}%`, top: `${table.y}%` }}
                    >
                        <strong>Table {table.id}</strong>
                        <p>{table.numbers.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}