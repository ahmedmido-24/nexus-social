import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from './../../Context/UserContext';



export default function Login() {
  const [apiError, setapiError] = useState("")
  const [isLoading, setisLoading] = useState(false)
  let {UserLogin , setUserLogin} = useContext(UserContext)
   


  const navigate = useNavigate();
  const schema = z
    .object({
      email: z.string().email("Invalid email"),

      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Must include 1 uppercase, 1 lowercase, 1 special char, 1 number, and be at least 8 characters long"
        ),
    })

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  function handleLogin(data) {
    setisLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signin", data)
      .then((res) => {
        if (res.data.message === "success") {
          setisLoading(false);
          navigate("../");
          localStorage.setItem("userToken" , res.data.token)
          setUserLogin(res.data.token)

        }
      })
      .catch((err) => {
        // console.log(err.response.data.error);
        setisLoading(false);
        setapiError(err.response.data.error);
      });
    console.log(data);
  }

  return (
    <>
      <form
        className="max-w-md mx-auto"
        onSubmit={handleSubmit(handleLogin)}
      >
        {apiError && (
          <p className="mb-5 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
            {apiError}
          </p>
        )}


        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            {...register("email")}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
          {formState.errors.email && formState.touchedFields.email && (
            <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
              {formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("password")}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
          {formState.errors.password && formState.touchedFields.password && (
            <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
              {formState.errors.password.message}
            </p>
          )}
        </div>


        {/* Submit */}
        <button
        disabled={isLoading}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? (<i class="fa-solid fa-spinner text-white animate-spin"></i>):("Submit")}
        </button>
      </form>
    </>
  );
}
