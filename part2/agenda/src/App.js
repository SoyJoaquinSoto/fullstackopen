import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import services from "./services";
import Notification from "./Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const [nameFilter, setNameFilter] = useState("");
	const [notification, setNotification] = useState({ message: "", type: "" });

	useEffect(() => {
		services.getAll().then((response) => {
			setPersons(response);
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

		const selectedPerson = persons.find(
			(person) => person.name === newPerson.name
		);

		if (selectedPerson) {
			if (
				window.confirm(
					`${selectedPerson.name} is already added to the phonebook, replace the old number with a new one?`
				)
			) {
				services
					.update(selectedPerson.id, newPerson)
					.then((returnedPerson) => {
						setPersons(
							persons.map((person) =>
								person.id === returnedPerson.id ? returnedPerson : person
							)
						);
						setNotification({
							message: `Updated ${newPerson.name}`,
							type: "success",
						});
						setTimeout(() => setNotification({ message: "", type: "" }), 2000);
						setNewPerson({ name: "", number: "" });
					})
					.catch((error) => {
						setPersons(
							persons.filter((person) => person.id !== selectedPerson.id)
						);
						setNotification({
							message: `Information of ${selectedPerson.name} has already been removed from the server`,
							type: "error",
						});
						setTimeout(() => setNotification({ message: "", type: "" }), 2000);
					});
			}
			return;
		}

		setPersons([...persons, newPerson]);
		services.create(newPerson).then((response) => {
			setPersons([...persons, response]);
			setNotification({
				message: `Added ${newPerson.name}`,
				type: "success",
			});
			setTimeout(() => setNotification({ message: "", type: "" }), 2000);
			setNewPerson({ name: "", number: "" });
		});
	};

	const deletePerson = (selectedPerson) => {
		if (window.confirm(`Seguro que desea eliminar a ${selectedPerson.name}`)) {
			services
				.remove(selectedPerson.id)
				.then(
					setPersons(
						persons.filter((person) => person.id !== selectedPerson.id)
					)
				);
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification notification={notification} />
			<Filter nameFilter={nameFilter} handleChange={handleNameFilterChange} />

			<h2>add a new</h2>
			<PersonForm
				handleSubmit={handleSubmit}
				newPerson={newPerson}
				handleChange={handlePersonChange}
			/>

			<h2>Numbers</h2>
			<Persons
				persons={persons}
				nameFilter={nameFilter}
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
