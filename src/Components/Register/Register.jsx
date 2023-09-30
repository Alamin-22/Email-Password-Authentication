import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Register = () => {
    const [registerError, setRegisterError] = useState("");
    const [success, setSuccess] = useState("");
    const [viewbtn, setViewbtn] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        // const image = e.target.profileImage.value;
        const email = e.target.email.value;
        const password = e.target.Password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted, name,)
        // clear the state
        setRegisterError("")
        setSuccess("")
        // check the password Length
        if (password.length < 6) {
            return setRegisterError("You must have to use at least 6 character or long");
        } else if (!/[A-Z]/.test(password)) {
            return setRegisterError("Your Password should have at least one upper case character")
        } else if (!accepted) {
            return setRegisterError("Please Accept our terms and condition to logIn");
        }
        // crate user
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                console.log(response.user);
                setSuccess("User Created Successfully")

                // update Profile
                updateProfile(response.user, {
                    displayName: name,

                })
                    .then(() => {
                        console.log("Profile Updated")
                    })
                    .catch(error => {
                        console.log(error);
                    })

                // send verification email
                sendEmailVerification(response.user)
                    .then(() => {
                        alert("Please Verify Your Email. Check Your Email and verify it.")
                    })
            })
            .catch(error => {
                console.log(error)
                setRegisterError(error.message)
            })
    }




    return (
        <div className="text-center">
            <h1 className="text-3xl  my-4">Please Register</h1>
            <form onSubmit={handleRegister}>
                <input type="text" name="name" placeholder="Your Full Name" className="border-2 w-72 h-9 mb-3 p-5 rounded-lg" /> <br />
                <input type="email" name="email" placeholder="Your Email" className="border-2 w-72 h-9 mb-3 p-5 rounded-lg" /> <br />
                <div className="relative">
                    <input
                        type={viewbtn ? "text" : "password"}
                        name="Password" placeholder="Your Password" className="border-2 w-72 h-9 p-5 rounded-lg" />
                    <span onClick={() => setViewbtn(!viewbtn)} className="absolute top-2 right-[40%] cursor-pointer">
                        {viewbtn ? <AiFillEye className="text-2xl" /> : <AiFillEyeInvisible className="text-2xl" />}
                    </span>
                </div>
                <br />
                <input type="file" name="profileImage" accept="image/*" />
                <br />
                <input type="checkbox" name="terms" id="terms" />
                <label htmlFor="terms">Accept Our Terms And Conditions</label>
                <br />

                <input type="submit" value="Register" className="cursor-pointer btn btn-primary w-72 my-3" />
            </form>
            {
                registerError && <p className="text-red-600">{registerError}</p>
            }
            {
                success && <p className="text-green-600">{success}</p>
            }
        </div>
    );
};

export default Register;