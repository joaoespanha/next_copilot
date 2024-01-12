"use client";
import React, { useEffect } from "react";
import { useState } from 'react'
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const [isButtonDisabled, setisButtonDisabled] = useState(true)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        console.log(name, value)

    };


    const onLogin = async () => {
        try {
            setIsLoading(true)

            router.push("/profile/id");
        } catch (error: any) {
            console.log("Login error", error);

        } finally {
            setIsLoading(false)
        }
    }

    const areFieldsFilled = (): Boolean => {
        return user.email.length > 0 && user.email.length > 0 && user.password.length > 0
    }


    useEffect(() => {

        if (areFieldsFilled()) {
            setisButtonDisabled(false)
        }

    }, [user])



    return (
        <div>
            <h1 className="text-center text-white text-2xl">{isLoading ? "Processing" : "Login In"}</h1>
            <label htmlFor="email">email
                <input name="email" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="email" type="text" value={user.email} onChange={handleInputChange} />
            </label>

            <label htmlFor="password1">Password
                <input name="password" className="text-black p-2 border-gray-300 rounded-lg mb-4" id="password" type="password" value={user.password} onChange={handleInputChange} />
            </label>

            <button disabled={isButtonDisabled} onClick={onLogin} >login</button>

        </div>
    )
}
