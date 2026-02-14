import { Routes, Route, Navigate } from "react-router-dom"

// OLD импорты
//import { TestPage } from "./components/tests/dashboard/TestPage"
//import { TestPageNew } from "./components/tests/dashboard/TestPageNew"
//import { ResultsPage } from "./components/tests/resultspage/ResultsPage"
//import { Profile } from "./components/profilePageComponents/Profile"
//import { PupilSubjects } from "./components/studyPageComponents/OLD_PupilSubjects"

// Individual test components
import EngineeringThinkingTest from "./components/tests/engineer/EngineeringThinkingTest"
import GroupRolesTest from "./components/tests/grouproles/GroupRolesTest"
import IqPotentialTest from "./components/tests/iqpotencial/iqpotencial"
import ProfessionalOrientationTest from "./components/tests/profsphere/ProfessionalOrientationTest"
import TemperamentTest from "./components/tests/temperament/TemperamentTest"

// Хуки
import { useAuth } from './contexts/AuthContext';
import { useApp } from './contexts/AppContext';
import { PupilDataLoading } from './components/admin/pupils/data-loading/PupilDataLoading';
import { PupilsList } from './components/admin/pupils/PupilsList';
import AutoRegisterForm from './components/admin/AutoRegisterForm';
import { ROLES } from "./types/account/role";

import { PupilGradeLoading } from "./components/admin/pupils/grade-loading/PupilGradeLoading"






// Новые импорты
// Роутинг
import { AuthRouter } from './routing/AuthRouter'
import { ProtectedRoute } from "./routing/ProtectedRoute"
import { RolesProtectedRoute } from "./routing/RolesProtectedRoute"

// Общий layout для страниц
import { Layout } from "./layout/Layout"

// Страницы
import { LoginPage } from "./pages/authorizationPages/LoginPage"
import { RegistrationPage } from "./pages/authorizationPages/RegistrationPage"
import { HomePage } from "./pages/HomePage"
import { TestsPage } from "./pages/TestsPage"
import { ResultsPage } from "./pages/ResultsPage"
import { StudyPage } from "./pages/StudyPage"
import { ProfilePage } from "./pages/ProfilePage"
import { SettingsPage } from "./pages/SettingsPage"
import { TestViewer } from "./components/testsRef/TestViewer"
import { TemperamentFormSelection } from "./components/testsRef/temperament/TemperamentFormSelection"
import { TemperamentResults } from "./components/testsRef/temperament/TemperamentResults"

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
            <Route element={<TestViewer/>}>
              <Route path="temperament-ref" element={<TemperamentFormSelection />} />
              <Route path="temperament-results" element={<TemperamentResults/>} />
            </Route>
            
						<Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
						<Route path="group-roles" element={<GroupRolesTest />} />
						<Route path="iq-potential" element={<IqPotentialTest />} />
						<Route path="professional-orientation" element={<ProfessionalOrientationTest />} />
						<Route path="temperament" element={<TemperamentTest />} />
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