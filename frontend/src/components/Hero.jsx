import { ArrowRight, Zap } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { getData } from '@/context/userContext'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Hero = () => {
  const { user } = getData()
  const navigate = useNavigate()

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center gap-3">

        {/* User Avatar */}
        <div className="w-28 h-28 rounded-full bg-blue-300 flex items-center justify-center shadow-md">
          <Avatar className="cursor-pointer w-28 h-28">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>
              {user?.username?.[0]?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Greeting */}
        <p className="text-bold text-2xl text-gray-700">
          Hey {user ? user.username : "Developer"} 👋
        </p>

        {/* Heading */}
        <h1 className="text-2xl sm:text-5xl font-bold text-gray-900">
          Welcome to <span className="text-blue-600">AuthVault</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-gray-600 text-lg">
          Let’s start with a quick product tour and we’ll have you up and running in no time!
        </p>

        <Button
          className="mt-4 rounded-full px-8 py-6 text-blue-600 border border-blue-600 bg-white hover:bg-blue-600 hover:text-white shadow-md"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;