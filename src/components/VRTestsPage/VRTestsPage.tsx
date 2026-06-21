import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { specialistsAPI } from "../../services/api/specialistApi"
import { profession } from "../../types/specialist/specialist"
import "./css/vr-tests-page.css"
import { VRTestCard } from "./VRTestCard"
import { Search } from "lucide-react"
import { useNavigate, useNavigation } from "react-router-dom"
import { vrTestApi } from "../../services/api/vrTestsApi"
import { useAuth } from "../../contexts/AuthContext"
import { ProfessionWithStatus, VRTestStatus } from "../../types/vrTests/VRTest"

export type Status = "not started" | "first stage" | "second stage"

export const VRTestsPage = () => {
    const [professions, setProfessions] = useState<ProfessionWithStatus[]>([]);
    const [professionsOriginal, setProfessionsOriginal] = useState<ProfessionWithStatus[]>([]);
    const [search, setSearch] = useState<string>()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {getToken} = useAuth()

    const navigate = useNavigate()
    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                
                // Load professions and tests in parallel
                const [professionsTemp, testsTemp] = await Promise.all([
                    specialistsAPI.getProfessions(),
                    vrTestApi.getMyTests(getToken())
                ]);
                console.log(testsTemp)

                // Map professions with status
                const professionsWithStatus = professionsTemp.map((prof: any) => {
                    // Count tests for this profession
                    const tests = testsTemp.filter(test => test.professionId === prof.id);
                    console.log(tests)
                    const testsCount = tests.length;
                    
                    let status: VRTestStatus = 'not_started';
                    if (testsCount === 0) {
                        status = 'not_started';
                    } else if (testsCount === 1) {
                        status = 'first_stage';
                    } else if (testsCount >= 2) {
                        status = 'completed';
                    }

                    return {
                        id: prof.id,
                        name: prof.name,
                        status: status,
                        testsCount: testsCount,
                        remainingAttempts: Math.max(0, 2 - testsCount),
                        canTakeTest: testsCount < 2
                    };
                });
                console.log(professionsWithStatus)
                setProfessionsOriginal(professionsWithStatus);
                setProfessions(professionsWithStatus);
                
            } catch (err) {
                console.error('Error loading data:', err);
                toast.error('Ошибка при загрузке данных');
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);
    useEffect(() => {
        if (!professionsOriginal) return
        if (!search) {
            setProfessions(professionsOriginal)
            return
        }
        setProfessions(professionsOriginal?.filter(prof => prof.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase())))
    }, [search, professionsOriginal])

    const handleStartTest = (profession: ProfessionWithStatus) => {
        if (!profession.canTakeTest) {
            toast.error('Вы уже прошли максимальное количество тестов для этой профессии. Сбросьте результаты, чтобы пройти заново.');
            return;
        }
        
        const professionName = profession.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/vr-tests/${professionName}/${profession.id}/intro`);
    };
    const handleResetTests = async (profession: ProfessionWithStatus) => {
        try {
            await vrTestApi.resetTests( getToken(), profession.id);
            toast.success(`Тесты для "${profession.name}" сброшены`);
            
            // Update local state
            const updatedProfessions = professions.map(p => {
                if (p.id === profession.id) {
                    return {
                        ...p,
                        status: 'not_started' as VRTestStatus,
                        testsCount: 0,
                        remainingAttempts: 2,
                        canTakeTest: true
                    };
                }
                return p;
            });
            setProfessions(updatedProfessions);
            setProfessionsOriginal(updatedProfessions);
            
        } catch (err) {
            console.error('Error resetting tests:', err);
            toast.error('Ошибка при сбросе тестов');
        }
    };

    if (!professions) return (<>
        <p>Загрузка тестов</p>
    </>)
    return (
        <div className="vr-page">
            <div className="search-container">
                <Search size={25} />
                <input
                    type="text"
                    placeholder="Поиск профессий..."
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                />
            </div>
            
            <div className="tests-wrapper">
                {professions.map(prof => (
                    <VRTestCard
                        key={prof.id}
                        item={prof}
                        onStart={handleStartTest}
                        onReset={handleResetTests}
                    />
                ))}
            </div>
        </div>
    );
}