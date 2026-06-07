import React, { useState } from "react";
import style from "./Register.module.css";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./../Login/Login";


export default function Register() {
  const [apiError, setapiError] = useState("")
  const [isLoading, setisLoading] = useState(false)
   


  const navigate = useNavigate();
  const schema = z
    .object({
      name: z
        .string()
        .regex(/^[a-zA-Z]+$/, "Only letters are allowed")
        .min(1, "Name is required")
        .max(10, "Max length is 10 characters"),

      email: z.string().email("Invalid email"),

      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Must include 1 uppercase, 1 lowercase, 1 special char, 1 number, and be at least 8 characters long"
        ),

      rePassword: z.string(),

      dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth is required")
        .refine(
          (date) => {
            const userDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return userDate < today;
          },
          { message: "Date of birth can't be in the future" }
        ),

      gender: z.enum(["male", "female"], { message: "Gender is required" }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: "Passwords do not match",
      path: ["rePassword"],
    });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
       rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState } = form;

  function handleRegister(data) {
    setisLoading(true);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", data)
      .then((res) => {
        if (res.data.message === "success") {
          setisLoading(false);
          navigate("/login");
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
        onSubmit={handleSubmit(handleRegister)}
      >
        {apiError && (
          <p className="mb-5 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
            {apiError}
          </p>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            {...register("name")}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
          {formState.errors.name && formState.touchedFields.name && (
            <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
              {formState.errors.name.message}
            </p>
          )}
        </div>

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

        {/* Confirm Password */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            {...register("rePassword")}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
          {formState.errors.rePassword &&
            formState.touchedFields.rePassword && (
              <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
                {formState.errors.rePassword.message}
              </p>
            )}
        </div>

        {/* Birth Date */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            {...register("dateOfBirth")}
            id="date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="date"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Birth Date
          </label>
          {formState.errors.dateOfBirth &&
            formState.touchedFields.dateOfBirth && (
              <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
                {formState.errors.dateOfBirth.message}
              </p>
            )}
        </div>

        {/* Gender */}
        <div className="mb-5">
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender")}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {formState.errors.gender && formState.touchedFields.gender && (
            <p className="mt-1 bg-red-100 border border-red-400 text-red-700 px-3 py-1 rounded-md text-sm font-semibold text-center">
              {formState.errors.gender.message}
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
