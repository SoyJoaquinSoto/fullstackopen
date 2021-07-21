import axios from "axios";
import { useEffect, useState } from "react";
import Finder from "./Finder";
import Countries from "./Countries";

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
