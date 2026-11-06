import React from 'react'

const Hero = () => {

    const handlePage = () => {
        window.location.href = "http://localhost:5173/authPage";
    }
    return (
        <section>
            <div>
                <h1 className=" mt-30 mx-auto max-w-5xl text-center text-8xl font-semibold leading-[0.95] tracking-tight">
                    The OS for <br />
                    <span className='text-pink-500'>Human-Agents </span>
                    Teams
                </h1>
                <h3 className='text-gray-700 mx-auto text-center text-2xl pt-7'>Make your teams faster, sharper, and more effective.</h3>
                <h5 className='text-gray-700 mx-auto text-center text-medium pt-5 pb-5'>Try Orbit for free , No credit card required </h5>
            </div>



            <div className="login__container flex items-center justify-center flex-col w-fit mt-5 gap-3 mx-auto">

                {/*Buttons*/}
                <div className="button__container flex flex-col items-center justify-center gap-4 border  p-6 rounded-2xl mt-5 shadow-2xl shadow-gray-700">

                    {/* Text above buttons */}
                    <div className="text-center mb-2">
                        <h2 className="text-2xl font-bold text-black">
                            Sign in to your account
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            Choose how you want to continue
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-center gap-3 " >
                        <button
                            className="flex items-center justify-center w-52 px-2 py-5 bg-gray-100 text-black font-bold rounded-4xl border gap-3"
                            onClick={() => {
                                window.location.href =
                                    "http://localhost:5000/api/auth/google";
                            }}
                        >
                            <img className="w-5 h-5" src="google.svg" alt="Google" />
                            Google
                        </button>

                        <button
                            className="flex items-center justify-center w-52 px-2 py-5 bg-gray-100 text-black font-bold rounded-4xl border gap-3"
                            onClick={handlePage}
                        >
                            <img className="w-5 h-5" src="login.svg" alt="Login" />
                            Login
                        </button>
                    </div>

                </div>

                {/* or Seperator bw email input and direct login
                <div className="flex w-full items-center justify-center gap-2 mt-1.5">
                <div className="h-px w-50 flex bg-gray-300"></div>

                <span className="text-xs text-gray-500">or</span>

                <div className="h-px w-50 flex bg-gray-300"></div>
            </div> */}



            </div>

        </section>

    )
}

export default Hero
