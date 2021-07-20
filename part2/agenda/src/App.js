import React, { useState } from "react";

const Filter = ({ nameFilter, handleChange }) => {
	return (
		<div>
			filter shown with:
			<input value={nameFilter} onChange={handleChange} />
		</div>
	);
};

const PersonForm = ({ handleSubmit, newPerson, handleChange }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name:{" "}
				<input name="name" value={newPerson.name} onChange={handleChange} />
			</div>
			<div>
				number:{" "}
				<input name="number" value={newPerson.number} onChange={handleChange} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

const Persons = ({ persons, nameFilter }) => {
	return (
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
	);
};

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456" },
		{ name: "Ada Lovelace", number: "39-44-5323523" },
		{ name: "Dan Abramov", number: "12-43-234345" },
		{ name: "Mary Poppendieck", number: "39-23-6423122" },
	]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const [nameFilter, setNameFilter] = useState("");

	const handlePersonChange = (e) => {
		setNewPerson({ ...newPerson, [e.target.name]: e.target.value });
	};

	const handleNameFilterChange = (e) => {
		setNameFilter(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!newPerson.name || !newPerson.number) {
			return;
		}

		if (persons.find((person) => person.name === newPerson.name)) {
			alert(`${newPerson.name} is already added to phonebook`);
			return;
		}

		setPersons([...persons, newPerson]);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter nameFilter={nameFilter} handleChange={handleNameFilterChange} />

			<h2>add a new</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				newPerson={newPerson}
				handleChange={handlePersonChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} nameFilter={nameFilter} />
		</div>
	);
};

export default App;
