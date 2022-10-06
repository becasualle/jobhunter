import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import styled from "styled-components";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

type Props = {};

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = (props: Props) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((store) => store.user);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }

    if (isMember) {
      dispatch(loginUser({ email, password }));
      return;
    }

    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {/* Not display name field for registered user */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            handleChange={handleChange}
            value={values.name}
          />
        )}
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

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
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
