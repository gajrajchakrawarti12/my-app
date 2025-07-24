"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { Menu, User, Shield, LogOut } from "lucide-react"
import { Button } from "./ui/Button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useAuth } from "../context/AuthContext"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", name: "Home" },
    { path: "/report-scam", name: "Report Scam" },
    { path: "/tools", name: "Tools" },
    { path: "/learn/modules", name: "Modules" },
    { path: "/learn/videos", name: "Videos" },
    { path: "/crimeprediction", name: "Crime Prediction" },
    { path: "/contact", name: "Contact" },
    ...(!user
      ? [
          { path: "/login", name: "Login" },
          { path: "/signup", name: "Signup" },
        ]
      : [{ path: "/dashboard", name: "Dashboard", icon: User },
          { path: "/logout", name: "Logout", icon: LogOut, onClick: async () => {
            await logout();
            setIsOpen(false);
            navigate("/login");
            window.location.reload();
          } }
      ]),
  ]

  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="relative h-8 w-8">
              <Shield className="h-8 w-8 text-yellow-300" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Cyber Rakshak</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(({ path, name, icon: Icon, onClick }) => (
              <Link
                key={name}
                to={path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(path) ? "bg-blue-800 text-yellow-300" : "hover:bg-blue-800 hover:text-yellow-300"
                }`}
                onClick={onClick ? onClick : undefined}
              >
                <span className="flex items-center space-x-1">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{name}</span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-blue-900 text-white border-blue-800">
                <div className="flex items-center space-x-3 mb-8">
                  <Shield className="h-8 w-8 text-yellow-300" />
                  <h2 className="text-xl font-bold">Cyber Rakshak</h2>
                </div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map(({ path, name, icon: Icon }) => (
                    <Link
                      key={name}
                      to={path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActivePath(path) ? "bg-blue-800 text-yellow-300" : "hover:bg-blue-800 hover:text-yellow-300"
                      }`}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span>{name}</span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
