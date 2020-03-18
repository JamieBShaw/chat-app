import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../context/globalContext/auth";

import { useForm } from "../utils/useForm";

const Login = props => {
	const context = useContext(AuthContext);

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);

			props.history.push("/");
		},
		onError(err) {
			const { username, password } = err.graphQLErrors[0].extensions.exception;
			setErrors({
				username: username,
				password: password
			});
		}
	});

	const [errors, setErrors] = useState({});

	const initialState = {
		username: "",
		password: ""
	};

	const { onChange, onSubmit, values } = useForm(loginCallback, initialState);

	function loginCallback() {
		loginUser({
			variables: {
				login: values.username,
				password: values.password
			}
		});
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate loading={loading}>
				<h3 className="page-title">Login</h3>
				<Form.Input
					name="username"
					values={values.username}
					onChange={onChange}
					error={errors.username}
					label="Username or Email"
				/>
				<Form.Input
					name="password"
					values={values.password}
					onChange={onChange}
					error={errors.password}
					label="Password"
					type="password"
				/>
				<Button positive type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
};

const LOGIN_USER = gql`
	mutation login($login: String!, $password: String!) {
		login(login: $login, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
