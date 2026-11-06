const Welcome = () => {
    return (
        <main className="min-h-screen bg-[#f7f7f6]">

            {/* Logo */}
            <div className="absolute left-11 top-10 flex items-center gap-2">
                {/* Replace with your own logo if you have one */}
                <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-[#ff6257]"></span>
                    <span className="mt-2 h-2 w-2 rounded-full bg-[#ff6257]"></span>
                    <span className="h-2 w-2 rounded-full bg-[#ff6257]"></span>
                </div>

                <span className="text-3xl font-semibold tracking-tight">
                    orbit
                </span>
            </div>

            {/* Center Content */}
            <section className="flex min-h-screen flex-col items-center pt-28">

                {/* Flower */}
                <img
                    src="/flower.svg"
                    alt=""
                    className="h-40 w-40 object-contain"
                />

                {/* Heading */}
                <h1 className="mt-8 text-2xl font-semibold text-gray-800">
                    Welcome to Orbit
                </h1>

                {/* Description */}
                <p className="mt-3 text-sm text-gray-700">
                    Let's get your account set up. It will take about a minute.
                </p>

                {/* Button */}
                <button className="mt-8 w-32 rounded-md bg-[#4f6fa9] px-4 py-2.5 text-sm text-white">
                    Get started
                </button>

                {/* Divider */}
                <div className="mt-16 w-125 border-t border-gray-300"></div>

                {/* Terms */}
                <p className="mt-7 max-w-125 text-center text-xs leading-5 text-gray-600">
                    By continuing, you agree to Orbit's{" "}
                    <a href="#" className="underline">
                        Terms of Service
                    </a>{" "}
                    and acknowledge Orbit's{" "}
                    <a href="#" className="underline">
                        Privacy Statement
                    </a>
                </p>

            </section>
        </main>
    );
};

export default Welcome;