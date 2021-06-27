import React, { useState } from "react";
import ReactDOM from "react-dom";

const Section = ({ title }) => {
	return <h1>{title}</h1>;
};

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Estadistica = ({ text, data }) => {
	return (
		<p>
			{text} {data}
		</p>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	const getReviewTotal = () => {
		return [good, neutral, bad].reduce((acum, review) => acum + review);
	};

	const getReviewAverage = () => {
		const total = getReviewTotal();
		return (good - bad) / total;
	};

	const getReviewPercentage = (review) => {
		const total = getReviewTotal();
		return `${(review / total) * 100} %`;
	};

	if (!(good || neutral || bad)) {
		return <p>No feedback give</p>;
	}

	return (
		<section>
			<Section title="statistics" />
			<div>
				<Estadistica text="good" data={good} />
				<Estadistica text="neutral" data={neutral} />
				<Estadistica text="bad" data={bad} />
				<Estadistica text="all" data={getReviewTotal()} />
				<Estadistica text="average" data={getReviewAverage()} />
				<Estadistica text="positive" data={getReviewPercentage(good)} />
			</div>
		</section>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<section>
				<Section title="give feedback" />
				<div>
					<Button text="good" handleClick={() => setGood(good + 1)} />
					<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
					<Button text="bad" handleClick={() => setBad(bad + 1)} />
				</div>
			</section>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
