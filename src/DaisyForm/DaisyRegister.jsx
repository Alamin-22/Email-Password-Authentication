import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../Firebase/firebase.config";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const DaisyRegister = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted= e.target.terms.checked;
        console.log(email, password,accepted)
        // reset error message
        setErrorMessage("")
        setSuccess("")
        if (password.length < 6) {
            setErrorMessage("Password should be at least 6 character or longer ")
            return;
        } else if (!/[A-Z]/.test(password)) {
            return setErrorMessage("Your Password should have at least one upper case character")
        } else if(!accepted){
             return setErrorMessage("Please accept our terms and condition to Register")
        }
        // crate new user
        createUserWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user);
                setSuccess("User Created Successfully")
            })
            .catch(error => {
                console.log(error);
                setErrorMessage(error.message)
            })
    }




    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register Now!!</h1>
                        <p className="py-6">Register here for more exciting update. And get our special Offer!</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" name="email" required className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="password" name="password" className="input input-bordered  w-full" required />
                                        <span className="absolute top-3 left-72 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                            {
                                                showPassword ? <AiFillEyeInvisible className="text-2xl" /> : <AiFillEye className="text-2xl" />
                                            }
                                        </span>
                                    </div>

                                    <label className="label">
                                        <input type="checkbox" name="terms"/>Accept our terms and Condition
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                errorMessage && <p className="text-red-600 font-medium  text-lg">{errorMessage}</p>
                            }
                            {
                                success && <p className="text-green-600 font-medium text-lg">{success}</p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DaisyRegister;