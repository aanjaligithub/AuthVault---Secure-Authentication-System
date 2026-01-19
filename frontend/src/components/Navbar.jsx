import { ShieldUser, LogOut, User } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { getData } from '@/context/userContext'
import axios from 'axios'
import { toast } from 'sonner'

const Navbar = () => {
    const { user, setUser } = getData()
    const accessToken = localStorage.getItem("accessToken")

    const logoutHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8000/user/logout`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (res.data.success) {
                setUser(null)
                toast.success(res.data.message)
                localStorage.clear()
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <nav className="fixed top-0 w-full z-10 border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-500 p-1.5 rounded-lg">
                        <ShieldUser className="h-6 w-6 text-white" />
                    </div>

                    <h1 className="text-xl font-semibold bg-gradient-to-br from-blue-900 to-blue-500 bg-clip-text text-transparent">
                        AuthVault
                    </h1>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.avatar} />
                                    <AvatarFallback>
                                        {user?.username?.[0]?.toUpperCase() || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={logoutHandler}>
                                    <LogOut className="mr-2 h-4 w-4" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            to="/signup"
                            className="px-5 py-2 rounded-full border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-500 hover:text-white transition"
                        >
                            Login →
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    )
}

export default Navbar