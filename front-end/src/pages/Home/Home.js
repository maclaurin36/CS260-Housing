import { useContext } from 'react';
import { authContext } from '../../components/AuthProvider/AuthProvider.js'; 
import './Home.css';

const Home = () => {
    let { username } = useContext(authContext);
    return (
        <div class="home-content">
            <div class="centered-content">
                <img class="logo element-to-fade-in-and-out" src="http://ec2-50-18-81-167.us-west-1.compute.amazonaws.com/housing/front-end/src/images/Logo.png" alt="logo"/>
                <div class="description-content">
                    <h1>Welcome {username !== "" ? username + "!": "to Home Finder!"}</h1>
                    <p class="description">
                        At Home Finder, we aim to make the place you live your home! Our goal is to find rentals in your area
                        and connect you to those rentals. We track rental information such as whether parking is available, where the rental is located,
                        and how much it costs. We also have renter profiles so that renters can decide who they want to rent to.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;