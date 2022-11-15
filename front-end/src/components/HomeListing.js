import { useState, useEffect } from 'react';
import './HomeListing.css';

const HomeListing = (props) => {
    let listing = props.listing;
    console.log(listing);
    
    const parkingAvailable = () => {
        if (listing.hasParking) {
            return "included";
        }
        else {
            return "unavailable";
        }
    }
    
    const isAvailable = () => {
        if (listing.renterId !== null) {
            return "SOLD";
        }
        else {
            return "Available";
        }
    }
    
    return (
        <div class="listing-card">
            <img class="listing-card-image" src="https://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Sharp_Cheddar_Slices_900x.jpg?v=1524073010" alt="cheese" />
            <ul class="listing-card-info">
                <li><span class="label">Address: </span><span class="value">{listing.location}</span></li>
                <li><span class="label">Date Available: </span><span class="value">{new Date(listing.availabilityDate).toLocaleDateString()}</span></li>
                <li><span class="label">Parking: </span><span class="value">{parkingAvailable()}</span></li>
                <li><span class="label">Number of Bathrooms: </span><span class="value">{listing.numBathrooms}</span></li>
                <li><span class="label">Number of Bedrooms: </span><span class="value">{listing.numBedrooms}</span></li>
                <li><span class="label">Price: </span><span class="value">${listing.price}</span></li>
                <li><span class="label">Status: </span><span class="value">{isAvailable()}</span></li>
            </ul>
        </div>
    );
}

export default HomeListing;