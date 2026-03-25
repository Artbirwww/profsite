import { Routes, Route, Navigate } from "react-router-dom";

// Хуки
import { useAuth } from "./contexts/AuthContext";
import { PupilDataLoading } from "./components/adminPages/pupils/data-loading/PupilDataLoading";
import { PupilsList } from "./components/adminPages/pupils/PupilsList";
import { ROLES } from "./types/account/role";

import { PupilGradeLoading } from "./components/adminPages/pupils/grade-loading/PupilGradeLoading";

// Новые импорты
// Роутинг
import { AuthRouter } from "./routing/AuthRouter";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import { RolesProtectedRoute } from "./routing/RolesProtectedRoute";

// Общий layout для страниц
import { Layout } from "./components/layout/Layout"

// Страницы
// Авторизация / Регистрация
import { LoginPage } from "./components/authorizationPages/LoginPage"
import { RegistrationPage } from "./components/authorizationPages/RegistrationPage"

// Главные страницы
import { HomePage } from "./components/homePage/HomePage"
import { TestsPage } from "./components/testsPage/TestsPage"
import { ResultsPage } from "./components/resultsPage/ResultsPage"
import { StudyPage } from "./components/studyPage/StudyPage"
import { ProfilePage } from "./components/profilePage/ProfilePage"

// Outlet для тестов
import { TestViewer } from "./components/testsPage/TestViewer"

// Тест темперамента
import { TemperamentFormSelection } from "./components/testsPage/temperament/TemperamentFormSelectionTest"
import { TemperamentResults } from "./components/testsPage/temperament/TemperamentResults"

// Тест грпповых ролей
import { GroupRolesTest } from "./components/testsPage/groupRoles/GroupRolesTest"
import { GroupRolesResults } from "./components/testsPage/groupRoles/GroupRolesResults"

// Тест инженерного мышления
import { EngineeringThinkingTest } from "./components/testsPage/engineeringThinking/EngineeringThinkingTest"
import { EngineeringThinkingResults } from "./components/testsPage/engineeringThinking/EngineeringThinkingResults"

// Тест Климова
import { KlimovTest } from "./components/testsPage/klimov/KlimovTest"
import { KlimovResults } from "./components/testsPage/klimov/KlimovResults"
import { SimulationPage } from "./components/adminPages/simulations/SimulationsPage";

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route element={<AuthRouter />}>
				<Route element={<Layout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegistrationPage />} />
				</Route>
			</Route>

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route element={<RolesProtectedRoute approvedRoles={[ROLES.ADMIN]} />}>
						<Route path="admin/pupil-loading" element={<PupilDataLoading />} />
						<Route path="admin/pupil-list" element={<PupilsList />} />
						<Route path="admin/pupil-grades-loading" element={<PupilGradeLoading />} />
						<Route path="admin/simulation-list" element={<SimulationPage />} />
					</Route>

					{/* Tests routes */}
					<Route path="/" element={<HomePage />} />
					<Route path="/tests">
						<Route index element={<TestsPage />} />
						<Route element={<TestViewer />}>
							<Route path="temperament" element={<TemperamentFormSelection />} />
							<Route path="temperament-results" element={<TemperamentResults />} />

							<Route path="group-roles" element={<GroupRolesTest />} />
							<Route path="group-roles-results" element={<GroupRolesResults />} />

							<Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
							<Route path="engineering-thinking-results" element={<EngineeringThinkingResults />} />

							<Route path="professional-orientation-klimov" element={<KlimovTest />} />
							<Route path="professional-orientation-klimov-results" element={<KlimovResults />} />
						</Route>
					</Route>

					{/* Results routes */}
					<Route path="/my-results" element={<ResultsPage />} />
					<Route path="/my-results/:testType" element={<ResultsPage />} />

					{/* Rest routes */}
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/my-grades" element={<StudyPage />} />
				</Route>
			</Route>

			{/* Fallback routes */}
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}
