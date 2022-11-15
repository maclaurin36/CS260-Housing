import HomeListing from "../../components/HomeListing.js";
import './Listings.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Listings = () => {
    const [listings, setListings] = useState([]);
    
    const getListings = async () => {
        try {
            let result = await axios.get("/api/listings");
            setListings(result.data.listings);
        }
        catch (error) {
            // TODO change this so that it actually does something (asynchronous)
            console.log(error);
        }
    };
    
    useEffect(() => {
        getListings();
    }, []);
    
    return (
        <>
        <div class="listings-container">
            {
                listings.map( (listing) => (<HomeListing key={listing.id} listing={listing}/>))
            }
        </div>
        </>
    );
};

export default Listings;