import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [nameFilter, setNameFilter] = useState("");

	const handleNameChange = (e) => {
		setNewName(e.target.value);
	};

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleNameFilterChange = (e) => {
		setNameFilter(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!newName || !newNumber) {
			return;
		}

		if (persons.find((person) => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		setPersons([...persons, { name: newName, number: newNumber }]);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter shown with:
				<input value={nameFilter} onChange={handleNameFilterChange} />
			</div>

			<h2>add a new</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
				</div>
				<div>
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<div>
				{persons &&
					persons
						.filter((person) =>
							person.name.toUpperCase().includes(nameFilter.toUpperCase())
						)
						.map((person) => (
							<p key={person.name}>
								{person.name} {person.number}
							</p>
						))}
			</div>
		</div>
	);
};

export default App;
