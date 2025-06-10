"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import { Loader2 } from "lucide-react"

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [name, setName] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const analytics = useAnalytics()

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "")

    // Apply the mask (xx) xxxxx-xxxx
    if (digits.length <= 2) {
      return `(${digits}`
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setWhatsapp(formatted)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !whatsapp || !email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Track form submission attempt
    analytics.trackFormSubmission({ name, whatsapp, email })

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, whatsapp, email }),
      })

      if (response.ok) {
        // Track successful form submission
        analytics.trackEvent("form_submission_success", {
          form_type: "platinum_signup",
        })

        window.location.href =
          "https://evo-totem.w12app.com.br/panobiancos/312/site/DBFZAlP1qByypx5j5uphag%5BEQUAL%5D%5BEQUAL%5D"
      } else {
        const error = await response.json()

        // Track form submission error
        analytics.trackEvent("form_submission_error", {
          form_type: "platinum_signup",
          error_message: error.message || "Unknown error",
        })

        throw new Error(error.message || "Erro ao enviar formulário")
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao enviar o formulário",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-2rem)] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center">Garanta seu plano Platinum</DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base">
            Preencha seus dados para garantir o melhor plano da Panobianco
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm sm:text-base">
              Nome completo
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
              className="h-10 sm:h-12 text-base"
              aria-label="Nome completo"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm sm:text-base">
              WhatsApp
            </Label>
            <Input
              id="whatsapp"
              value={whatsapp}
              onChange={handlePhoneChange}
              placeholder="(00) 00000-0000"
              maxLength={15}
              required
              className="h-10 sm:h-12 text-base"
              aria-label="WhatsApp"
              inputMode="tel"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm sm:text-base">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="h-10 sm:h-12 text-base"
              aria-label="E-mail"
              inputMode="email"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#f15927] hover:bg-[#d14420] text-white h-12 sm:h-14 text-base sm:text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Garantir meu plano"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
