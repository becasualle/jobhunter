import React from 'react'
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import styled from 'styled-components';

type Props = {}

const Error = (props: Props) => {
    return (
        <Wrapper className='full-page'>
            <img src={img} alt="not found" />
            <h3>Ohh! page not found</h3>
            <p>We can't seem to find the page you're looking for</p>
            <Link to='/'>back home</Link>
        </Wrapper>
    )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }

  a {
    color: var(--primary-500);
    text-decoration: underline;
    text-transform: capitalize;
  }
`;

export default Error