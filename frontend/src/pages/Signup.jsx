import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
 import { toast } from "react-toastify";
import Loader from "../components/Loader";
import "../style/Auth.css";

function Signup() {
 
    const navigate = useNavigate();

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        password: "",

        confirmPassword: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {
// console.log(BASE_URL)
        e.preventDefault();

        try {

            setLoading(true);

           const { data } = await api.post(

               "/api/auth/register",

                form

            );
// login(data.token, data.user);
            toast.success("Registration Successful");

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">
 {loading && <Loader />}
            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                <h2>

                    Create Account

                </h2>

                <input

                    type="text"

                    name="firstName"

                    placeholder="First Name"

                    value={form.firstName}

                    onChange={handleChange}

                    required

                />

                <input

                    type="text"

                    name="lastName"

                    placeholder="Last Name"

                    value={form.lastName}

                    onChange={handleChange}

                />

                <input

                    type="email"

                    name="email"

                    placeholder="Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Password"

                    value={form.password}

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="confirmPassword"

                    placeholder="Confirm Password"

                    value={form.confirmPassword}

                    onChange={handleChange}

                    required

                />

                <button
                    type="submit"
                    disabled={loading}
                >

                    {

                        loading

                        ?

                        "Creating..."

                        :

                        "Create Account"

                    }

                </button>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Signup;