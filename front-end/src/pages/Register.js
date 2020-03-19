import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/globalContext/auth";

import { useForm } from "../utils/useForm";

const Register = props => {
	const context = useContext(AuthContext);

	const [registerUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.register(userData);

			props.history.push("/rooms");
		},
		onError(err) {
			console.log(err);
			const {
				username,
				email,
				password,
				confirmPassword
			} = err.graphQLErrors[0].extensions.exception;
			setErrors({
				username: username,
				email: email,
				password: password,
				confirmPassword: confirmPassword
			});
		}
	});

	const [errors, setErrors] = useState({});

	const initialState = {
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	};

	const { onChange, onSubmit, values } = useForm(
		registerCallback,
		initialState
	);

	function registerCallback() {
		registerUser({
			variables: {
				username: values.username,
				email: values.email,
				password: values.password,
				confirmPassword: values.confirmPassword
			}
		});
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate loading={loading}>
				<h3 className="page-title">Create an account </h3>
				<Form.Input
					name="username"
					values={values.username}
					onChange={onChange}
					error={errors.username}
					label="Create a username"
				/>
				<Form.Input
					name="email"
					values={values.email}
					onChange={onChange}
					error={errors.email}
					label="Email address"
					type="email"
				/>
				<Form.Input
					name="password"
					values={values.password}
					onChange={onChange}
					error={errors.password}
					label="Password"
					type="password"
				/>
				<Form.Input
					name="confirmPassword"
					values={values.confirmPassword}
					onChange={onChange}
					error={errors.confirmPassword}
					label="Confirm your password"
					type="password"
				/>
				<Button positive type="submit">
					Create account
				</Button>
			</Form>
		</div>
	);
};

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			username: $username
			email: $email
			password: $password
			confirmPassword: $confirmPassword
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;
