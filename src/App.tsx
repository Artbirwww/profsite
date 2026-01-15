

// src/App.tsx
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

// Auth components
import { Login } from "./components/auth/Login/Login";
import { Registration } from "./components/auth/Registration/Registration";

// Test components
import { Dashboard } from "./components/tests/dashboard/Dashboard";
import { TestPage } from "./components/tests/dashboard/TestPage";
import { TestPageNew } from "./components/tests/dashboard/TestPageNew";
import { ResultsPage } from "./components/tests/resultspage/ResultsPage";

// Профиль польователя
import { UserProfile } from "./components/profile/UserProfile";

// Individual test components
import EngineeringThinkingTest from "./components/tests/engineer/EngineeringThinkingTest";
import GroupRolesTest from "./components/tests/grouproles/GroupRolesTest";
import IqPotentialTest from "./components/tests/iqpotencial/iqpotencial";
import ProfessionalOrientationTest from "./components/tests/profsphere/ProfessionalOrientationTest";
import TemperamentTest from "./components/tests/temperament/TemperamentTest";

// Layout & routing
import MainLayout from "./components/layout/MainLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";





import { Layout } from "./components/layout/Layout";

// Хуки
import { useAuth } from "./contexts/AuthContext";
import { useApp } from "./contexts/AppContext";
import { PupilDataLoading } from "./components/admin/pupils/data-loading/PupilDataLoading";
import { PupilsList } from "./components/admin/pupils/PupilsList";
import AutoRegisterForm from "./components/admin/AutoRegisterForm";

// Типы
type TestGroup =
  | "temperament"
  | "groupRoles"
  | "professionalOrientation"
  | "engineeringThinking"
  | "intellectualPotential";

// ——— Хук для страниц с защитой ———
const LegacyProtectedRoute = ({
  children,
  requireResult = false,
}: {
  children: React.ReactNode;
  requireResult?: boolean;
}) => {
  const { user } = useAuth();
  const { testResult } = useApp();

  if (!user) return <Navigate to="/login" replace />;
  if (requireResult && !testResult) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

// ——— Страницы ———
function DashboardPage() {
  const { user, logout } = useAuth();
  const { completedGroups, handleStartTest } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const handleViewResults = () => {
    navigate("/my-results");
  };

  return (
    <Dashboard
      user={user}
      completedGroups={completedGroups}
      onStartTest={handleStartTest}
      onLogout={handleLogout}
      onViewResults={handleViewResults}
    />
  );
}

function TestPageWrapper() {
  const { user } = useAuth();
  const { handleTestGroupComplete } = useApp();
  const { group } = useParams<{ group: TestGroup }>();

  if (!user || !group) return <Navigate to="/dashboard" replace />;

  return (
    <TestPage
      user={user}
      testGroup={group}
      onComplete={handleTestGroupComplete}
      onBack={() => window.history.back()}
    />
  );
}

function ResultsPageWrapper() {
  const { user } = useAuth();
  const { testResult } = useApp();

  if (!user || !testResult) return <Navigate to="/dashboard" replace />;
  return <ResultsPage result={testResult} user={user} />;
}

// ——— Главный компонент App ———
export default function App() {
  return (
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>

            <Route path="admin/pupil-loading" element={<PupilDataLoading />} />
            <Route path="admin/pupil-list" element={<PupilsList />} />

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/test/:group" element={<TestPageWrapper />} />
            <Route path="/results" element={<ResultsPageWrapper />} />

            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/tests">
              <Route
                path="engineering-thinking"
                element={<EngineeringThinkingTest />}
              />
              <Route path="group-roles" element={<GroupRolesTest />} />
              <Route path="iq-potential" element={<IqPotentialTest />} />
              <Route
                path="professional-orientation"
                element={<ProfessionalOrientationTest />}
              />
              <Route path="temperament" element={<TemperamentTest />} />
              <Route path=":testType" element={<TestPageNew />} />
            </Route>
			

            {/* Results */}
            <Route path="/my-results" element={<ResultsPage />} />
            <Route path="/my-results/:testType" element={<ResultsPage />} />

            {/*Личный Кабинет*/}
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Route>
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
  );
}
