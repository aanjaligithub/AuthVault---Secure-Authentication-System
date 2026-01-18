import React from 'react'
import { ShieldUser } from "lucide-react"

const VerifyEmail = () => {
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
      <div className="flex items-center justify-center px-4 min-h-screen w-full">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">

            <h2 className='text-3xl'>
              ✅ <span className="text-3xl font-bold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">Verify Your Email</span>
            </h2>

            <p className="text-gray-600 text-sm">
              We've sent you an email to verify your account. Please check your inbox and click the verification link to complete your registration.
            </p>

          </div>
        </div>
      </div>

    </div>
  )
}

export default VerifyEmail