"use client"

import { MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { useAnalytics } from "@/hooks/use-analytics"

export function WhatsappButton() {
  const [isVisible, setIsVisible] = useState(false)
  const analytics = useAnalytics()

  // Mostrar o botão apenas após rolagem para evitar obstruir o conteúdo inicial
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    // Mostrar o botão após um tempo mesmo sem rolagem
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    return () => {
      window.removeEventListener("scroll", toggleVisibility)
      clearTimeout(timer)
    }
  }, [])

  const handleClick = () => {
    analytics.trackWhatsAppClick("floating_button")
    window.open(
      "https://wa.me/5512992192268?text=Oi, vim do site e gostaria de mais informações",
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20ba57] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      }`}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Contato via WhatsApp</span>
    </button>
  )
}
