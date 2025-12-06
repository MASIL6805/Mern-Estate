import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto p-4">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form className="flex flex-col gap-4 items-center">

        {/* Profile Image */}
        <img 
          src={currentUser.avatar} 
          alt="profile" 
          className="h-24 w-24 rounded-full object-cover border"
        />

        {/* Inputs */}
        <input
          type="text"
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="email"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg w-full"
        />

        {/* Update Button */}
        <button 
          type="submit" 
          className="bg-slate-700 text-white p-3 rounded-lg uppercase w-full hover:opacity-95"
        >
          Update Profile
        </button>

      </form>

      {/* Bottom actions */}
      <div className="flex justify-between mt-6 px-2">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}

