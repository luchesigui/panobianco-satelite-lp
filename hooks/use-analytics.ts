"use client"

import { track } from "@vercel/analytics"

export function useAnalytics() {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    track(eventName, properties)
  }

  // Eventos específicos da landing page
  const trackHeroButtonClick = () => {
    trackEvent("hero_button_click", {
      button_text: "COMECE SUA TRANSFORMAÇÃO AGORA",
      section: "hero",
    })
  }

  const trackPlatinumPlanClick = () => {
    trackEvent("platinum_plan_click", {
      plan_type: "platinum",
      price: "R$129,90",
      section: "pricing",
    })
  }

  const trackAvulsoPlanClick = () => {
    trackEvent("avulso_plan_click", {
      plan_type: "avulso",
      price: "R$149,90",
      section: "pricing",
    })
  }

  const trackWhatsAppClick = (source: string) => {
    trackEvent("whatsapp_click", {
      source,
      contact_method: "whatsapp",
    })
  }

  const trackFormSubmission = (formData: { name: string; whatsapp: string; email: string }) => {
    trackEvent("form_submission", {
      form_type: "platinum_signup",
      has_name: !!formData.name,
      has_whatsapp: !!formData.whatsapp,
      has_email: !!formData.email,
    })
  }

  const trackFAQClick = (question: string, index: number) => {
    trackEvent("faq_click", {
      question_index: index,
      question: question.substring(0, 50) + "...", // Primeiros 50 caracteres
    })
  }

  const trackFinalCTAClick = () => {
    trackEvent("final_cta_click", {
      button_text: "COMEÇAR AGORA - PLANO PLATINUM",
      section: "final_cta",
    })
  }

  return {
    trackEvent,
    trackHeroButtonClick,
    trackPlatinumPlanClick,
    trackAvulsoPlanClick,
    trackWhatsAppClick,
    trackFormSubmission,
    trackFAQClick,
    trackFinalCTAClick,
  }
}
