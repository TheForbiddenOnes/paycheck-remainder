import React from 'react';
import {useNavigate} from "react-router-dom";
import supabaseClient from "../../config/supabaseClient";
import {Auth} from "@supabase/auth-ui-react"
import {
    // Import predefined theme
    ThemeSupa,
} from '@supabase/auth-ui-shared'

export const LoginPage = () => {
    const navigate = useNavigate();

    supabaseClient.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
            navigate("/dashboard");
        }
    });

    return (
        <div className="grid grid-cols-1 h-3/4 p-4 justify-items-center">
            <div className="flex flex-col items-center justify-center space-y-4 h-full w-1/4 p-4 mt-24 bg-slate-700 rounded-l-xl rounded-r-xl">
                <Auth
                    supabaseClient={supabaseClient}
                    appearance={{ theme: ThemeSupa }}
                    theme="dark"
                    providers={['google']}
                />
            </div>
        </div>

    );
};