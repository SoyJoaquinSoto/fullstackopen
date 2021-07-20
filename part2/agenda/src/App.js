import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const [nameFilter, setNameFilter] = useState("");

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then((response) => {
			setPersons(response.data);
		});
	}, []);

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
