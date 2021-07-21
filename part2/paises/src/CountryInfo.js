import React from "react";
import WeatherInfo from "./WeatherInfo";

function CountryInfo({ country }) {
	return (
		<div>
			<h1>{country.name}</h1>
			<p>capital {country.capital}</p>
			<p>population {country.population}</p>
			<h2>languages</h2>
			<ul>
				{country.languages &&
					country.languages.map((language) => (
						<li key={language.iso639_1}>{language.name}</li>
					))}
			</ul>
			<img src={country.flag} alt={`Flag of ${country.name}`} width="200px" />

			<WeatherInfo city={country.capital} country={country.name} />
		</div>
	);
}

export default CountryInfo;
