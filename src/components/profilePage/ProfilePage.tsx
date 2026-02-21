import "./css/profilePageStyle.css"
import { FC } from "react";
import { PersonalInformation } from "./PersonalInformation";

export const ProfilePage: FC = ({ }) => {
    return (
        <div className="profile-wrapper">
            <PersonalInformation />
        </div>
    )
}