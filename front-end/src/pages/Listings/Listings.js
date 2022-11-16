import HomeListing from "../../components/HomeListing.js";
import './Listings.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';

const Listings = () => {
    const [listings, setListings] = useState([]);
    const [file, setFile] = useState(null);

    const getListings = async () => {
        try {
            let result = await axios.get("/api/listings");
            setListings(result.data.listings);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getListings();
    }, []);

    return (
        <>
        <h1>Apartment Listings</h1>
        <div class="listings-container">
            {
                listings.map( (listing) => (<HomeListing key={listing.id} listing={listing}/>))
            }
        </div>
        </>
    );
};

export default Listings;
