import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { Link } from "react-router-dom";

const Register = () => {


    const handleRegister = (e) => {
        e.preventDefault()
        const email = e.target.email.value 
        const password = e.target.password.value 
        console.log(email, password)

        // create user
        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    return (
        <div>
            <div className="mx-auto md:w-1/2 border">
                <h2 className='text-3xl mb-8'>Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="email" className="mb-4 w-3/4 px-4 py-2" name="email" id="" placeholder="email"/>
                    <br />
                    <input type="password" className="mb-4 w-3/4 px-4 py-2" name="password" id="" placeholder="password"/>
                    <br />
                    <input type="submit" className="btn btn-secondary w-3/4" value="Register" />
                </form>
                <p>Alredy have  an account ? pleae <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;