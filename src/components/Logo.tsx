import logo from '../assets/images/logo.svg';

type Props = {}

const Logo = (props: Props) => {
    return (
        <img src={logo} alt="jobhunter logo" className='logo' />
    )
}

export default Logo