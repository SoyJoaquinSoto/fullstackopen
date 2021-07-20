import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleChange = (e) => {
		setNewName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		setPersons([...persons, { name: newName }]);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons &&
					persons.map((person) => <p key={person.name}>{person.name}</p>)}
			</div>
		</div>
	);
};

export default App;
