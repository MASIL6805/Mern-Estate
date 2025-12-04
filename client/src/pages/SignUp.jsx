import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>

      <form className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="username"
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
        />

        <button className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Have an account?{" "}
          <Link to="/sign-in" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

