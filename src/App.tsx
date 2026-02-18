import { Routes, Route, Navigate } from "react-router-dom"

// OLD импорты
//import { TestPage } from "./components/tests/dashboard/TestPage"
//import { TestPageNew } from "./components/tests/dashboard/TestPageNew"
//import { ResultsPage } from "./components/tests/resultspage/ResultsPage"
//import { Profile } from "./components/profilePageComponents/Profile"
//import { PupilSubjects } from "./components/studyPageComponents/OLD_PupilSubjects"

// Individual test components
import EngineeringThinkingTest from "./components/OLD_tests/engineer/EngineeringThinkingTest"
import GroupRolesTest from "./components/OLD_tests/grouproles/GroupRolesTest"
import IqPotentialTest from "./components/OLD_tests/iqpotencial/iqpotencial"
import ProfessionalOrientationTest from "./components/OLD_tests/profsphere/ProfessionalOrientationTest"
import TemperamentTest from "./components/OLD_tests/temperament/TemperamentTest"

// Хуки
import { useAuth } from './contexts/AuthContext';
import { useApp } from './contexts/AppContext';
import { PupilDataLoading } from './components/adminPages/pupils/data-loading/PupilDataLoading';
import { PupilsList } from './components/adminPages/pupils/PupilsList';
import AutoRegisterForm from './components/adminPages/AutoRegisterForm';
import { ROLES } from "./types/account/role";

import { PupilGradeLoading } from "./components/adminPages/pupils/grade-loading/PupilGradeLoading"


// Новые импорты
// Роутинг
import { AuthRouter } from './routing/AuthRouter'
import { ProtectedRoute } from "./routing/ProtectedRoute"
import { RolesProtectedRoute } from "./routing/RolesProtectedRoute"

// Общий layout для страниц
import { Layout } from "./layout/Layout"

// Страницы
import { LoginPage } from "./components/authorizationPages/LoginPage"
import { RegistrationPage } from "./components/authorizationPages/RegistrationPage"
import { HomePage } from "./components/homePage/HomePage"
import { TestsPage } from "./components/testsPage/TestsPage"
import { ResultsPage } from "./components/resultsPage/ResultsPage"
import { StudyPage } from "./components/studyPage/StudyPage"
import { ProfilePage } from "./components/profilePage/ProfilePage"
import { SettingsPage } from "./components/settingsPage/SettingsPage"
import { TestViewer } from "./components/testsPage/TestViewer"
import { TemperamentFormSelection } from "./components/testsPage/temperament/TemperamentFormSelectionTest"
import { TemperamentResults } from "./components/testsPage/temperament/TemperamentResults"
import { BelbinTest } from "./components/testsPage/belbin/BelbinTest"
import { BelbinResults } from "./components/testsPage/belbin/BelbinResults"

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route element={<AuthRouter />} >
				<Route element={<Layout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
				</Route>
			</Route>

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route element={<RolesProtectedRoute approvedRoles={[ROLES.ADMIN]} />} >
						<Route path='admin/pupil-loading' element={<PupilDataLoading />} />
						<Route path='admin/pupil-list' element={<PupilsList />} />
						<Route path="admin/pupil-grades-loading" element={<PupilGradeLoading />} />
					</Route>

					{/* Tests routes */}
					<Route path="/" element={<HomePage />} />
					<Route path="/tests">
						<Route index element={<TestsPage />} />
						<Route element={<TestViewer />}>
							<Route path="temperament" element={<TemperamentFormSelection />} />
							<Route path="temperament-results" element={<TemperamentResults />} />

              <Route path="group-roles" element={<BelbinTest/>} />
              <Route path="belbin-results" element={<BelbinResults/>} />
						</Route>

						<Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
						{/*<Route path="group-roles" element={<GroupRolesTest />} />*/}
						<Route path="iq-potential" element={<IqPotentialTest />} />
						<Route path="professional-orientation" element={<ProfessionalOrientationTest />} />
						{/*<Route path="temperament" element={<TemperamentTest />} />*/}
					</Route>


					{/* Results routes */}
					<Route path="/my-results" element={<ResultsPage />} />
					<Route path="/my-results/:testType" element={<ResultsPage />} />

					{/* Rest routes */}
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/my-grades" element={<StudyPage />} />
					<Route path="/settings" element={<SettingsPage />} />
				</Route>
			</Route>

			{/* Fallback routes */}
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}