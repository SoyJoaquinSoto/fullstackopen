import React, { useState } from "react";
import ReactDOM from "react-dom";

const Section = ({ title }) => {
	return <h1>{title}</h1>;
};

const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

const Review = ({ text, counter }) => {
	return (
		<p>
			{text} {counter}
		</p>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<Section title="give feedback" />
			<div>
				<Button text="good" handleClick={() => setGood(good + 1)} />
				<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
				<Button text="bad" handleClick={() => setBad(bad + 1)} />
			</div>
			<Section title="statistics" />
			<div>
				<Review text="good" counter={good} />
				<Review text="neutral" counter={neutral} />
				<Review text="bad" counter={bad} />
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
