import React from 'react'
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LoginButton } from '@/components/auth/login-button'

const font = Poppins ({
  subsets: ['latin'],
  weight: ["600"]
})
const LandingPage = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-7xl">
            Landing Page
        </h1>
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>
          🔐 Auth
        </h1>
        <p className="text-white text-lg">
          A simple authentication service
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>

    </main>
  )
}

export default LandingPage
