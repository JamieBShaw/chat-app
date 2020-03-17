import React from 'react';
import { Form } from 'semantic-ui-react';

const Login = () => {
  const loading = false;
  const onSubmit = () => {};
  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate loading={loading}>
        <h3 className='page-title'>Login</h3>
        <Form.Input label='Username or Email' />
      </Form>
    </div>
  );
};

export default Login;
