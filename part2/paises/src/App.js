import axios from "axios";
import { useEffect, useState } from "react";

const Finder = ({ handleChange }) => {
	return (
		<div>
			find countries
			<input onChange={handleChange} />
		</div>
	);
};

const Countries = ({ countries, handleClick }) => {
	if (!countries) {
		return <></>;
	}

	if (countries.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		);
	}

	if (countries.length === 1) {
		return (
			<div>
				<h1>{countries[0].name}</h1>
				<p>capital {countries[0].capital}</p>
				<p>population {countries[0].population}</p>
				<h2>languages</h2>
				<ul>
					{countries[0].languages &&
						countries[0].languages.map((language) => (
							<li key={language.iso639_1}>{language.name}</li>
						))}
				</ul>
				<img
					src={countries[0].flag}
					alt={`Flag of ${countries[0].name}`}
					width="200px"
				/>
			</div>
		);
	}

	return (
		<ul>
			{countries.map((country) => (
				<li key={country.numericCode}>
					{country.name}
					<button onClick={() => handleClick(country.numericCode)}>show</button>
				</li>
			))}
		</ul>
	);
};

function App() {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		axios
			.get("https://restcountries.eu/rest/v2/all")
			.then((response) => setCountries(response.data));
	}, []);

	const handleChange = (e) => {
		if (!e.target.value) {
			setFilteredCountries([]);
			return;
		}

		setFilteredCountries(
			countries.filter((country) =>
				country.name.toUpperCase().includes(e.target.value.toUpperCase())
			)
		);
	};

	const handleClick = (countryCode) => {
		setFilteredCountries(
			countries.filter((country) => country.numericCode === countryCode)
		);
	};

	return (
		<div>
			<Finder handleChange={handleChange} />
			<Countries countries={filteredCountries} handleClick={handleClick} />
		</div>
	);
}

export default App;
