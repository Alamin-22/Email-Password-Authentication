import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useRef, useState } from "react";

const Login = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const emailRef = useRef(null);




    const handleSubmit = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)
        setError("");
        setSuccess("")
        // validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccess("User Logged In Successfully")
                } else {
                    alert("Please Verify Your Email Address.")  
                }
            })
            .catch(error => {
                console.log(error);
                setError("Something is Wrong Please provide your Email and Password correctly")
            })
    }


    const handleForgetsPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            return console.log("send Email to reset", emailRef.current.value)
        } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
            return console.log("Please Write a valid email");
        }

        //send validation email

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("please check your email");
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Login here to continue our services Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} placeholder="email" name="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a onClick={handleForgetsPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">LogIn</button>
                            </div>
                        </form>
                        {
                            error && <p className="text-red-600">{error}</p>
                        }
                        {
                            success && <p className="text-green-600">{success}</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;