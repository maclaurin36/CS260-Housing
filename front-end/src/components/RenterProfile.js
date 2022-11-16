import { useState, useEffect } from 'react';
import './RenterProfile.css';
import Toggle from '../components/Toggle/Toggle.js';
import axios from 'axios';

const RenterProfile = (props) => {
    const [profile, setProfile] = useState({});
    const [ownedListings, setOwnedListings] = useState("");
    const [file, setFile] = useState(null);

    let removeSelf = props.removeSelf;
    let notify = props.notify;

    useEffect(() => {
        const getOwned = async () => {
            let response = await axios.get('/api/renterListings/' + props.profile.id);
            let locations = response.data.listings.map((listing) => listing.location);
            setOwnedListings(locations.join(', '));
        };

        if (props.profile.id !== null && props.profile.id !== undefined) {
            getOwned();
        }

        let date = new Date(props.profile.desiredMoveInDate);
        props.profile.formattedDate = date.toLocaleDateString();
        setProfile(props.profile);
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
            profile.photo = await fileUploadHandler();
            setFile(null);
        }

        if (profile.isNew) {
            await axios.post('/api/renters', {
                desiredMoveInDate: profile.desiredMoveInDate,
                name: profile.name,
                age: profile.age,
                isMarried: profile.isMarried,
                lowerPriceRange: profile.lowerPriceRange,
                upperPriceRange: profile.upperPriceRange,
                photo: profile.photo
            });

        }
        else {
            await axios.put('/api/renters/' + profile.id, {
                desiredMoveInDate: profile.desiredMoveInDate,
                name: profile.name,
                age: profile.age,
                isMarried: profile.isMarried,
                lowerPriceRange: profile.lowerPriceRange,
                upperPriceRange: profile.upperPriceRange,
                photo: profile.photo
            });
        }
        notify();
    };

    const deleteItem = async () => {
        try {
            if (profile.isNew === undefined) {
                await axios.delete("/api/renters/" + profile.id);
            }
        }
        catch (exception) {
            console.log(exception);
        }
        removeSelf(profile);
    };

    const handleNameChange = (e) => {
        let newProfile = profile;
        newProfile.name = e.target.value;
        setProfile(newProfile);
    };

    const handleAgeChange = (e) => {
        let newProfile = profile;
        newProfile.age = parseInt(e.target.value, 10);
        setProfile(newProfile);
    };

    const handleIsMarriedChange = (isMarried) => {
        let newProfile = profile;
        newProfile.isMarried = isMarried;
        setProfile(newProfile);
    };

    const handleLowerPriceRangeChange = (e) => {
        let newProfile = profile;
        newProfile.lowerPriceRange = parseFloat(e.target.value);
        setProfile(newProfile);
    };

    const handleUpperPriceRangeChange = (e) => {
        let newProfile = profile;
        newProfile.upperPriceRange = parseFloat(e.target.value);
        setProfile(newProfile);
    };

    const handleDesiredMoveInDateChange = (e) => {
        let newProfile = profile;
        newProfile.desiredMoveInDate = new Date(e.target.value);
        setProfile(newProfile);
    };

    const fileSelectedHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const formatFileName = () => {
        if (file !== null && file !== undefined) {
            return " - " + file.name;
        }
        return "";
    };

    const getImageUrl = () => {
        if (profile.photo !== undefined) {
            return "http://ec2-50-18-81-167.us-west-1.compute.amazonaws.com/housing/front-end/src/images/" + profile.photo;
        }
        return "";
    };

    return (
        <div class="profile-card">
            <h1>{profile.name}</h1>
            <div class="image-info-container">
                <div class="image-container">
                    <img class="profile-card-image" src={getImageUrl()} alt={profile.photo} />
                    <label class="image-selector">
                        Change Image {formatFileName()}
                        <input id="profile-image" type="file" onChange={fileSelectedHandler}/>
                    </label>
                </div>
                <ul class="profile-card-info">
                    <li>
                        <span class="label">Name: </span>
                        <input type="test" class="value" defaultValue={profile.name} onChange={(e) => handleNameChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Age: </span>
                        <input type="text" class="value" defaultValue={profile.age} onChange={(e) => handleAgeChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Is Married: </span>
                        <Toggle isChecked={props.profile.isMarried} notify={handleIsMarriedChange}/>
                    </li>
                    <li>
                        <span class="label">Lower Price Range: </span>
                        <input type="text" class="value" defaultValue={profile.lowerPriceRange} onChange={(e) => handleLowerPriceRangeChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Upper Price Range: </span>
                        <input type="text" class="value" defaultValue={profile.upperPriceRange} onChange={(e) => handleUpperPriceRangeChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Desired Move-in Date: </span>
                        <input type="text" class="value" defaultValue={profile.formattedDate} onChange={(e) => handleDesiredMoveInDateChange(e)}/>
                    </li>
                    <li>
                        <span class="label">Listings rented: </span>
                        <span class="listings-rented">{ownedListings}</span>
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

export default RenterProfile;
