"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Dumbbell, Rocket, Users, MapPin, Star, ChevronDown, ChevronUp, Quote } from "lucide-react"
import { SignupModal } from "@/components/signup-modal"
import { Toaster } from "@/components/ui/toaster"
import { WhatsappButton } from "@/components/whatsapp-button"
import { useAnalytics } from "@/hooks/use-analytics"

export default function PanobiancoLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pricingRef = useRef<HTMLElement>(null)
  const analytics = useAnalytics()

  const toggleFaq = (index: number) => {
    const faqQuestions = [
      "Como funciona para levar convidados?",
      "Preciso agendar as aulas coletivas?",
      "O que significa 'sem fidelidade' no Plano Platinum?",
      "A avaliação com nutricionista está realmente inclusa?",
    ]

    if (openFaq !== index) {
      analytics.trackFAQClick(faqQuestions[index], index)
    }

    setOpenFaq(openFaq === index ? null : index)
  }

  const handleHeroButtonClick = () => {
    analytics.trackHeroButtonClick()
    if (pricingRef.current) {
      window.scrollTo({
        top: pricingRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePlatinumClick = () => {
    analytics.trackPlatinumPlanClick()
    openModal()
  }

  const handleAvulsoClick = () => {
    analytics.trackAvulsoPlanClick()
    window.open(
      "https://wa.me/5512992192268?text=Olá! Vim da landing page e gostaria de fechar o plano avulso.",
      "_blank",
    )
  }

  const handleFinalCTAClick = () => {
    analytics.trackFinalCTAClick()
    openModal()
  }

  return (
    <div className="min-h-screen bg-white">
      <link rel="preload" as="image" href="/images/panobianco-hero.jpg" />
      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] md:h-screen flex items-center justify-center text-white"
        aria-label="Hero section showing modern Panobianco gym interior with reception area and PB logo"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/panobianco-hero.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Chega de Treinar por Obrigação.
            <span className="text-[#f15927]"> Redescubra o Prazer</span> de se Cuidar.
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Esqueça a monotonia, os equipamentos velhos e a falta de motivação. Na Panobianco, seu plano não te dá
            acesso apenas a uma academia, mas a um estilo de vida completo, tecnológico e sem amarras.
          </p>
          <Button
            size="lg"
            className="bg-[#f15927] hover:bg-[#d14420] text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
            onClick={handleHeroButtonClick}
          >
            COMECE SUA TRANSFORMAÇÃO AGORA
          </Button>
        </div>
      </section>

      {/* Problem/Pain Points Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 text-center">
            Se você se identifica com isso, você está no lugar certo:
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {[
              "Você começa a treinar e para em menos de 3 meses por achar tudo repetitivo e chato?",
              "Sente-se perdido e sem um plano claro, fazendo sempre os mesmos exercícios sem ver resultado?",
              "Fica desmotivado por treinar sempre sozinho?",
              "Já quis fazer uma aula de luta ou dança, mas desistiu por causa do custo extra?",
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#f15927] rounded-full flex items-center justify-center mt-1">
                  <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <p className="text-base sm:text-lg text-[#2A2F31] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits/Features Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 md:mb-16 text-center">
            Bem-vindo à Panobianco: Mais que uma Academia, um Ecossistema de Bem-Estar
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f15927] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Dumbbell className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2A2F31] mb-3 sm:mb-4">
                  ADEUS, MONOTONIA! TODAS AS AULAS INCLUSAS.
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Cansou da musculação? Mergulhe em uma aula de Muay Thai. Quer mais energia? Experimente o FitDance.
                  Todas as modalidades estão incluídas no seu plano, sem custo adicional.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f15927] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2A2F31] mb-3 sm:mb-4">
                  TECNOLOGIA A FAVOR DO SEU RESULTADO
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Treine com equipamentos de musculação Speedo de última geração. Assista Netflix ou YouTube diretamente
                  nas nossas esteiras e bikes. Tecnologia que torna seu treino mais prazeroso.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f15927] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2A2F31] mb-3 sm:mb-4">
                  MOTIVAÇÃO EM DOBRO (OU QUINTUPLO!)
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  A gente sabe: treinar com companhia é muito melhor. Por isso, você tem direito a 5 convites por mês
                  para levar seus amigos e familiares. Motivação garantida!
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#f15927] rounded-full flex items-center justify-center mb-4 sm:mb-6">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#2A2F31] mb-3 sm:mb-4">
                  SUA ACADEMIA ONDE VOCÊ ESTIVER
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Viajou a trabalho ou foi visitar a família em outra cidade? Seu plano te dá acesso a mais de 300
                  unidades espalhadas pelo Brasil. Sem desculpas para parar!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Stack Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#F7F7F7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 text-center">
            Vamos fazer as contas? Se você fosse pagar por tudo isso separadamente...
          </h2>

          <div className="bg-white p-5 sm:p-8 rounded-lg shadow-lg">
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              {[
                { item: "Avaliação Física com Nutricionista", price: "R$150,00" },
                { item: "Aulas de Muay Thai", price: "R$150,00" },
                { item: "Aulas de Jiu Jitsu", price: "R$180,00" },
                { item: "5 diárias dos convidados", price: "R$150,00" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-base sm:text-lg text-[#2A2F31]">{item.item}:</span>
                  <span className="text-base sm:text-lg font-semibold text-[#2A2F31]">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xl sm:text-2xl font-bold text-[#2A2F31] mb-2">VALOR TOTAL DOS BENEFÍCIOS:</p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2A2F31] line-through">R$ 630,00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section ref={pricingRef} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 md:mb-16 text-center">
            Escolha o plano que liberta você.
          </h2>

          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Platinum Plan */}
            <div className="relative">
              <Card className="relative p-4 sm:p-6 lg:p-8 shadow-xl border-2 border-[#f15927] h-full">
                <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-[#f15927] text-white px-2 sm:px-3 lg:px-4 py-1 text-xs sm:text-sm z-10">
                  O MAIS ESCOLHIDO
                </Badge>

                <CardContent className="p-0 text-center flex flex-col h-full">
                  <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4 mt-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#f15927]" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2A2F31]">PLANO PLATINUM</h3>
                  </div>

                  <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2A2F31]">
                        R$129,90
                      </span>
                      <span className="text-sm sm:text-base lg:text-xl text-gray-600">/mês</span>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left flex-grow">
                    {[
                      "Débito Recorrente (economia garantida)",
                      "SEM TAXA DE ADESÃO (economia de R$150)",
                      "SEM FIDELIDADE! Cancele quando quiser",
                      "Acesso a TUDO: todas as aulas, equipamentos e benefícios",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#f15927] mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-[#2A2F31] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-[#f15927] hover:bg-[#d14420] text-white py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold mt-auto"
                    onClick={handlePlatinumClick}
                  >
                    <span className="block sm:hidden">GARANTIR PLATINUM</span>
                    <span className="hidden sm:block">QUERO GARANTIR MEU PLANO PLATINUM</span>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Avulso Plan */}
            <div className="relative">
              <Card className="p-4 sm:p-6 lg:p-8 shadow-lg h-full">
                <CardContent className="p-0 text-center flex flex-col h-full">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2A2F31] mb-3 sm:mb-4">PLANO AVULSO</h3>

                  <div className="mb-4 sm:mb-6 lg:mb-8">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2A2F31]">
                        R$149,90
                      </span>
                      <span className="text-sm sm:text-base lg:text-xl text-gray-600">/mês</span>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-left flex-grow">
                    {[
                      "Pagamento Mensal (sem débito automático)",
                      "Pague apenas o mês que for usar",
                      "Acesso a TUDO: todas as aulas, equipamentos e benefícios",
                      "Flexibilidade total para sua rotina",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 sm:gap-3">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#f15927] mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-[#2A2F31] leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-[#f15927] text-[#f15927] hover:bg-[#f15927] hover:text-white py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold mt-auto"
                    onClick={handleAvulsoClick}
                  >
                    <span className="block sm:hidden">ESCOLHER AVULSO</span>
                    <span className="hidden sm:block">ESCOLHER O PLANO AVULSO</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 md:mb-16 text-center">
            A transformação de quem já é Panobianco.
          </h2>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            <Card className="p-6 sm:p-8 shadow-lg">
              <CardContent className="p-0">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[#f15927] mb-4 sm:mb-6" />
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  "Nunca pensei que fosse gostar tanto de treinar! As aulas são incríveis, os equipamentos são modernos
                  e o ambiente é super motivador. Já trouxe várias amigas e todas se apaixonaram também!"
                </p>
                <p className="font-bold text-[#2A2F31]">- Juliana S.</p>
              </CardContent>
            </Card>

            <Card className="p-6 sm:p-8 shadow-lg">
              <CardContent className="p-0">
                <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-[#f15927] mb-4 sm:mb-6" />
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  "O que mais me impressiona é a variedade. Hoje faço musculação, amanhã Muay Thai, depois FitDance.
                  Nunca fico entediado e os resultados apareceram muito mais rápido do que eu esperava!"
                </p>
                <p className="font-bold text-[#2A2F31]">- Marcos P.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2A2F31] mb-8 sm:mb-12 md:mb-16 text-center">
            Ainda tem dúvidas? A gente responde.
          </h2>

          <div className="space-y-3 sm:space-y-4">
            {[
              {
                question: "Como funciona para levar convidados?",
                answer:
                  "Você tem direito a 5 convites por mês. Basta agendar através do nosso app e seus convidados terão acesso completo à academia no dia escolhido, incluindo todas as aulas e equipamentos.",
              },
              {
                question: "Preciso agendar as aulas coletivas?",
                answer:
                  "Algumas aulas mais concorridas podem precisar de agendamento, mas a maioria é por ordem de chegada. Nosso app mostra em tempo real a disponibilidade de cada aula.",
              },
              {
                question: "O que significa 'sem fidelidade' no Plano Platinum?",
                answer:
                  "Significa que você pode cancelar seu plano a qualquer momento, sem multas ou taxas de cancelamento. Basta avisar com 30 dias de antecedência.",
              },
              {
                question: "A avaliação com nutricionista está realmente inclusa?",
                answer:
                  "Sim! Todo aluno novo tem direito a uma avaliação física completa com nosso nutricionista, incluindo medidas, composição corporal e orientações personalizadas.",
              },
            ].map((faq, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-6 text-left flex justify-between items-center hover:bg-gray-50"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3
                      className={`text-base sm:text-lg font-semibold ${
                        openFaq === index ? "text-[#f15927]" : "text-[#2A2F31]"
                      }`}
                    >
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#f15927]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  {openFaq === index && (
                    <div id={`faq-answer-${index}`} className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#2A2F31] text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para transformar sua relação com o exercício?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Junte-se a milhares de pessoas que já descobriram o prazer de se cuidar na Panobianco.
          </p>
          <Button
            size="lg"
            className="bg-[#f15927] hover:bg-[#d14420] text-white px-8 sm:px-12 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
            onClick={handleFinalCTAClick}
          >
            COMEÇAR AGORA - PLANO PLATINUM
          </Button>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsappButton />

      {/* Modal */}
      <SignupModal isOpen={isModalOpen} onClose={closeModal} />

      {/* Toaster */}
      <Toaster />
    </div>
  )
}
