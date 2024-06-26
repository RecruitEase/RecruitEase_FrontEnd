import React from 'react';
import ProfileImage from "@/components/candidateProfile/profileImage";
import PersonalDetails from "@/components/candidateProfile/personalDetails";


const profileData = {
    name: "Sajith Bandara",
    thumbnail: "I'm c Product Designer based in Dallas.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpaY0tF99xM90L3_GHqKLapOUSu70Nu3iozdE20Qdvo7aHF5P65_nb2n2Ww&s"
}


const Profile = () => {
    return (
        <div>
            <div className={"pb-4"}><ProfileImage profileData={profileData}/></div>
            <div><PersonalDetails></PersonalDetails></div>
        </div>
    );
};

export default Profile;