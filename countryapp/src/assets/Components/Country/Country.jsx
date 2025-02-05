import { useState } from "react";
import axios from "axios";
import "./Country.css"; // Ensure you have styling for better UI

const Country = () => {
    const [input, setInput] = useState("");
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const search = (name) => {
        if (!name) return;
        setLoading(true);
        setError("");
        setCountries([]);

        axios.get(`https://restcountries.com/v3.1/name/${name}`)
            .then((response) => {
                setCountries(response.data);
                setInput("");
            })
            .catch((error) => {
                setError("No country found! Try again.");
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="country">
            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Search for a country..."
                    onKeyDown={(e) => e.key === "Enter" && search(input)}
                />
                <button onClick={() => search(input)}>Search</button>
            </div>

            {loading && <p>🔍 Searching...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="country-info">
                {countries.map((country, index) => (
                    <div key={index} className="country-card">
                        <h2>{country.name.common} ({country.cca2})</h2>
                        <img src={country.flags.png} alt={country.name.common} width="100" />
                        <p>🌍 Region: {country.region} ({country.subregion})</p>
                        <p>🏙 Capital: {country.capital?.[0] || "N/A"}</p>
                        <p>👥 Population: {country.population.toLocaleString()}</p>
                        <p>🗣 Languages: {Object.values(country.languages || {}).join(", ")}</p>
                        <p>💰 Currency: {Object.values(country.currencies || {}).map(c => c.name).join(", ")}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Country;
