import axios from 'axios'
import { ShieldUser } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
    const { token } = useParams()
    const [status, setStatus] = useState("Verifying...")
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const res = await axios.post(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/user/verify`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.data.success) {
                    setStatus("✅ Email Verified Successfully")
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                } else {
                    setStatus("❌ Invalid or Expired Token")
                }
            } catch (error) {
                console.log(error);
                setStatus("❌ Verification Failed.Please try again")

            }
        };

        verifyEmail()
    }, [token, navigate])
    return (
        <div className="min-h-screen w-full bg-white relative">

            {/* Top Logo */}
            <div className="absolute top-3 left-4 flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-900 to-blue-500 p-1.5 rounded-lg">
                    <ShieldUser className="h-6 w-6 text-white" />
                </div>

                <h1 className="text-xl font-semibold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                    AuthVault
                </h1>
            </div>

            {/* Centered Card */}
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 border rounded-2xl shadow-lg text-center w-full max-w-md space-y-3">

                    <h2 className="text-2xl font-bold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                        {status}
                    </h2>

                    <p className="text-sm text-gray-600">
                        Please wait while we process your request.
                    </p>

                </div>
            </div>
        </div>

    )
}

export default Verify