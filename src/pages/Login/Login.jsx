import React from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "../../config/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";

export const LoginPage = () => {
  const navigate = useNavigate();

  supabaseClient.auth.onAuthStateChange(async (event) => {
    if (event === "SIGNED_IN") {
      navigate("/dashboard");
    }
  });

  return (
    <div className="grid h-3/4 grid-cols-1 justify-items-center p-4">
      <div className="mt-24 flex h-full w-1/4 flex-col items-center justify-center space-y-4 rounded-l-xl rounded-r-xl bg-gray-700 p-4">
        <Auth
          supabaseClient={supabaseClient}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
        />
      </div>
    </div>
  );
};
