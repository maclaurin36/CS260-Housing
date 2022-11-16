import { useState, useEffect } from 'react';
import './HomeListing.css';
import Toggle from '../components/Toggle/Toggle.js';
import Dropdown from '../components/Dropdown/Dropdown.js';
import axios from 'axios';

const HomeListing = (props) => {
    const [listing, setListing] = useState({});
    const [renters, setRenters] = useState([]);
    const [file, setFile] = useState(null);

    let removeSelf = props.removeSelf;
    let notify = props.notify;

    useEffect(() => {
        const getRenters = async () => {
            try {
                let renterList = await axios.get('/api/renters');
                setRenters(renterList.data.renters);
            }
            catch (error) {
                console.log(error);
            }
        };
        getRenters();
        let date = new Date(props.listing.availabilityDate);
        props.listing.formattedDate = date.toLocaleDateString();
        setListing(props.listing);
    }, [props]);

    const fileUploadHandler = async () => {
        let data = new FormData();
        data.append('file', file, file.name);
        try {
            let response = await axios.post("/api/imageUpload", data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            });
            return response.data.filePath;
        }
        catch (error) {
            console.log(error);
        }
    };

    const saveItem = async () => {
        if (file !== null && file !== undefined) {
            listing.photo = await fileUploadHandler();
            setFile(null);
        }
        
        if (listing.renterId === "") {
            listing.renterId = null;
        }

        if (listing.isNew) {
            await axios.post('/api/listings', {
                availabilityDate: listing.availabilityDate,
                location: listing.location,
                housingType: listing.housingType,
                price: listing.price,
                numBedrooms: listing.numBedrooms,
                numBathrooms: listing.numBathrooms,
                hasParking: listing.hasParking,
                photo: listing.photo,
                renterId: listing.renterId
            });
        
        }
        else {
            await axios.put('/api/listings/' + listing.id, {
                availabilityDate: listing.availabilityDate,
                location: listing.location,
                housingType: listing.housingType,
                price: listing.price,
                numBedrooms: listing.numBedrooms,
                numBathrooms: listing.numBathrooms,
                hasParking: listing.hasParking,
                photo: listing.photo,
                renterId: listing.renterId,
            });
        }
        notify();
    };

    const deleteItem = async () => {
        try {
            if (listing.isNew === undefined) {
                await axios.delete("/api/listings/" + listing.id);
            }
        }
        catch (exception) {
            console.log(exception);
        }
        removeSelf(listing);
    };

    const handleAddressChange = (e) => {
        let newListing = listing;
        newListing.location = e.target.value;
        setListing(newListing);
    };

    const handleDateChange = (e) => {
        let newListing = listing;
        newListing.availabilityDate = new Date(e.target.value);
        setListing(newListing);
    };

    const handleParkingChange = (hasParking) => {
        let newListing = listing;
        newListing.hasParking = hasParking;
        setListing(newListing);
    };

    const handleNumBathroomChange = (e) => {
        let newListing = listing;
        newListing.numBathrooms = parseFloat(e.target.value);
        setListing(newListing);
    };

    const handleNumBedroomChange = (e) => {
        let newListing = listing;
        newListing.numBedrooms = parseFloat(e.target.value);
        setListing(newListing);
    };

    const handlePriceChange = (e) => {
        let newListing = listing;
        newListing.price = parseFloat(e.target.value);
        setListing(newListing);
    };

    const handleAvailableChange = (renterId) => {
        if (renterId === "") {
            renterId = null;
        }
        let newListing = listing;
        newListing.renterId = renterId;
        setListing(newListing);
    };

    const fileSelectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const formatFileName = () => {
        if (file !== null && file != undefined) {
            return " - " + file.name;
        }
        return "";
    };
    
    const getImageUrl = () => {
        if (listing.photo !== undefined) {
            return "http://ec2-50-18-81-167.us-west-1.compute.amazonaws.com/housing/front-end/src/images/" + listing.photo;
        }
        return "";
    };

    return (
        <div class="listing-card">
            <h1>{listing.location}</h1>
            <div class="image-info-container">
                <div class="image-container">
                    <img class="listing-card-image" src={getImageUrl()} alt={listing.photo} />
                    <label class="image-selector">
                        Change Image {formatFileName()}
                        <input id="listing-image" type="file" onChange={fileSelectedHandler}/>
                    </label>
                </div>
                <ul class="listing-card-info">
                    <li>
                        <span class="label">Address: </span>
                        <input type="test" class="value" defaultValue={listing.location} onChange={(e) => handleAddressChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Date Available: </span>
                        <input type="text" class="value" defaultValue={listing.formattedDate} onChange={(e) => handleDateChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Parking: </span>
                        <Toggle isChecked={props.listing.hasParking} notify={handleParkingChange}/>
                    </li>
                    <li>
                        <span class="label">Number of Bathrooms: </span>
                        <input type="text" class="value" defaultValue={listing.numBathrooms} onChange={(e) => handleNumBathroomChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Number of Bedrooms: </span>
                        <input type="text" class="value" defaultValue={listing.numBedrooms} onChange={(e) => handleNumBedroomChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Price: $</span>
                        <input type="text" class="value" defaultValue={listing.price} onChange={(e) => handlePriceChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Sold To: </span>
                        <Dropdown propOptions={renters} selected={listing.renterId} notify={handleAvailableChange}/>
                    </li>
                </ul>
            </div>
            <div class="button-menu">
                <button class="save-button" onClick={saveItem}>Save</button>
                <button class="delete-button" onClick={deleteItem}>Delete</button>
            </div>
        </div>
    );
};

export default HomeListing;
