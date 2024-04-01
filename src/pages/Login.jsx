import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
    const [registeError, setRegisterEror] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef(null)

    const handleLogIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password)

        setSuccess('')
        setRegisterEror('')

        // validation

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('user login successfully')
            })
            .catch(error => {
                // console.error(error)
                setRegisterEror(error.message)
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value
        if(!email){     
            console.log('please provide an email',emailRef.current.value)
            return;
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            {
                alert('please wriate a valid email')
                return
            }
        }

        // send varificaiton
        sendPasswordResetEmail(auth, email)
        .then(()=> {
            console.log('please checked you email')
        })
        .catch(error => {
            console.log(error)
        })
    }


    return (
        <div className=" min-h-screen bg-base-200 ">
            <div className="hero-content ">

                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border-4 border-red-500">
                    <form
                        onSubmit={handleLogIn}
                        className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                placeholder="email"
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        <a
                            onClick={handleForgetPassword}
                            className="cursor-pointer"
                        > Forget password?</a>
                    </form>
                    <p>New to this website please <Link to='/register' className="text-green-400">Go to register</Link></p>
                    {
                        registeError && <p className="text-red-700 ">{registeError}</p>
                    }
                    {
                        success && <p className="text-green-500">{success}</p>
                    }
                </div>

            </div>


        </div>
    );
};

export default Login;