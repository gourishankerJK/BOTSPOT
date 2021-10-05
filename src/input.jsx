import React from "react";

const Input = ({ name, errors, handleClassName, ...rest }) => {
	return (
		<React.Fragment>
			<input
				{...rest}
				name={name}
				id={name}
				className={`sign sign-secondName ${handleClassName(name)}`}
			/>
			{errors[name] && <div className="error-message">{errors[name]}</div>}
		</React.Fragment>
	);
};

export default Input;
