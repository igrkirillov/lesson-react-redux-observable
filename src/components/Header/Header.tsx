import {useNavigate} from "react-router";
import {MouseEvent} from "react";
import logoIcon from "../../assets/react.svg";

export function Header() {
    const navigate = useNavigate();
    const onHomeClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate("/");
    }
    return (
        <header className="header">
            <div className="logo" onClick={onHomeClick}>
                <div>
                    <img src={logoIcon} alt="logo" className="react"/>
                </div>
                <div>
                    <h1>Services</h1>
                </div>
            </div>
        </header>
    )
}