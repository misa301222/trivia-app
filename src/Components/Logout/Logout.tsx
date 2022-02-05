import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/');
        navigate(0);
    }

    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="container">
            <p>You will be logged out!</p>
        </div>
    )
}

export default Logout;