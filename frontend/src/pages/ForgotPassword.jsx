import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axios from 'axios'
import { CheckCircle, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { ShieldUser } from "lucide-react"

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const navigate = useNavigate()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/user/forgot-password`, {
                email
            });
            if (res.data.success) {
                navigate(`/verify-otp/${email}`)
                toast.success(res.data.message)
                setEmail("")
            }
        } catch (error) {
            console.log(error);

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

            {/* Center Form */}
            <div className="flex items-center justify-center px-4 mt-12">
                <div className="w-full max-w-md space-y-6">

                    <Card className="rounded-2xl border shadow-lg">

                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                                Forgot Password
                            </CardTitle>
                            <CardDescription>
                                {isSubmitted
                                    ? "Check your email for reset instructions"
                                    : "Enter your email address to receive a password reset link"}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {isSubmitted ? (
                                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="bg-primary/10 rounded-full p-3">
                                        <CheckCircle className="h-6 w-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-lg">Check your inbox</h3>
                                        <p className="text-gray-700">
                                            We've sent a password reset link to <span className="font-medium text-gray-900">{email}</span>
                                        </p>
                                        <p>
                                            If you don't see the email, check your spam folder or{" "}
                                            <button
                                                className="text-blue-600 hover:underline font-medium"
                                                onClick={() => setIsSubmitted(false)}
                                            >
                                                try again
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={isLoading}
                                            className="h-12 rounded-full border border-blue-500"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-500"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending reset link...
                                            </>
                                        ) : (
                                            "Send reset link"
                                        )}
                                    </Button>
                                </form>
                            )}
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
        </div>

    )
}

export default ForgotPassword