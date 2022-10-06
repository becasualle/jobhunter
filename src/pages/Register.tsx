import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import styled from "styled-components";

type Props = {};

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = (props: Props) => {
  const [values, setValues] = useState(initialState);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        <FormRow
          type="text"
          name="name"
          handleChange={handleChange}
          value={values.name}
        />
        <FormRow
          type="email"
          name="email"
          handleChange={handleChange}
          value={values.email}
        />
        <FormRow
          type="password"
          name="password"
          handleChange={handleChange}
          value={values.password}
        />

        <button type="submit" className="btn btn-block">
          submit
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
