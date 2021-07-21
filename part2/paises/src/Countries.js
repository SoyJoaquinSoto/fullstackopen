import React from "react";
import CountryInfo from "./CountryInfo";

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
		return <CountryInfo country={countries[0]} />;
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

export default Countries;
