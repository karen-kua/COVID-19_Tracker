import React, { useState, useEffect } from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchCountries, fetchDailyData } from './api';
import coronaImg from './images/covid19tracker.png';

const App = () => {
    const [data, setData] = useState({});
    const [allCountriesData, setAllCountriesData ] = useState([]);
    const [country, setCountry] = useState('');
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setData(await fetchData());
            setAllCountriesData(await fetchCountries());
            setDailyData(await fetchDailyData())
        }
        fetchInitialData();
    }, [])

    const handleCountryChange = async country => {
        setData(await fetchData(country));
        setCountry(country);
    }

    return (
        <div className={styles.container}>
             <img 
                className={styles.image} 
                src={coronaImg} 
                alt='COVID-19'
            />
             <Cards 
                data={data}
            />
             <CountryPicker 
                allCountriesData={allCountriesData}
                handleCountryChange={handleCountryChange}
            />
             <Chart
                data={data} 
                dailyData={dailyData}
                country={country}
            />
        </div>
    )
}
export default App;