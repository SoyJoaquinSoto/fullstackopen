import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherInfo({ city, country }) {
	const [weather, setWeather] = useState({});

	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${city},${country}`
			)
			.then((response) => setWeather(response.data.current));
	}, [city, country]);

	return (
		<div>
			<h2>Weather in {city}</h2>
			<p>
				<b>temperature:</b> {weather.temperature} Celcius
			</p>
			<p>
				<b>wind:</b> {weather.wind_speed} km/h direction {weather.wind_dir}
			</p>
		</div>
	);
}

export default WeatherInfo;
