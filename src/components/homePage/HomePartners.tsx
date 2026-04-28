import { FC } from "react"

export const HomePartners: FC = ({ }) => {
    return (
        <div className="home-section-item">

            <div className="home-section-header">
                <h4>Проект реализован благодаря</h4>
            </div>

            <div className="home-partners-section-wrapper">
                <div className="home-partners-item">
                    <h4>Lorem, ipsum.</h4>
                </div>

                <div className="home-partners-item">
                    <h4>Lorem, ipsum dolor.</h4>
                </div>
            </div>

        </div>
    )
}