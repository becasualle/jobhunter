import main from '../assets/images/main.svg';
import styled from "styled-components";
import { Logo } from '../components';
import { Link } from 'react-router-dom';

type Props = {}

const Landing = (props: Props) => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>Messenger bag air plant shoreditch tumblr lo-fi keytar lyft, pitchfork activated charcoal gluten-free street art twee tbh normcore. Disrupt hell of thundercats quinoa, activated charcoal salvia photo booth master cleanse tattooed put a bird on it pitchfork kitsch vice. </p>
                    <Link to='/register' className="btn btn-hero">Login/Register</Link>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: var(--nav-height);
        display: flex;
        align-items: center;
    }

    .page {
        min-height: calc(100vh - var(--nav-height));
        display: grid;
        align-items: center;
        margin-top:-3rem;

        @media (min-width: 992px){
            grid-template-columns: 1fr 1fr;
            column-gap: 3rem;
        }
    }
    
    h1 {
        font-weight: 700;
        
        span {
            color: var(--primary-500);
        }
    }

    p {
        color: var(--grey-600);
    }

    .main-img {
        display: none;
        @media (min-width: 992px){
            display: block;
        }
    }
`

export default Landing