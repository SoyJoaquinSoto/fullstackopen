import React from "react";

const Finder = ({ handleChange }) => {
	return (
		<div>
			find countries
			<input onChange={handleChange} />
		</div>
	);
};

export default Finder;
