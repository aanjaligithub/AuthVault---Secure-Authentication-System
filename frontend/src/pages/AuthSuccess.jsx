import { getData } from '@/context/userContext'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthSuccess = () => {
    const { setUser } = getData()
    const navigate = useNavigate()
    useEffect(() => {

        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search)
            const accessToken = params.get("token")

            if (accessToken) {
                localStorage.setItem("accessToken", accessToken)
                try {
                    const res = await axios.get(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/auth/me`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })
                    if (res.data.success) {
                        setUser(res.data.user)  //save user in context api store
                        navigate("/")
                    }
                } catch (error) {
                    const message =
                        error.response?.data?.message ||
                        "Google login failed. Please try again."

                    alert(message)

                    localStorage.removeItem("accessToken")
                    navigate("/login")
                }
            }
        }
        handleAuth()
    }, [navigate, setUser])
    return (
        <h2>
            Logging in...
        </h2>
    )
}

export default AuthSuccess