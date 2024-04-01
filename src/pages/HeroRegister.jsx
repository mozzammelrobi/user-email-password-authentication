import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const HeroRegister = () => {
    const [registeError, setRegisterEror] = useState('')
    const [success, setSuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        const name = e.target.name.value
        console.log(name,email, password, accepted)

        if (password.length < 6) {
            setRegisterEror('Password should be at least 6 characters')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterEror('you pasword should have one uppercase character')
            return
        }
        else if(!accepted){
            setRegisterEror('plese accept your terms and conditoin')
            return
        }

  
        // reset error and success message
        setRegisterEror('')
        setSuccess('')


        // crete user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                if(result.user.emailVerified){
                    setSuccess('user created successfully')

                    // update profile
                    updateProfile(result.user,{
                        displayName:name,
                        photoURL: "https://example.com/jane-q-user/profile.jpg"
                    })
                    .then(() => console.log('profile updated'))
                }else{
                    alert('please verify your email adderess')
                }

                // send varification email
                sendEmailVerification(result.user)
                .then(() => {
                    alert('please varify your email')
                })
            })
            .catch(error => {
                console.log(error)
                setRegisterEror(error.message)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                    <div className="form-control">
                            <label className="label">
                                <span className="label-text">name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                      
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative border">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" placeholder="password"
                                    className="input input-bordered w-full" required />
                                <span
                                    className="absolute top-4 right-3"
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                           <div className="flex gap-2">
                           <input type="checkbox" name="terms" id="terms" />
                            <label className="">
                                <p>Tearns and condition</p>
                            </label>
                           </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
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

export default HeroRegister;