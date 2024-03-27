// src/components/SignInWithGoogle.js
import React from 'react';
import { signInWithGoogle } from '../firebase';

function SignInWithGoogle() {
  return (
    <div className="flex justify-center my-6">
        <button onClick={signInWithGoogle} className="bg-lime-500 hover:bg-lime-800 text-white font-bold text-sm py-1 px-4 rounded-xl shadow-md drop-shadow-md transition-all">
            Sign in to save your results?
        </button>
    </div>
  );
}

export default SignInWithGoogle;
