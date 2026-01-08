import {
  ArrowLeft,
  Eye,
  EyeClosed,
  EyeIcon,
  EyeOff,
  Leaf,
  Lock,
  Mail,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import googleImg from "@/assets/google.png"
type propType = {
  previousStep: (n: number) => void;
};
const RegisterForm = ({ previousStep }: propType) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white relative">
      <div
        onClick={() => previousStep(1)}
        className="flex absolute top-6 left-6 items-center gap-2 text-green-700 hover:text-green-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </div>
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
        Create Account
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
        Join Snapcart Today <Leaf className="w-5 h-5 text-green-800" />
      </motion.p>
      <motion.form
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
          <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-800 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
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
          <div className="absolute right-3 top-3.5 w-5 h-5 text-gray-600 cursor-pointer">
            {showPass ? (
              <EyeOff onClick={() => setShowPass(false)} />
            ) : (
              <EyeIcon onClick={() => setShowPass(true)} />
            )}
          </div>
        </div>

        {(() => {
          const formValidation = name !== "" && email !== "" && password !== "";
          return (
            <button
              className={`
          w-full font-semibold py-3 rounded-xl transition-all duration-200 show-md inline-center justify-centergap-2 ${
            formValidation
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 hover:bg-gray-500 cursor-not-allowed"
          }
          `}
            >
              Register
            </button>
          );
        })()}

        <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
          <span className="flex-1 h-px bg-gray-200"/>
          OR
          <span className="flex-1 h-px bg-gray-200"/>
        </div>

        <button>
          <Image src={googleImg} width={20} height={20} alt="google"/>
          Continue with Google
        </button>

      </motion.form>
    </div>
  );
};

export default RegisterForm;
