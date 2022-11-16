import HomeListing from "../../components/HomeListing.js";
import './Listings.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import { v4 as uuidv4 } from 'uuid';

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
    
    const createListing = () => {
        let newListing = {
            id: uuidv4(),
            availabilityDate: new Date("01/01/2000"),
            location: "",
            housingType: "",
            price: 0,
            numBedrooms: 0,
            numBathrooms: 0,
            hasParking: false,
            photo: "Logo.png",
            renterId: null,
            isNew: true
        };
        let newListingList = listings.slice();
        newListingList.push(newListing);
        setListings(newListingList);
    };
    
    const removeListing = (listing) => {
        let listingIndex = listings.find(storedListing => storedListing.id === listing.id);
        let newListingList = listings.slice(listingIndex, -1);
        setListings(newListingList);
    }

    return (
        <div class="page-container">
            <h1>Apartment Listings</h1>
            <div class="listings-container">
                {
                    listings.map( (listing) => (<HomeListing key={listing.id} listing={listing} removeSelf={removeListing} notify={getListings}/>))
                }
            </div>
            <button class="add-listing-button" onClick={() => createListing()}>Add Listing</button>
        </div>
    );
};

export default Listings;
