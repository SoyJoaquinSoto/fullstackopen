import React from "react";

const Persons = ({ persons, nameFilter, deletePerson }) => {
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
							<button onClick={() => deletePerson(person.id)}>delete</button>
						</p>
					))}
		</div>
	);
};

export default Persons;
