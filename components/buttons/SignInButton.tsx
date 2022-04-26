import { Icon } from "@iconify/react";
import { signIn } from "next-auth/react";
import React from "react";

const SignInButton = () => {
  const signInWithGoogle = () => {
    // Perform sign in
    signIn("google");
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center bg-gray-900 rounded-full py-3 px-4 hover:scale-105 transition-all duration-300"
    >
      <span className="pr-2 text-white text-sm relative z-10">
        Continue with
      </span>
      <Icon className="text-xl" icon="flat-color-icons:google" />
    </button>
  );
};

export default SignInButton;
