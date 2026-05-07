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
import { SpecialistRegistrationPage } from "./components/authorizationPages/SpecialistRegistrationPage";
import { PupilRegistrationPage } from "./components/authorizationPages/PupilRegistrationPage";
import { RegistrationPage } from "./components/authorizationPages/RegistrationPage"

// Главные страницы
import { HomePage } from "./components/homePage/HomePage"
import { TestsPage } from "./components/testsPage/TestsPage"
import { ResultsPage } from "./components/resultsPage/ResultsPage"
import { StudyPage } from "./components/studyPage/StudyPage"
import { ProfileCommonPage } from "./components/profilePage/ProfileCommonPage"

// Админские страницы
import { AdminPage } from "./components/adminPages/AdminPage"
import { SimulationPage } from "./components/adminPages/simulations/SimulationsPage"
import { UploadSpecialists } from "./components/adminPages/specialists/UploadSpecialists"
import { RegistrationTypePicker } from "./components/authorizationPages/RegistrationTypePage"
import { Specialists } from "./components/adminPages/specialists/Specialists"

// Outlet для тестов
import { TestViewer } from "./components/testsPage/TestViewer"
import { TestIntro } from "./components/testsPage/TestIntro"

// Тест темперамента
import { TemperamentTest } from "./components/testsPage/temperament/TemperamentTest"
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

// Тест интеллекта
import { IqPotentialTest } from "./components/testsPage/iqPotential/IqPotentialTest"
import { IqPotentialResults } from "./components/testsPage/iqPotential/IqPotentialResults"

// Тест Холланда
import { HollandTest } from "./components/testsPage/holland/HollandTest"
import { HollandResults } from "./components/testsPage/holland/HollandResults"

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route element={<AuthRouter />}>
				<Route element={<Layout />}>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" >
						<Route path="" element={<RegistrationTypePicker />} />
						<Route path="specialist" element={<SpecialistRegistrationPage />} />
						<Route path="pupil" element={<PupilRegistrationPage />} />
					</Route>

				</Route>
			</Route>

			{/* Protected routes */}
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route element={<RolesProtectedRoute approvedRoles={[ROLES.ADMIN]} />}>
						<Route path="/admin" element={<AdminPage />}>
							<Route path="pupils-upload" element={<PupilDataLoading />} />
							<Route path="pupils" element={<PupilsList />} />
							<Route path="simulations" element={<SimulationPage />} />
							<Route path="specialists" element={<Specialists />} />
							<Route path="specialists-upload" element={<UploadSpecialists />} />
						</Route>
					</Route>

					{/* Tests routes */}
					<Route path="/" element={<HomePage />} />
					<Route path="/tests">
						<Route index element={<TestsPage />} />
						<Route element={<TestViewer />}>
							<Route path="temperament" element={<TemperamentTest />} />
							<Route path="temperament-results" element={<TemperamentResults />} />
							<Route path="temperament-intro" element={<TestIntro testDescriptionPath="public/temperament/data/description.json" testNavigation="/tests/temperament" />} />

							<Route path="group-roles" element={<GroupRolesTest />} />
							<Route path="group-roles-results" element={<GroupRolesResults />} />
							<Route path="group-roles-intro" element={<TestIntro testDescriptionPath="public/group_roles/data/description.json" testNavigation="/tests/group-roles" />} />

							<Route path="engineering-thinking" element={<EngineeringThinkingTest />} />
							<Route path="engineering-thinking-results" element={<EngineeringThinkingResults />} />
							<Route path="engineering-thinking-intro" element={<TestIntro testDescriptionPath="public/engineering_thinking/data/description.json" testNavigation="/tests/engineering-thinking" />} />

							<Route path="professional-orientation-klimov" element={<KlimovTest />} />
							<Route path="professional-orientation-klimov-results" element={<KlimovResults />} />
							<Route path="professional-orientation-klimov-intro" element={<TestIntro testDescriptionPath="public/prof_klimov/data/description.json" testNavigation="/tests/professional-orientation-klimov" />} />

							<Route path="iq-potential" element={<IqPotentialTest />} />
							<Route path="iq-potential-results" element={<IqPotentialResults />} />
							<Route path="iq-potential-intro" element={<TestIntro testDescriptionPath="public/iq_potential/data/description.json" testNavigation="/tests/iq-potential" />} />

							<Route path="prof-holland" element={<HollandTest />} />
							<Route path="prof-holland-results" element={<HollandResults />} />
							<Route path="prof-holland-intro" element={<TestIntro testDescriptionPath="public/prof_holland/data/description.json" testNavigation="/tests/prof-holland" />} />

						</Route>
					</Route>

					{/* Results routes */}
					<Route path="/my-results" element={<ResultsPage />} />
					<Route path="/my-results/:testType" element={<ResultsPage />} />

					{/* Rest routes */}
					<Route path="/profile" element={<ProfileCommonPage />} />
					<Route path="/my-grades" element={<StudyPage />} />
				</Route>
			</Route>

			{/* Fallback routes */}
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}
