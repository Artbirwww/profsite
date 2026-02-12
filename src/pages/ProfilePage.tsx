import { FC } from "react";
import { PersonalInformation } from "../components/profilePageComponents/PersonalInformation";

export const ProfilePage: FC = ({ }) => {
    return (
        <div className="profile-wrapper">
            <PersonalInformation />
        </div>
    )
}