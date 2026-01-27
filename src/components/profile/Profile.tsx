import "./css/profile-style.css"
import "./css/personal-informations-style.css"

import { PersonalInformation } from './PersonalInformation'

export const Profile = () => {
	return (
		<div className="profile-base">
			<div className="profile-content">
				<PersonalInformation />
			</div>
		</div>
	)
}