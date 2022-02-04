import axios from "axios";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import authService from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";

interface User {
    email: string,
    password: string
}

function Login() {
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleOnChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, email: event.target.value }));
    }

    const handleOnChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setUser(prev => ({ ...prev, password: event.target.value }));
    }

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        const body = {
            Email: user.email,
            Password: user.password
        }

        await authService.login(user.email, user.password).then(
            (response => {
                console.log('del (): ' + response);
                switch (response.data.responseCode) {
                    case 1:
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Logged In Succesfully! [' + response.data.dataSet.email + ']',
                            showConfirmButton: false,
                            timer: 1100
                        }).then(function () {
                            navigate('/dashboard');
                            navigate(0);
                        })
                        break;
                    case 2:
                        console.log('Incorrect!!');
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: response.data.responseMessage
                        });
                        break;
                    case 3:
                        break;

                    default:
                        break;
                }

            }),
            error => {
                console.log(error);
            }
        );
    }

    return (
        <div className="container mt-16 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-3/5 border-2 border-cyan-500 rounded-lg p-4 shadow-lg shadow-cyan-500/50">
                <div className="mb-3">
                    <label className="block text-white text-lg font-bold mb-2" htmlFor="inputEmail">Email</label>
                    <input onChange={handleOnChangeEmail} className="form-control" type='text' />
                </div>

                <div className="mb-3">
                    <label className="block text-white text-lg font-bold mb-2" htmlFor="inputPassword">Password</label>
                    <input onChange={handleOnChangePassword} className="form-control" type='password' />
                </div>

                <div className="mt-10">
                    <button disabled={!user.email || !user.password} type="submit" className="btn-primary">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;