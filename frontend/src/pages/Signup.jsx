import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ShieldUser } from "lucide-react"




const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.username || !formData.email || !formData.password) {
            toast.error("All fields are required")
            return
        }
        try {
            setIsLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/user/register`, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.data.success) {
                navigate('/verify')
                toast.success(res.data.message)
            }
        } catch (error) {
            const message =
                error.response?.data?.message || "SignUp failed. Please try again."

            toast.error(message)

        } finally {
            setIsLoading(false)
        }

    }
    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* Top Logo (same as Home) */}
            <div className="mt-2 ml-4 flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-900 to-blue-500 p-1.5 rounded-lg">
                    <ShieldUser className="h-6 w-6 text-white" />
                </div>

                <h1 className="text-xl font-semibold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                    AuthVault
                </h1>
            </div>

            {/* Center Form */}
            <div className="flex items-center justify-center px-4 mt-12">
                <Card className="w-full max-w-md rounded-2xl border shadow-lg">

                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                            Create Account
                        </CardTitle>
                        <CardDescription>
                            Get started with AuthVault in seconds
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">

                        <Input
                            name="username"
                            placeholder="Full Name"
                            value={formData.username}
                            onChange={handleChange}
                            className="h-12 rounded-full border border-blue-500"
                        />

                        <Input
                            name="email"
                            type="email"
                            placeholder="Email Id"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12 rounded-full border border-blue-500"
                        />

                        <div className="relative">
                            <Input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="h-12 rounded-full pr-12 border border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button
                            onClick={handleSubmit}
                            className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-500"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>

                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <span
                                onClick={() => navigate("/login")}
                                className="text-blue-600 cursor-pointer hover:underline"
                            >
                                Login →
                            </span>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )

}

export default Signup