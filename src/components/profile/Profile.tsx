import "./css/profile-style.css"
import "./css/personal-informations-style.css"

import { useAuth } from '../../contexts/AuthContext';
import { PersonalInformation } from './PersonalInformation';

export const Profile = () => {
	const { logout } = useAuth();

	const user = {
		name: "123",
		email: "123",
		role: "admin",
		group: "edasd",
		completedTests: [1, 2, 3],
		lastTestDate: "28.10.2025",
	}

	if (!user) return null;

	return (<>
		<div className="profile-base">
			<div className="profile-content">
				<PersonalInformation />
			</div>
		</div>







		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">Личный кабинет</h1>









			<div className="bg-white rounded-lg shadow-md p-6">
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Основная информация</h2>
					<div className="space-y-3">
						<p><span className="font-medium">Имя:</span> {user.name || 'Не указано'}</p>
						<p><span className="font-medium">Email:</span> {user.email}</p>
						<p><span className="font-medium">Роль:</span> {user.role}</p>
						{user.group && <p><span className="font-medium">Группа:</span> {user.group}</p>}
					</div>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-semibold text-gray-700 mb-4">Статистика</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-blue-50 p-4 rounded-lg">
							<p className="text-sm text-blue-600">Пройдено тестов</p>
							<p className="text-2xl font-bold">{user.completedTests?.length || 0}</p>
						</div>
						<div className="bg-green-50 p-4 rounded-lg">
							<p className="text-sm text-green-600">Последний тест</p>
							<p className="text-lg font-semibold">
								{user.lastTestDate ? new Date(user.lastTestDate).toLocaleDateString() : 'Нет данных'}
							</p>
						</div>
					</div>
				</div>

				<div className="flex space-x-4">
					<button
						onClick={() => logout()}
						className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
					>
						Выйти
					</button>
					<button
						onClick={() => window.history.back()}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
					>
						Назад
					</button>
				</div>
			</div>
		</div>
	</>
	);
};