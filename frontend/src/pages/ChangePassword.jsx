import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import { ShieldUser } from "lucide-react"

const ChangePassword = () => {
    const { email } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleChangePassword = async () => {
        setError("")
        setSuccess("")

        if (!newPassword || !confirmPassword) {
            setError("Please fill in all fields")
            return
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            setIsLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/user/change-password/${email}`, {
                newPassword,
                confirmPassword
            })

            setSuccess(res.data.message)
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Logo */}
            <div className="mt-2 ml-4 flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-900 to-blue-500 p-1.5 rounded-lg">
                    <ShieldUser className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-semibold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                    AuthVault
                </h1>
            </div>

            {/* Center Card */}
            <div className="flex items-center justify-center px-4 mt-12 w-full">
                <Card className="w-full max-w-md rounded-2xl shadow-lg border">

                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                            Change Password
                        </CardTitle>
                        <CardDescription className="text-gray-600 text-sm">
                            Set a new password for <span className="font-medium text-gray-900">{email}</span>
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        {/* Error & Success Messages */}
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                        {/* Password Inputs */}
                        <div className="space-y-4">
                            <Input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="h-12 rounded-full border border-blue-500"
                            />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="h-12 rounded-full border border-blue-500"
                            />

                            <Button
                                className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-500"
                                disabled={isLoading}
                                onClick={handleChangePassword}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Changing
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <Link to="/login" className="text-blue-600 hover:underline font-medium">
                                Sign in
                            </Link>
                        </p>
                    </CardFooter>

                </Card>
            </div>
        </div>

    )
}

export default ChangePassword