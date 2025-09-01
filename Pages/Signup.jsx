import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_BASE } from "../constant/api"
function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        dob: "",
        email: "",
        otp: ""
    });
    const [otpSent, setOtpSent] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            let url = `${API_BASE}/auth/signup`;
            let payload;
            if (!otpSent) {
                payload = { name: form.name, dob: form.dob, email: form.email };
            } else {
                payload = form;
            }
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include" 
            });
            const data = await res.json();
            console.log("Signup response:", data);
            if (!res.ok) {
                setError(data.message || "Signup failed");
            } else {
                setSuccess(data.message || (otpSent ? "Signup successful!" : "OTP sent!"));

                if (!otpSent && data.message && data.message.toLowerCase().includes("otp")) {
                    setOtpSent(true);
                }

                if (data.token) {
                    localStorage.setItem("token", data.token);
                    navigate("/");
                     window.location.reload();
                }
            }
        } catch (err) {
            setError("Network error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className=" min-h-screen bg-white rounded-xl shadow-lg flex flex-col md:flex-row w-full max-w-md md:max-w-[1200px] h-auto md:h-[700px] overflow-hidden">
                <div className="flex-1 p-6 md:p-0 flex flex-col h-full rounded-t-xl md:rounded-l-xl bg-white relative">

                    <div className="flex justify-center items-center mt-2 md:absolute top-5 left-6  gap-3">
                        <img
                            src="/icon.png"
                            alt="Logo"
                            className="w-8 h-8"
                        />
                        <span className="font-bold text-2xl text-blue-600">HD</span>
                    </div>
                    <div className="pt-10 md:pt-24 px-4 md:px-16 overflow-y-auto h-full">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900 text-center md:text-left">Sign up</h1>
                        <p className="text-gray-500 mb-8 text-base text-center md:text-left">
                            Sign up to enjoy the feature of HD
                        </p>
                        <form className="flex flex-col gap-3" onSubmit={handleSignup}>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                                    placeholder="Jonas Kahnwald"
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    className="w-full px-5 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                                    value={form.dob}
                                    onChange={e => setForm({ ...form, dob: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full px-5 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                                    placeholder="jonas_kahnwald@gmail.com"
                                    value={form.email}
                                    onChange={e => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            {otpSent && (
                                <div className="relative">
                                    <label className="block text-sm text-gray-500 mb-2">OTP</label>
                                    <input
                                        type={showOtp ? "text" : "password"}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="w-full px-5 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg pr-10"
                                        placeholder="OTP"
                                        value={form.otp}
                                        onChange={e => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        onClick={() => setShowOtp(!showOtp)}
                                        tabIndex={-1}
                                    >
                                        {showOtp ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-7 9-13 9S3 17 3 12s7-9 13-9 13 4 13 9z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.657 1.343-3 3-3 .512 0 .998.104 1.438.293M21 12c0 3-4 7-9 7-.875 0-1.725-.112-2.538-.325M3 3l18 18" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            )}
                            <button
                                type="submit"
                                className="w-full py-3 mt-3 bg-blue-600 text-white rounded font-semibold text-lg hover:bg-blue-700 transition"
                            >
                                {otpSent ? "Sign up" : "Send OTP"}
                            </button>
                            {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                            {success && <div className="text-green-500 text-center mt-2">{success}</div>}
                        </form>
                        <div className="mt-8 text-sm text-gray-500 text-center ">
                            Already have an account??{" "}
                            <a href="/signin" className="text-blue-600 underline ">
                                Sign in
                            </a>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex flex-[1.2] bg-black items-center justify-center rounded-l-xl">
                    <img
                        src="/7b63f1a45bc23337ff246ae8162bec8fa9d7190d.jpg"
                        alt="Background"
                        className="object-cover w-full h-full rounded-l-xl"
                    />
                </div>
            </div>
        </div>
    )
}

export default Signup
