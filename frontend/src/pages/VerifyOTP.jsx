import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { CheckCircle, Loader2, RotateCcw } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ShieldUser } from "lucide-react"

const VerifyOTP = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])
  const { email } = useParams()
  const navigate = useNavigate()


  const handleChange = (index, value) => {
    if (value.length > 1) return
    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")
    if (finalOtp.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    try {
      setIsLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_AUTHVAULT_BACKEND_URL}/user/verify-otp/${email}`, {
        otp: finalOtp,
      })
      setSuccessMessage(res.data.message)
      setTimeout(() => {
        navigate(`/change-password/${email}`)
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const clearOtp = () => {
    setOtp(["", "", "", "", "", ""])
    setError("")
    inputRefs.current[0]?.focus()
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
        <div className="w-full max-w-md space-y-6">

          {/* Card */}
          <Card className="rounded-2xl border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                Enter Verification Code
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isVerified
                  ? "Code verified successfully! Redirecting..."
                  : "Enter the 6-digit code sent to your email"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {successMessage && (
                <p className="text-green-500 text-sm text-center">{successMessage}</p>
              )}

              {/* Verified State */}
              {isVerified ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-lg text-gray-900">Verification Successful</h3>
                    <p className="text-gray-600">Your email has been verified. You'll be redirected to reset your password.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-600">Redirecting...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* OTP Inputs */}
                  <div className="flex justify-between mb-6">
                    {otp.map((digit, index) => (
                      <Input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        maxLength={1}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-12 text-center text-xl font-bold rounded-full border border-blue-500"
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button
                      onClick={handleVerify}
                      disabled={isLoading || otp.some((digit) => digit === "")}
                      className="w-full h-12 rounded-full bg-blue-600 hover:bg-blue-500"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Verifying
                        </>
                      ) : (
                        "Verify Code"
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={clearOtp}
                      disabled={isLoading || isVerified}
                      className="w-full h-12 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Clear
                    </Button>
                  </div>
                </>
              )}

            </CardContent>

            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-600">
                Wrong email?{" "}
                <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
                  Go back
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* Test OTP Info */}
          <div className="text-center text-xs text-gray-400">
            <p>
              For testing purposes, use code: <span className="font-mono font-medium">123456</span>
            </p>
          </div>

        </div>
      </div>
    </div>

  )
}

export default VerifyOTP