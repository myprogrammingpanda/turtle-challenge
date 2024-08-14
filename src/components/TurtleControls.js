import React, { useState } from 'react';
import axios from 'axios';

const TurtleControls = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [direction, setDirection] = useState('NORTH');
    const [report, setReport] = useState('');

    const handlePlace = async () => {
        await axios.post('https://localhost:7045/api/turtle/place', null, {
            params: { x, y, direction }
        });
    };

    const handleMove = async () => {
        await axios.post('https://localhost:7045/api/turtle/move');
    };

    const handleLeft = async () => {
        await axios.post('https://localhost:7045/api/turtle/left');
    };

    const handleRight = async () => {
        await axios.post('https://localhost:7045/api/turtle/right');
    };

    const handleReport = async () => {
        const response = await axios.get('https://localhost:7045/api/turtle/report');
        setReport(`Position: (${response.data.x}, ${response.data.y}), Facing: ${response.data.facing}`);
    };

    return (
        <div>
            <div>
                <label>X:</label>
                <input type="number" value={x} onChange={e => setX(e.target.value)} />
                <label>Y:</label>
                <input type="number" value={y} onChange={e => setY(e.target.value)} />
                <label>Direction:</label>
                <select value={direction} onChange={e => setDirection(e.target.value)}>
                    <option value="NORTH">NORTH</option>
                    <option value="EAST">EAST</option>
                    <option value="SOUTH">SOUTH</option>
                    <option value="WEST">WEST</option>
                </select>
                <button onClick={handlePlace}>Place</button>
            </div>
            <div>
                <button onClick={handleMove}>Move</button>
                <button onClick={handleLeft}>Left</button>
                <button onClick={handleRight}>Right</button>
                <button onClick={handleReport}>Report</button>
            </div>
            <div>
                <h3>{report}</h3>
            </div>
        </div>
    );
};

export default TurtleControls;