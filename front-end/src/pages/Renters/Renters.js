import HomeListing from "../../components/RenterProfile.js";
import './Renters.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Renters = () => {
    const [profiles, setProfiles] = useState([]);

    const getProfiles = async () => {
        try {
            let result = await axios.get("/api/renters");
            setProfiles(result.data.renters);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfiles();
    }, []);
    
    const createProfile = () => {
        let newProfile = {
            id: uuidv4(),
            name: "",
            age: 0,
            isMarried: false,
            lowerPriceRange: 0,
            uppperPriceRange: 0,
            desiredMoveInDate: Date(),
            photo: "Logo.png",
            isNew: true
        };
        let newProfileList = profiles.slice();
        newProfileList.push(newProfile);
        setProfiles(newProfileList);
    };
    
    const removeProfile = (profile) => {
        let profileIndex = profiles.indexOf(profiles.find(storedProfile => storedProfile.id === profile.id));
        profiles.splice(profileIndex, 1);
        let newProfiles = profiles.slice();
        setProfiles(newProfiles);
    };

    return (
        <div class="page-container">
            <h1>Renter Profiles</h1>
            <div class="profiles-container">
                {
                    profiles.map( (profile) => (<HomeListing key={profile.id} profile={profile} removeSelf={removeProfile} notify={getProfiles}/>))
                }
            </div>
            <button class="add-profile-button" onClick={() => createProfile()}>Add Profile</button>
        </div>
    );
};

export default Renters;
