import { Routes, Route, Navigate } from "react-router-dom"

// Auth components
import { Login } from "./components/auth/Login/Login"
import { Registration } from "./components/auth/Registration/Registration"

// Test components
import { Dashboard } from "./components/tests/dashboard/Dashboard"
import { TestPage } from "./components/tests/dashboard/TestPage"
import { TestPageNew } from "./components/tests/dashboard/TestPageNew"
import { ResultsPage } from "./components/tests/resultspage/ResultsPage"

// Профиль польователя
import { Profile } from "./components/profile/Profile"

// Individual test components
import EngineeringThinkingTest from "./components/tests/engineer/EngineeringThinkingTest"
import GroupRolesTest from "./components/tests/grouproles/GroupRolesTest"
import IqPotentialTest from "./components/tests/iqpotencial/iqpotencial"
import ProfessionalOrientationTest from "./components/tests/profsphere/ProfessionalOrientationTest"
import TemperamentTest from "./components/tests/temperament/TemperamentTest"

// Layout & routing
import { ProtectedRoute } from "./components/routing/ProtectedRoute"

import { Layout } from "./components/layout/Layout";

// Хуки
import { useAuth } from './contexts/AuthContext';
import { useApp } from './contexts/AppContext';
import { PupilDataLoading } from './components/admin/pupils/data-loading/PupilDataLoading';
import { PupilsList } from './components/admin/pupils/PupilsList';
import AutoRegisterForm from './components/admin/AutoRegisterForm';
import { Home } from './components/home/Home';
import { AuthRouter } from './components/routing/AuthRouter';
import { RolesProtectedRoute } from "./components/routing/RolesProtectedRoute";
import { ROLES } from "./types/account/role";
import { Tests } from "./components/tests/testsMain/Tests"

// ——— Главный компонент App ———
export default function App() {
	return (
		<Routes>
			{/* Public routes */}

			<Route element={<AuthRouter />} >
				<Route element={<Layout />}>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Registration />} />
				</Route>
			</Route>

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route element={<RolesProtectedRoute approvedRoles={[ROLES.ADMIN]} />} >
						<Route path='admin/pupil-loading' element={<PupilDataLoading />} />
						<Route path='admin/pupil-list' element={<PupilsList />} />
					</Route>

					{/* Legacy routes */}

					{/* New test routes */}
					<Route path="/" element={<Home />} />
					<Route path="/tests">
						<Route index element={<Tests />} />
						<Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
						<Route path="group-roles" element={<GroupRolesTest />} />
						<Route path="iq-potential" element={<IqPotentialTest />} />
						<Route path="professional-orientation" element={<ProfessionalOrientationTest />} />
						<Route path="temperament" element={<TemperamentTest />} />
					</Route>


					{/* Results */}
					<Route path="/my-results" element={<ResultsPage />} />
					<Route path="/my-results/:testType" element={<ResultsPage />} />

					<Route path="/profile" element={<Profile />} />

				</Route>
			</Route>
			{/* Fallback */}
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}