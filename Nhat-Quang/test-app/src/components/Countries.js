import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(40);
    const [selectedRadio, setSelectedRalio] = useState("");
    const radios = ["Africa", "Europe", "Asia", "America", "Oceania"];

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name&fields=population&fields=region&fields=capital&fields=flag')
            .then((res) => {
                setData(res.data);
            });
    }, []);

    return (
        <div className='countries'>
            <div className='sort-container'>
                <input type="range" min="0" max="250" value={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />
                <ul>
                    {radios.map((radio) => {
                        return (
                            <li key={radio}>
                                <input type="radio" value={radio} id={radio}
                                    checked={radio === selectedRadio} onChange={(e) =>
                                        setSelectedRalio(e.target.value)} />
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='cancel'>
                {selectedRadio && <h5 onClick={() => setSelectedRalio("")}>Cancel selected</h5>}
            </div>
            <ul className='countries-list'>
                {data
                    .filter((country) => country.region.includes(selectedRadio))
                    .sort((a, b) => b.population - a.population)
                    .filter((country, index) => index < rangeValue)
                    .map((country) => (
                        <Card country={country} key={country.name} />
                    ))}
            </ul>
        </div>
    );
};

export default Countries;