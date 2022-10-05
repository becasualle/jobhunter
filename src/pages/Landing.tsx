import React from 'react'
import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';

type Props = {}

const Landing = (props: Props) => {
    return (
        <main>
            <nav>
                <img src={logo} alt="jobhunter logo" className='logo' />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>job <span>tracking</span> app</h1>
                    <p>Messenger bag air plant shoreditch tumblr lo-fi keytar lyft, pitchfork activated charcoal gluten-free street art twee tbh normcore. Disrupt hell of thundercats quinoa, activated charcoal salvia photo booth master cleanse tattooed put a bird on it pitchfork kitsch vice. </p>
                    <button className="btn btn-hero">Login/Register</button>
                </div>
                <img src={main} alt="job hunt" className='img main-img' />
            </div>
        </main>
    )
}

export default Landing