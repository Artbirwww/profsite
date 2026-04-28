import { FC } from "react"

export const HomeAbout: FC = ({ }) => {
    return (
        <div className="home-section-item">

            <div className="home-section-header">
                <h4>Подбор профессий</h4>
            </div>

            <div className="home-about-section-wrapper">
                <div className="home-about-item">
                    <h4>Подбор сотрудников для промышленных предприятий</h4>
                </div>

                <div className="home-about-item">
                    <h4>Подбор профессий для школьников</h4>
                </div>
            </div>

        </div>
    )
}