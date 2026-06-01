import React from 'react';
import './css/no-result.css';
interface NoResultsWithRetryProps {
    onRetry: () => void;
    error?: string;
}

export type Status = "loading" | "error" | 'empty' | 'success'

interface NoResultsProps {
    title?: string;
    message?: string;
    actionText?: string;
    onAction?: () => void;
    variant?: Status;
}

export const NoResults: React.FC<NoResultsProps> = ({ 
    title = "Нет результатов",
    message = "По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.",
    actionText,
    onAction,
    variant = "empty"
}) => {
    const getIcon = () => {
        switch(variant) {
            case 'loading':
                return <div className="no-results-spinner" />;
            case 'error':
                return (
                    <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5"/>
                        <line x1="12" y1="8" x2="12" y2="12" strokeWidth="1.5"/>
                        <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none"/>
                    </svg>
                );
            default:
                return (
                    <svg className="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M22 22L15.5 15.5M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="1.5"/>
                    </svg>
                );
        }
    };

    return (
        <div className={`no-results-container no-results-${variant}`}>
            <div className="no-results-icon-wrapper">
                {getIcon()}
            </div>
            <h3 className="no-results-title">{title}</h3>
            <p className="no-results-message">{message}</p>
            {actionText && onAction && (
                <button className="no-results-button" onClick={onAction}>
                    {actionText}
                </button>
            )}
        </div>
    );
};