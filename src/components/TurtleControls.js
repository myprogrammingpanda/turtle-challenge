import React, { useState } from 'react';
import axios from 'axios';

const TurtleControls = () => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [direction, setDirection] = useState('NORTH');
    const [report, setReport] = useState('');
    const [error, setError] = useState('');

    const handlePlace = async () => {
        try {
            setError(''); //
            await axios.post('https://localhost:7045/api/turtle/place', null, {
                params: { x, y, direction }
            });
            setReport(`Turtle placed at (${x}, ${y}) facing ${direction}`);
        } catch (err) {
            handleError(err);
        }
    };

    const handleMove = async () => {
        try {
            setError(''); 
            await axios.post('https://localhost:7045/api/turtle/move');
            setReport('Turtle moved.');
        } catch (err) {
            handleError(err);
        }
    };

    const handleLeft = async () => {
        try {
            setError(''); 
            await axios.post('https://localhost:7045/api/turtle/left');
            setReport('Turtle turned left.');
        } catch (err) {
            handleError(err);
        }
    };

    const handleRight = async () => {
        try {
            setError('');
            await axios.post('https://localhost:7045/api/turtle/right');
            setReport('Turtle turned right.');
        } catch (err) {
            handleError(err);
        }
    };

    const handleReport = async () => {
        try {
            setError('');
            const response = await axios.get('https://localhost:7045/api/turtle/report');
            setReport(`Position: (${response.data.x}, ${response.data.y}), Facing: ${response.data.facing}`);
        } catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        if (err.response) {
            setError(`Error: ${err.response.data}`);
        } else if (err.request) {
            setError('Error: No response from server. Please try again later.');
        } else {
            setError(`Error: ${err.message}`);
        }
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
            {report && <div><h3>{report}</h3></div>}
            {error && <div style={{ color: 'red' }}><h4>{error}</h4></div>}
        </div>
    );
};

export default TurtleControls;