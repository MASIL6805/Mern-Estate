import React from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { useState,useEffect } from 'react';
import { getDownloadURL, getStorage,ref, uploadBytesResumable } from "firebase/storage";
import app from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


//firebase storage
//allow read
//allow write if
//request.resource.size < 2 * 1024 * 1024 &&
//request.resource.contentType.matches('image/.*');

useEffect(() => {
  if (file) {
    handleFileUpload(file);
  }
}, [file]);

const handleFileUpload = async (file) => {
  const storage = getStorage(app);
  const fileName = new Date().getTime() + file.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      // Progress function ...
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    }, 
    (error) => {
      // Error function ...
      setFileUploadError(true);
    },
    () => {
      // Completion function
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) => {
        setFormData({...formData, avatar: downloadURL});
      });
    }
  );
};
  return (
    <div className="max-w-lg mx-auto p-4">

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form className="flex flex-col gap-4 items-center">

        {/* Profile Image */}
        <input 
          onChange={(e)=> setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} 
          className="hidden"
          accept="image/*"
        />
        <img 
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar} 
          alt="profile" 
          className="h-24 w-24 rounded-full object-cover border"
        />

        <p className='text-sm self-center'>
          {fileUploadError ?(
          <span className='text-red-700'>Image Uploading Error(Image must be less than 2MB)</span>
          ) : filePerc > 0 && filePerc < 100 ?(
          <span className='text-slate-700'>Uploading: {filePerc}%</span>
          ):filePerc === 100 ?(
          <span className='text-green-700'>Image Uploaded Successfully</span>
          ):(
            ""
          )
        }
        </p>

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

