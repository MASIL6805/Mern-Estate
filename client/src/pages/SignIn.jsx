
import React from 'react'
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice' 
import { useSelector } from 'react-redux'



export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading,error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();//not to reload the page

    try {

      dispatch(signInStart());
  
      const res= await fetch('/api/auth/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      } 
      );
      const data= await res.json();
  
      if(data.success=== false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      console.log(data);
      
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold text-center mb-6">Sign In</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="email"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          id="password"
          onChange={handleChange} 
        />

        <button disabled={loading} className="bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Dont Have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      {error && <p className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</p>}
    </div>
  )
}

