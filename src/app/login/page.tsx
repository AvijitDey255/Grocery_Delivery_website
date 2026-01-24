"use client";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  EyeIcon,
  EyeOff,
  Leaf,
  Loader2,
  Lock,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import googleImg from "@/assets/google.png";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();
  const session = useSession();
  const notify = (e:any)=> toast(e);
  console.log(session);
  // Api call function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      await signIn("credentials", {
        email,
        password,
      });
      // notify("Login successfully")
      
      router.push("/")
      // setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <motion.h1
        initial={{
          y: -10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="text-4xl font-extrabold text-green-700 mb-2"
      >
        Welcome Back
      </motion.h1>
      <motion.p
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex gap-2 items-center text-gray-600 mb-8"
      >
        Login To Snapcart <Leaf className="w-5 h-5 text-green-800" />
      </motion.p>
      <motion.form
        onSubmit={handleLogin}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex flex-col gap-5 w-full max-w-sm"
      >
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={showPass ? "text" : "password"}
            placeholder="Your password"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}

          <div className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 cursor-pointer">
            {showPass ? (
              <EyeOff onClick={() => setShowPass(false)} />
            ) : (
              <EyeIcon onClick={() => setShowPass(true)} />
            )}
          </div>
        </div>

        {(() => {
          const formValidation = email !== "" && password !== "";
          return (
            <button
              disabled={!formValidation || loading}
              className={`
          w-full font-semibold py-3 rounded-xl transition-all duration-200 show-md flex inline-center justify-center gap-2 ${
            formValidation
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 hover:bg-gray-500 cursor-not-allowed"
          }
          `}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200" />
          OR
          <span className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex items-center w-full justify-center gap-3 border border-gry-300 hover:border-gray-50 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 cursor-pointer" onClick={()=>signIn("google",{callbackUrl:"/"})}>
          <Image src={googleImg} width={20} height={20} alt="google" />
          Login with Google
        </div>
      </motion.form>
      <p className="flex items-center gap-1 text-gray-600 mt-6 text-sm ">
        Want to create an account ? <LogIn className="w-4 h-4" />{" "}
        <span
          className="text-green-600 cursor-pointer"
          onClick={() => router.push("/register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
