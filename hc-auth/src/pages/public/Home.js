import './styles/Home.css';

const Home = () => {
    return (
        <div className='Home'>
            <div className='Hiro'>
                <div className='HiroContent'>
                    <h1 className='header'>HC Auth</h1>
                    <p className='subheader'>A simple authentication service for your apps.</p>
                    <div className='buttons'>
                        <a href='/login' className='button'>Get Started</a>
                        <a href='/docs' className='button-alt'>Documentation</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;