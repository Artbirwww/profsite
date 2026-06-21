import { useNavigate } from "react-router-dom"
import { profession } from "../../types/specialist/specialist"
import { Button } from "../ui/reusable/button"
import { Status } from "./VRTestsPage"
import React from "react"
import { CheckCircle, Clock, Play } from "lucide-react"
import { ProfessionWithStatus, VRTestStatus } from "../../types/vrTests/VRTest"
import "./css/vr-test-card.css"
interface VRTestCardProps {
    item: ProfessionWithStatus;
    onStart: (profession: ProfessionWithStatus) => void;
    onReset: (profession: ProfessionWithStatus) => void;
}
const statusesRu: Record<VRTestStatus, string> = {
    'not_started': 'Не начат',
    'first_stage': '1/2',
    'second_stage': '2/2',
    'completed': 'Завершен'
};

const statusColors: Record<VRTestStatus, string> = {
    'not_started': 'var(--text-placeholder-color)',
    'first_stage': 'var(--accent-color-500)',
    'second_stage': 'var(--scfly-color-500)',
    'completed': 'var(--scfly-color-400)'
};

export const VRTestCard = ({ item, onStart, onReset }: VRTestCardProps) => {
    const navigate = useNavigate()
    const status = item.status
    const isCompleted = status === 'completed';
    const handleCardClick = () => {

        const professionName = item.name.toLowerCase().replace(/\s+/g, '-');
        navigate(`/vr-tests/${professionName}/${item.id}/results`);
        
    };

    const handleStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        onStart(item);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        onReset(item);

    };

    const getButtonLabel = () => {
        if (isCompleted) return 'Пройден';
        if (status === 'not_started') return 'Начать';
        return 'Продолжить';
    };

    return (
        <div 
            className="test" 
            onClick={handleCardClick}
            style={{ cursor: item.testsCount > 0 ? 'pointer' : 'default' }}
        >
            <div className="test-header">
                <div className="test-title">
                    <h4>{item.name}</h4>
                    <small style={{ color: statusColors[status] }}>
                        {statusesRu[status]}
                    </small>
                </div>
                
                {item.testsCount > 0 && (
                    <a 
                        href="#" 
                        style={{ color: "var(--error-color-500)" }}
                        onClick={handleReset}
                    >
                        Сбросить
                    </a>
                )}
            </div>

            <div className="test-progress">
                <div className="progress-track">
                    <div 
                        className="progress-fill"
                        style={{ 
                            width: `${Math.min((item.testsCount / 2) * 100, 100)}%`,
                            background: isCompleted ? 'var(--scfly-color-400)' : 'var(--accent-color-500)'
                        }}
                    />
                </div>
                <span className="progress-text">{item.testsCount}/2</span>
            </div>

            <Button 
                label={getButtonLabel()} 
                onClick={handleStart} 
                disabled={isCompleted}
            />
        </div>
    );
}