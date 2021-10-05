import React, { useState, useEffect } from "react";
import "./app.css";
import Joi from "joi-browser";
import Input from "./input";

const schema = {
	firstName: Joi.string().required().label("First Name"),
	secondName: Joi.string().required().label("Second Name"),
	email: Joi.string().email().required().label("Email"),
	password: Joi.string().min(5).required().label("Password"),
};
const App = () => {
	const [credentials, setCredentials] = useState({
		firstName: "",
		secondName: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(credentials, schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	const validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const propertySchema = { [name]: schema[name] };
		const { error } = Joi.validate(obj, propertySchema);
		return error ? error.details[0].message : null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const error = validate();
		if (error) setErrors(error);
		if (errors) return;
		alert("form submitted successfully");
	};

	const handleChange = ({ currentTarget: input }) => {
		const error = { ...errors };
		const errorMessage = validateProperty(input);
		if (errorMessage) error[input.name] = errorMessage;
		else delete error[input.name];
		const credential = { ...credentials };
		credential[input.name] = input.value;
		setCredentials(credential);
		setErrors(error);
	};
	const handleClassName = (name) => {
		if (errors && errors[name]) return "error";
		return "";
	};
	return (
		<div className="container">
			<div className="form-container">
				<h1 className="sign-header">Sign Up</h1>
				<form>
					<Input
						type="text"
						name="firstName"
						value={credentials["firstName"]}
						placeholder="First Name"
						handleClassName={handleClassName}
						onChange={handleChange}
						required
						errors={errors}
					/>
					<Input
						type="text"
						name="secondName"
						value={credentials["secondName"]}
						placeholder="Last Name"
						handleClassName={handleClassName}
						onChange={handleChange}
						required
						errors={errors}
					/>
					<Input
						type="email"
						name="email"
						value={credentials["email"]}
						placeholder="Email"
						className={`sign sign-email ${handleClassName("email")}`}
						onChange={handleChange}
						required
						handleClassName={handleClassName}
						errors={errors}
					/>
					<Input
						type="password"
						name="password"
						value={credentials["password"]}
						placeholder="Password"
						className={`sign sign-password ${handleClassName("password")}`}
						onChange={handleChange}
						handleClassName={handleClassName}
						errors={errors}
						required
					/>
					<button type="submit" onClick={handleSubmit}>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default App;
