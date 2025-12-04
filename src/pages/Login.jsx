import React, { useContext, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const { logInUser, loginWithGoogle, passwordReset,logInWithGithub } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    logInUser(email, password)
      .then(() => {
        toast.success("User logged in successfully!");
        e.target.reset();
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGoogle = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("User logged in successfully!");
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleLoginWithGithub=()=>{

    logInWithGithub()
      .then(() => {
        toast.success("User logged in successfully!");
        navigate(location?.state?.from || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }


  const handleForgotPassword = () => {
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }

    passwordReset(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen w-11/12 mx-auto">
      {/* Image Section */}
      <div data-aos="fade-left" className="hidden md:flex w-1/2 justify-center">
        <img
          src="/images/login.png"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>

      {/* Login Form Section */}
      <div
        data-aos="fade-right"
        className="flex items-center justify-center w-full md:w-1/2 p-6"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Login to Your Account
          </h2>
          <hr className="my-6 border-gray-300" />

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4 relative">
              <label className="block font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                placeholder="Enter your password"
                name="password"
              />
              <button
                type="button"
                className="absolute right-3 top-10 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 font-bold rounded-lg hover:opacity-90 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Google Login Button */}
          <button
            onClick={handleLoginWithGoogle}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-white border py-3 font-bold rounded-lg hover:opacity-90 transition duration-200"
          >
            <FaGoogle className="text-blue-500" />
            Login with Google
          </button>
          {/* Google Login Button */}
          <button
            onClick={handleLoginWithGithub}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white border py-3 font-bold rounded-lg hover:opacity-90 transition duration-200"
          >
            <FaGithub className="text-white" />
            Login with Github
          </button>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <NavLink className="text-blue-500 font-medium" to="/register">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
