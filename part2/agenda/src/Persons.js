import React from "react";

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

export default Persons;
