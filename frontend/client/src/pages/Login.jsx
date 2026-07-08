import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { useAuth } from "../context/AuthContext";
import "../style/Auth.css";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function Login() {
// const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        email: "",

        password: ""

    });


    const handleChange = (e) => {

        if (e.key === "Enter") {

        handleSubmit()

    }

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const { data } = await api.post(

                "api/auth/login",

                form

            );

            login(

                data.token,

                data.user

            );
            toast.success("Welcome back to SecureShare")
            setLoading(false);

            navigate("/");

        }

        catch (error) {
// setLoading(false);

            // alert(

            //     error.response?.data?.message ||

            //     "Login Failed"

            // );
            toast.error("Login Failed")

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

                    Welcome Back

                </h2>

                <input

                    type="email"

                    name="email"

                    placeholder="Enter Email"

                    value={form.email}

                    onChange={handleChange}

                    required

                />

                <input

                    type="password"

                    name="password"

                    placeholder="Enter Password"

                    value={form.password}

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

                        "Logging In..."

                        :

                        "Login"

                    }

                </button>

                <p>

                    Don't have an account?

                
                    <Link to="/signup" >

                        Register

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default Login;