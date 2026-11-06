import { useState } from "react";
import { CircleAlert } from 'lucide-react';
import { useNavigate } from "react-router-dom";
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setloading] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);
    const [code, setCode] = useState("");
    const navigate = useNavigate();


    const [error, seterror] = useState("")

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);

        

        try {
            const response = await fetch(

                isLogin ?
                    "http://localhost:5000/api/auth/login" :
                    "http://localhost:5000/api/auth/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        isLogin ?
                            {
                                email: formData.email,
                                password: formData.password,
                            } :

                            {
                                name: formData.name,
                                email: formData.email,
                                password: formData.password,
                            }
                    ),
                }
            );

            const data = await response.json();
            setloading(false);
            if (!response.ok) {
                seterror(data.message)
                return;
            }

            if(!isLogin) {
                navigate("/verify-email", {
                    state: { email: formData.email }
                });


            }
            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:5000/api/auth/google";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">

                <h1 className="text-3xl font-bold text-center">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h1>

                <p className="text-gray-500 text-center mt-2">
                    {isLogin
                        ? "Login to continue to your account"
                        : "Create an account to get started"}
                </p>
                {error && (
                        <p className="text-red-500 text-sm top-27 absolute flex items-center gap-1">
                            <CircleAlert size={16} />
                            <span>{error}</span>
                        </p>
                    )}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4 relative"
                >
                    
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                            required
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${isLogin ? "mt-1" : "mt-0"}`}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => seterror("")}
                        className={` w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 `}
                        required
                    />



                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer flex items-center justify-center"
                    >
                        {loading ? (<div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (isLogin ? "Login" : " Create Account")

                        }
                    </button>
                </form>

                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 cursor-pointer transition"
                >
                    Continue with Google
                </button>

                <p className="text-center text-gray-600 mt-6">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="ml-2 text-blue-600 font-semibold cursor-pointer hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
}