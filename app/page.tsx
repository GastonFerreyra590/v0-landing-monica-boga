"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  CheckCircle,
  X,
  Menu,
  Mail,
  MessageCircle,
  Target,
  ArrowLeft,
  Linkedin,
  Instagram,
  Loader2,
  Send,
} from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  const [showMiniTest, setShowMiniTest] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showPreTestForm, setShowPreTestForm] = useState(false)
  const [preTestData, setPreTestData] = useState({ name: "", lastName: "", email: "" })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [formData, setFormData] = useState({ nombre: "", apellido: "", email: "" })
  const [showMiniTestAfterForm, setShowMiniTestAfterForm] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [emailCaptureData, setEmailCaptureData] = useState({ name: "", email: "" })

  const testQuestions = [
    {
      question: "¿Cómo te sentís con el rol que ocupás hoy como líder?",
      options: [
        { value: "a", text: "Siento que es mucho esfuerzo, que son muchos frentes abiertos a la vez" },
        { value: "b", text: "Lo ejerzo, pero hay días que me incomoda o me genera tensión" },
        { value: "c", text: "Me siento seguro/a y en crecimiento, aunque siempre hay desafíos" },
      ],
    },
    {
      question: "¿Qué nivel de energía tenés al comenzar tu semana laboral?",
      options: [
        { value: "a", text: "Me pesa antes de empezar, siento cansancio o resistencia" },
        { value: "b", text: "Arranco con ganas, pero me agoto rápido en el día a día" },
        { value: "c", text: "Empiezo con energía y claridad, aunque algunos días sean intensos" },
      ],
    },
    {
      question: "¿Qué tan confiado/a estás en que podés generar cambios reales en tu equipo?",
      options: [
        { value: "a", text: "Honestamente, siento que haga lo que haga las cosas van a seguir igual" },
        { value: "b", text: "Tengo momentos donde creo que sí, pero otros donde dudo mucho" },
        { value: "c", text: "Confío en mi capacidad de impacto, aunque no siempre sea inmediato" },
      ],
    },
    {
      question: "¿Tenés conversaciones difíciles pendientes con tu equipo?",
      options: [
        { value: "a", text: "Varias, y me agota solo pensar por dónde empezar" },
        { value: "b", text: "Algunas, pero me cuesta mucho abordarlas o las postergo" },
        { value: "c", text: "Las encaro cuando es necesario, aunque siempre puedo mejorar" },
      ],
    },
    {
      question: "¿Cómo está el equilibrio entre tu rol de líder y tu bienestar personal?",
      options: [
        { value: "a", text: "Mi trabajo invade mi espacio personal, mi energía y mi paz mental" },
        { value: "b", text: "A veces logro equilibrarlo, pero otras siento que me desborda" },
        { value: "c", text: "Procuro cuidar mis espacios, aunque no siempre es fácil" },
      ],
    },
    {
      question: "Al final del día, ¿cómo te sentís con lo que lograste?",
      options: [
        { value: "a", text: "Agotado/a, como si hubiera corrido todo el día sin avanzar mucho" },
        { value: "b", text: "Satisfecho/a pero cansado/a, con la sensación de que falta algo" },
        { value: "c", text: "Tranquilo/a, sabiendo que hice lo que pude con lo que tenía" },
      ],
    },
    {
      question: "¿Qué tan presente estás en las decisiones estratégicas de tu equipo?",
      options: [
        { value: "a", text: "Estoy más apagando incendios que pensando el rumbo" },
        { value: "b", text: "Participo, pero muchas veces desde la urgencia o la reactividad" },
        { value: "c", text: "Estoy cada vez más presente y alineado/a con la visión conjunta" },
      ],
    },
    {
      question: "¿Cómo te ves liderando en el futuro?",
      options: [
        { value: "a", text: "Honestamente, no sé si puedo sostener este ritmo mucho tiempo más" },
        { value: "b", text: "Sé que algo tiene que cambiar, pero no tengo claro qué exactamente" },
        { value: "c", text: "Confío en que voy a seguir creciendo y liderando mejor" },
      ],
    },
  ]

  const calculateResult = () => {
    const counts = { a: 0, b: 0, c: 0 }
    answers.forEach((answer) => {
      if (answer in counts) {
        counts[answer as keyof typeof counts]++
      }
    })

    const maxCount = Math.max(counts.a, counts.b, counts.c)
    if (counts.a === maxCount) return "a"
    if (counts.b === maxCount) return "b"
    return "c"
  }

  const getTestResult = () => {
    const result = calculateResult()

    const results = {
      a: {
        emoji: "🔴",
        title: "El liderazgo te está drenando más de lo que te impulsa",
        description:
          "Te veo. Sé lo que es sentir que estás dando todo y que igual no alcanza. Estás sosteniendo mucho con poca energía interna. El problema no es tu capacidad ni tu compromiso – es que estás liderando desde un lugar que te agota en lugar de nutrirte.",
        advice: [
          "Hacé una pausa consciente cada mañana antes de abrir el mail o atender el primer problema. Preguntate: '¿Desde dónde quiero liderar hoy?'",
          "Delegá al menos una cosa por día que estés haciendo por costumbre, no porque realmente necesite tu intervención directa.",
          "Al final del día, escribí una cosa que hiciste bien. No lo que faltó, no lo que salió mal.",
          "Recordá por qué dijiste 'sí' a este rol. Esa razón sigue siendo válida, solo está tapada por el ruido diario.",
        ],
      },
      b: {
        emoji: "🟡",
        title: "Sabés que algo tiene que cambiar, pero no tenés claro qué",
        description:
          "Estás en ese lugar incómodo donde no estás mal, pero tampoco estás bien. Tenés momentos donde todo fluye, pero también esas tensiones constantes, esas decisiones que postergás, esa sensación de estar siempre corriendo detrás de algo.",
        advice: [
          "Hacé una lista de todo lo que te está generando tensión. Sin censura, volcá todo en papel.",
          "Elegí UNA conversación difícil pendiente y agendala para esta semana.",
          "Definí dos 'no negociables' para tu semana: dos espacios que vas a proteger sí o sí para recargar energía.",
          "Antes de tomar cualquier decisión importante, preguntate: '¿Esto me acerca o me aleja de donde quiero estar como líder?'",
        ],
      },
      c: {
        emoji: "🟢",
        title: "Estás construyendo algo sólido (y eso merece reconocimiento)",
        description:
          "Se nota que estás trabajando en vos mismo y que tenés claridad sobre tu rumbo. No todo es perfecto – y está bien que no lo sea. Pero estás liderando desde un lugar consciente, cuidando tu energía y creciendo sin sacrificar tu bienestar.",
        advice: [
          "Documentá tus 'momentos de liderazgo exitoso': Cuando las cosas fluyen, cuando tu equipo responde bien.",
          "Mentoreá a alguien de tu equipo en algo específico. Enseñar lo que sabés te va a mostrar cuánto realmente sabés.",
          "Diseñá un ritual de transición entre tu rol de líder y tu vida personal.",
          "Planificá tu crecimiento: ¿En qué área de liderazgo querés seguir creciendo los próximos 6 meses?",
        ],
      },
    }

    return results[result]
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")
    setSubmitStatus(null)

    try {
      // Validación básica
      if (!formData.nombre.trim() || !formData.apellido.trim() || !formData.email.trim()) {
        setSubmitMessage("Por favor, completá todos los campos.")
        setIsSubmitting(false)
        return
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setSubmitMessage("Por favor, ingresá un email válido.")
        setIsSubmitting(false)
        return
      }

      const formDataToSend = new FormData()
      formDataToSend.append("nombre", formData.nombre)
      formDataToSend.append("apellido", formData.apellido)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("_subject", "Nuevo contacto desde la web")
      formDataToSend.append("_captcha", "false")
      formDataToSend.append("_url", window.location.href)

      console.log("[v0] Enviando formulario de contacto...")

      // Enviar a FormSubmit
      const response = await fetch("https://formsubmit.co/monicabogacoach@gmail.com", {
        method: "POST",
        body: formDataToSend,
      })

      console.log("[v0] Respuesta del servidor:", response.status, response.statusText)

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage(
          `¡Mensaje enviado exitosamente! Si no recibís el email en unos minutos, revisá tu carpeta de spam.`,
        )
        console.log("[v0] Email enviado correctamente")
        // Limpiar formulario
        setFormData({ nombre: "", apellido: "", email: "" })

        // Cerrar modal después de 5 segundos para dar tiempo a leer el mensaje
        setTimeout(() => {
          setShowForm(false)
          setSubmitMessage("")
          setSubmitStatus(null)
        }, 5000)
      } else {
        const errorText = await response.text()
        console.error("[v0] Error de FormSubmit:", errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }
    } catch (error) {
      console.error("[v0] Error completo:", error)
      setSubmitStatus("error")
      setSubmitMessage("Hubo un error al enviar el mensaje. Por favor escribí directamente a monicabogacoach@gmail.com")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Iniciando envío de datos del pre-test", preTestData)

    if (preTestData.name && preTestData.lastName && preTestData.email) {
      setIsSubmitting(true)
      setSubmitStatus(null)

      try {
        const formDataToSend = new FormData()
        formDataToSend.append("nombre", preTestData.name)
        formDataToSend.append("apellido", preTestData.lastName)
        formDataToSend.append("email", preTestData.email)
        formDataToSend.append("_subject", "Nuevo contacto desde la web")
        formDataToSend.append("_captcha", "false")
        formDataToSend.append("_url", window.location.href)

        console.log("[v0] Enviando formulario pre-test...")

        // Enviar a FormSubmit
        const response = await fetch("https://formsubmit.co/monicabogacoach@gmail.com", {
          method: "POST",
          body: formDataToSend,
        })

        console.log("[v0] Respuesta del servidor:", response.status, response.statusText)

        if (response.ok) {
          setSubmitStatus("success")
          console.log("[v0] Email enviado exitosamente")

          if (showMiniTestAfterForm) {
            alert(
              `¡Perfecto ${preTestData.name}! Los datos se enviaron exitosamente. Si no recibís confirmación, revisá tu spam. Ahora podés comenzar el diagnóstico.`,
            )
          } else {
            alert(
              `¡Gracias ${preTestData.name}! Los datos se enviaron exitosamente. Si no recibís confirmación, revisá tu spam. Mónica te contactará pronto.`,
            )
          }

          setTimeout(() => {
            setShowPreTestForm(false)
            if (showMiniTestAfterForm) {
              setShowMiniTest(true)
              setCurrentQuestion(0)
              setAnswers([])
              setShowResult(false)
            }
            setSubmitStatus(null)
            console.log("[v0] Proceso completado correctamente")
          }, 1000)
        } else {
          const errorText = await response.text()
          console.error("[v0] Error de FormSubmit:", errorText)
          throw new Error(`Error ${response.status}: ${errorText}`)
        }
      } catch (error) {
        console.error("[v0] Error al enviar email:", error)
        setSubmitStatus("error")

        if (showMiniTestAfterForm) {
          alert(
            `¡Hola ${preTestData.name}! Hubo un error al enviar los datos, pero podés continuar con el diagnóstico.`,
          )
          setShowPreTestForm(false)
          setShowMiniTest(true)
          setCurrentQuestion(0)
          setAnswers([])
          setShowResult(false)
        } else {
          alert(`Hubo un error al enviar el mensaje. Por favor escribí directamente a monicabogacoach@gmail.com`)
          setShowPreTestForm(false)
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleEmailCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("name", emailCaptureData.name)
      formData.append("email", emailCaptureData.email)
      formData.append("_subject", "Solicitud de resultados del test de liderazgo")
      formData.append("_captcha", "false")
      formData.append(
        "message",
        `${emailCaptureData.name} completó el test de liderazgo y solicita recibir los resultados.`,
      )
      formData.append("_url", window.location.href)

      console.log("[v0] Enviando captura de email del test...")

      const response = await fetch("https://formsubmit.co/monicabogacoach@gmail.com", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Respuesta del servidor:", response.status, response.statusText)

      if (response.ok) {
        setShowEmailCapture(false)
        setShowResult(true)
        console.log("[v0] Email de test enviado correctamente")
        alert(
          `¡Perfecto ${emailCaptureData.name}! Te enviamos los resultados a tu email. Si no los recibís, revisá tu carpeta de spam. También podés verlos ahora.`,
        )
      } else {
        const errorText = await response.text()
        console.error("[v0] Error de FormSubmit:", errorText)
        throw new Error(`Error ${response.status}: ${errorText}`)
      }
    } catch (error) {
      console.error("[v0] Error al enviar email:", error)
      setShowEmailCapture(false)
      setShowResult(true)
      alert(`¡Hola ${emailCaptureData.name}! Hubo un error al enviar el email, pero podés ver tus resultados ahora.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInfoRequest = () => {
    setShowMiniTestAfterForm(false)
    setShowPreTestForm(true)
  }

  const handleMiniTestStart = () => {
    setShowMiniTest(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setTestCompleted(false)
    setShowEmailCapture(false)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hola Mónica! Me interesa conocer más sobre tu mentoría de liderazgo. ¿Podemos conversar?",
    )
    window.open(`https://wa.me/5491140714477?text=${message}`, "_blank")
  }

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setTestCompleted(true)
      setShowEmailCapture(true)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const resetTest = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowForm(false)
      setShowMiniTest(false)
      setShowPreTestForm(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handlePhoneCall = () => {
    window.location.href = "tel:+541143218765"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#D8F8EB] z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 bg-gradient-to-br from-[#173E63] to-[#173E63]/80 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "#173E63" }}
              >
                <span className="text-white font-bold text-sm" style={{ color: "white" }}>
                  MB
                </span>
              </div>
              <span className="font-serif text-xl font-bold text-[#173E63] tracking-tight">Mónica Boga</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("sobre-mi")}
                className="text-slate-700 hover:text-[#173E63] transition-all duration-300 font-medium relative group"
              >
                Sobre Mí
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#173E63] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("testimonios")}
                className="text-slate-700 hover:text-[#173E63] transition-all duration-300 font-medium relative group"
              >
                Testimonios
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#173E63] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-slate-700 hover:text-[#173E63] transition-all duration-300 font-medium relative group"
              >
                Contacto
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#173E63] transition-all duration-300 group-hover:w-full"></span>
              </button>
              <Button
                className="bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:from-[#00FF88] hover:to-[#00FF88] text-black px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(0,255,136,0.5)] hover:scale-105 font-semibold animate-pulse"
                onClick={handleInfoRequest}
              >
                Más información
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#173E63]">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-[#D8F8EB] bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection("sobre-mi")}
                  className="block px-3 py-2 text-slate-700 hover:text-[#173E63] transition-colors font-medium w-full text-left"
                >
                  Sobre Mí
                </button>
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="block px-3 py-2 text-slate-700 hover:text-[#173E63] transition-colors font-medium w-full text-left"
                >
                  Testimonios
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="block px-3 py-2 text-slate-700 hover:text-[#173E63] transition-colors font-medium w-full text-left"
                >
                  Contacto
                </button>
                <Button
                  className="bg-[#173E63] hover:bg-[#173E63]/90 text-white w-full mt-2 rounded-full"
                  onClick={handleInfoRequest}
                >
                  Más información
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#173E63] via-[#173E63] to-[#173E63]/90 overflow-hidden"
        style={{ backgroundColor: "#173E63" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-6">
                <Button
                  size="lg"
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-16 py-8 text-2xl rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.6)] hover:scale-105 shadow-lg font-bold w-fit"
                  onClick={handleMiniTestStart}
                  style={{ backgroundColor: "#FF6B35", color: "white" }}
                >
                  Quiero mi diagnóstico
                </Button>

                <h1
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  style={{ color: "white" }}
                >
                  Tu forma de liderar te juega a favor o en contra?
                </h1>

                <div className="space-y-5 text-lg text-white/90 leading-relaxed">
                  <p className="text-white" style={{ color: "white" }}>
                    Descubrilo en solo 2 minutos de tu tiempo y recibí un diagnóstico claro de cómo transitas tu rol.
                  </p>
                  <p className="text-white" style={{ color: "white" }}>
                    Una pausa para repensar dónde estás y hacia dónde querés llegar.
                  </p>
                  <p className="text-white" style={{ color: "white" }}>
                    Te ayudo a ordenar tu rol y tu equipo para liderar con foco, sin perderte en el proceso.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-16 py-6 text-xl rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,107,53,0.6)] hover:scale-105 shadow-lg font-bold w-full sm:w-auto min-w-[400px]"
                  onClick={handleMiniTestStart}
                  style={{ backgroundColor: "#FF6B35", color: "white" }}
                >
                  <Target className="w-6 h-6 mr-3" />
                  Hacer Mini-Test
                </Button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#C3F3E2]/40 to-[#D7F2FF]/40 rounded-3xl blur-3xl opacity-60 scale-110 animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-[#173E63]/10 to-[#173E63]/5 rounded-3xl blur-2xl"></div>
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Moni%202.jpg-Rd9C3sXRmtNe5u2ITHj0ABJXVWrkTO.jpeg"
                  alt="Mónica Boga - Coach Profesional"
                  className="relative w-80 h-80 sm:w-96 sm:h-96 object-cover rounded-3xl shadow-2xl border-4 border-white/70 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Interactive Mini-Test Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 hover:shadow-3xl transition-all duration-300">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#00E5FF]/10 text-[#173E63] px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Test completo - 2 minutos
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173E63] mb-4">
                ¿Cómo está tu liderazgo? ¡Descubrilo ahora!
              </h2>
              <p className="text-slate-600 text-lg">Diagnóstico completo para conocer tu estado actual como líder</p>
            </div>

            {showEmailCapture ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-sans text-2xl font-bold text-cyan-600 mb-4">¡Completaste el diagnóstico!</h4>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                    Para recibir tu resultado personalizado, dejanos tu email:
                  </p>
                </div>

                <form onSubmit={handleEmailCaptureSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cyan-600 mb-2">¿Cómo te llamás?</label>
                    <input
                      type="text"
                      required
                      value={emailCaptureData.name}
                      onChange={(e) => setEmailCaptureData({ ...emailCaptureData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-cyan-50/50"
                      placeholder="Tu nombre..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-cyan-600 mb-2">
                      Tu email para recibir los resultados
                    </label>
                    <input
                      type="email"
                      required
                      value={emailCaptureData.email}
                      onChange={(e) => setEmailCaptureData({ ...emailCaptureData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-cyan-50/50"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-lg font-bold"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Recibir mi resultado
                      </>
                    )}
                  </Button>
                </form>
              </div>
            ) : testCompleted ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-6">{getTestResult().emoji}</div>
                  <h4 className="font-sans text-2xl font-bold text-cyan-600 mb-4">
                    {emailCaptureData.name ? `¡Hola ${emailCaptureData.name}! ` : ""}
                    {getTestResult().title}
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                    {getTestResult().description}
                  </p>
                </div>

                <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                  <h5 className="font-bold text-cyan-700 mb-4 text-lg">Para empezar hoy mismo:</h5>
                  <ul className="space-y-3">
                    {getTestResult().advice.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed font-medium">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl p-6 text-white text-center shadow-lg">
                  <h5 className="font-bold text-xl mb-2">¿Te reconociste en este resultado?</h5>
                  <p className="mb-4 opacity-90 font-medium">
                    Si algo de esto resonó en vos, estás en el momento perfecto para dar el siguiente paso.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:from-[#00FF88] hover:to-[#00CC6A] text-black px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] hover:scale-110 font-bold"
                    onClick={() => setShowPreTestForm(true)}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contactar a Mónica
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      setCurrentQuestion(0)
                      setAnswers([])
                      setShowResult(false)
                      setTestCompleted(false)
                      setShowEmailCapture(false)
                      setEmailCaptureData({ name: "", email: "" })
                    }}
                    className="border-3 border-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-110 font-bold"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Hacer el test nuevamente
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-cyan-600">
                      Pregunta {currentQuestion + 1} de {testQuestions.length}
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-cyan-200 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-sans text-xl font-bold text-cyan-700 leading-relaxed bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    {testQuestions[currentQuestion].question}
                  </h4>

                  <div className="space-y-3">
                    {testQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.value)}
                        className={`w-full text-left p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                          answers[currentQuestion] === option.value
                            ? "border-cyan-400 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 shadow-lg shadow-cyan-200"
                            : "border-cyan-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-full border-3 mt-1 flex-shrink-0 transition-all duration-300 ${
                              answers[currentQuestion] === option.value
                                ? "border-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg"
                                : "border-cyan-300 hover:border-blue-400"
                            }`}
                          >
                            {answers[currentQuestion] === option.value && (
                              <div className="w-2 h-2 bg-white rounded-full m-0.5 animate-pulse"></div>
                            )}
                          </div>
                          <span className="text-gray-900 leading-relaxed font-medium">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between pt-6 border-t-2 border-cyan-200">
                    <Button
                      variant="outline"
                      onClick={handlePrevQuestion}
                      disabled={currentQuestion === 0}
                      className="border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-white bg-transparent rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-110 disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>

                    <Button
                      onClick={handleNextQuestion}
                      disabled={!answers[currentQuestion]}
                      className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 hover:from-cyan-500 hover:via-blue-500 hover:to-green-500 text-white rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50"
                    >
                      {currentQuestion === testQuestions.length - 1 ? "Finalizar Test" : "Siguiente"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Monica Section */}
      <section id="sobre-mi" className="py-24 px-4 scroll-mt-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-last lg:order-first">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#C3F3E2]/20 to-[#D7F2FF]/20 rounded-3xl blur-2xl"></div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Copia%20de%20image00013-dQLIgSkY36bkCytl3MN4yysuIkr6H2.jpeg"
                  alt="Mónica Boga trabajando"
                  width={500}
                  height={600}
                  className="relative rounded-3xl shadow-2xl mx-auto lg:mx-0 border-4 border-white/50"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <Badge
                  variant="outline"
                  className="text-[#173E63] border-[#C3F3E2] bg-gradient-to-r from-[#C3F3E2]/30 to-[#D7F2FF]/30 mb-6 px-4 py-2 rounded-full"
                >
                  Mi Historia
                </Badge>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173E63] mb-6">Soy Mónica Boga</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#173E63] to-[#C3F3E2] rounded-full mb-6"></div>
              </div>

              <div className="space-y-6 text-slate-700 leading-relaxed">
                <p className="text-lg">
                  Durante más de 20 años, lideré desde adentro una empresa familiar. Ahí aprendí lo que no te enseñan en
                  ningún manual: que podés tener logros, estructura y reconocimiento… y aún así sentirte perdido/a en tu
                  propio rol.
                </p>
                <p className="text-lg">
                  Yo también estuve ahí: sosteniendo a todos sin tiempo para preguntarme si eso era lo que realmente
                  quería. Hasta que un día, me elegí.
                </p>
                <p className="text-lg">
                  Hoy acompaño a líderes como vos que también quieren hacerlo. Líderes que no buscan parecer fuertes,
                  sino sentirse en paz. Líderes que quieren dejar de apagar incendios y empezar a vivir su rol con
                  claridad, presencia y sentido.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00FF88] to-[#00FF88]/90 hover:from-[#00FF88]/90 hover:to-[#00FF88] text-black px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 shadow-lg"
                  onClick={handleInfoRequest}
                  style={{ backgroundColor: "#00FF88", color: "black" }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hacer el Test Gratis Ahora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonios" className="py-24 px-4 scroll-mt-16 bg-gradient-to-b from-[#EAFBF4] to-[#F4FCF9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="text-[#173E63] border-[#C3F3E2] bg-gradient-to-r from-[#C3F3E2]/30 to-[#D7F2FF]/30 mb-6 px-4 py-2 rounded-full"
            >
              Testimonios
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#173E63] mb-6">
              La Historia de Mis Clientes
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#173E63] to-[#C3F3E2] mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Conocé las experiencias de líderes que transformaron su manera de liderar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 bg-white/80 backdrop-blur-sm h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="flex text-[#173E63] mb-4">{"★".repeat(5)}</div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "Recomiendo a Mónica porque hizo un trabajo exitoso en el ámbito laboral. Logró detectar
                    inconvenientes en los equipos que los directivos no sabíamos que existían. Sus propuestas se
                    sostuvieron en el tiempo y logramos percibir claramente el retorno de la inversión."
                  </p>
                  <div className="border-t border-[#C3F3E2] pt-6">
                    <p className="font-semibold text-[#173E63] text-lg">Jose Merlo</p>
                    <p className="text-sm text-slate-600">Ericnet – intelligent Solution</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 bg-white/80 backdrop-blur-sm h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="flex text-[#173E63] mb-4">{"★".repeat(5)}</div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "El coaching me sirvió para lograr mayor confianza en mí misma como emprendedora, romper las
                    barreras que a veces uno se crea. Logré ordenar mis prioridades y transformar mis debilidades en
                    fortalezas."
                  </p>
                  <div className="border-t border-[#C3F3E2] pt-6">
                    <p className="font-semibold text-[#173E63] text-lg">Laura Morales</p>
                    <p className="text-sm text-slate-600">Laurem.art</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 border-0 bg-white/80 backdrop-blur-sm h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-2xl">
              <CardContent className="p-0">
                <div className="space-y-6">
                  <div className="flex text-[#173E63] mb-4">{"★".repeat(5)}</div>
                  <p className="text-slate-700 italic leading-relaxed">
                    "Logré alcanzar el 100% de los objetivos marcados. Mis principales logros incluyen: Identificar y
                    combatir los obstáculos que creía que me limitaban y bloqueaban en el desarrollo de mi liderazgo.
                    Definir y establecer objetivos a corto, medio y largo plazo, retadores y motivadores. Detectar mis
                    puntos fuertes y áreas de mejora, potenciando mi autoconocimiento personal. Asignar de forma
                    coherente las tareas y responsabilidades a mi equipo y disfrutar del tiempo necesario para centrarme
                    en las tareas que sí eran de mi ámbito de actuación. Además, disfruté del tiempo libre en mi vida
                    personal. Logré llevar a SIMOB a la Exposición Anual FITECMA 2022 (Feria Internacional de la Madera
                    & Tecnología) y fui conferencista, presentando las virtudes de nuestro software."
                  </p>
                  <div className="border-t border-[#C3F3E2] pt-6">
                    <p className="font-semibold text-[#173E63] text-lg">Melina Risso</p>
                    <p className="text-sm text-slate-600">Simob Software</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#173E63] mb-4">Testimonios en Video</h3>
              <div className="w-16 h-1 bg-gradient-to-r from-[#173E63] to-[#C3F3E2] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <iframe
                  src="https://www.instagram.com/p/C8c-0iRSm1O/embed/"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="rounded-xl"
                ></iframe>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <iframe
                  src="https://www.instagram.com/p/C1cvH9RuEFk/embed/"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency={true}
                  className="rounded-xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#173E63] via-[#173E63] to-[#173E63]/90 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
              backgroundSize: "80px 80px",
            }}
          ></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-8 leading-tight">
            Tu Certeza de Que Es Posible y Es Ahora
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#C3F3E2] to-white mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            El presente es el momento perfecto para tomar acción. Lo que hacés ahora está sembrando para tu futuro. Si
            decidís empezar hoy, verás cambios en tu liderazgo.
          </p>
          <p className="text-2xl font-bold text-[#C3F3E2] mb-12">¡No esperes más!</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#173E63] hover:bg-[#00FF88] hover:text-black px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] hover:scale-110 shadow-lg font-bold"
              onClick={handleInfoRequest}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Quiero más información
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-3 border-[#00E5FF] bg-gradient-to-r from-[#00E5FF] to-[#00D4FF] text-white hover:from-[#00E5FF] hover:to-[#00E5FF] px-12 py-6 text-xl rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,229,255,0.7)] hover:scale-115 font-bold animate-pulse shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              onClick={handleMiniTestStart}
            >
              <Target className="w-6 h-6 mr-3" />
              Hacer Mini-Test
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EAFBF4] to-[#F4FCF9]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-[#173E63] mb-6">Conectemos</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#173E63] to-[#C3F3E2] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto leading-relaxed">
            ¿Tenés preguntas? ¿Querés saber si mi mentoría es para vos? Contactame por el medio que prefieras.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C3F3E2] to-[#C3F3E2]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-[#173E63]" />
                </div>
                <h3 className="font-semibold text-lg text-[#173E63] mb-3">WhatsApp</h3>
                <p className="text-slate-600 mb-6 font-medium">+54 9 11 4071-4477</p>
                <Button
                  variant="link"
                  className="text-[#173E63] hover:text-[#173E63]/80 font-semibold transition-colors group"
                  onClick={handleWhatsAppContact}
                >
                  <span className="flex items-center gap-2">
                    Enviar mensaje <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D7F2FF] to-[#D7F2FF]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Mail className="w-8 h-8 text-[#173E63]" />
                </div>
                <h3 className="font-semibold text-lg text-[#173E63] mb-3">Email</h3>
                <p className="text-slate-600 mb-6 font-medium">monicabogacoach@gmail.com</p>
                <Button
                  variant="link"
                  className="text-[#173E63] hover:text-[#173E63]/80 font-semibold transition-colors group"
                  onClick={handleInfoRequest}
                >
                  <span className="flex items-center gap-2">
                    Enviar email <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#C3F3E2] to-[#C3F3E2]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Linkedin className="w-8 h-8 text-[#173E63]" />
                </div>
                <h3 className="font-semibold text-lg text-[#173E63] mb-3">LinkedIn</h3>
                <p className="text-slate-600 mb-6 font-medium">Conectemos profesionalmente</p>
                <Button
                  variant="link"
                  className="text-[#173E63] hover:text-[#173E63]/80 font-semibold transition-colors group"
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/monicabogacoachempresarialyejecutiva", "_blank")
                  }
                >
                  <span className="flex items-center gap-2">
                    Seguir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-2xl overflow-hidden">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D7F2FF] to-[#D7F2FF]/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Instagram className="w-8 h-8 text-[#173E63]" />
                </div>
                <h3 className="font-semibold text-lg text-[#173E63] mb-3">Instagram</h3>
                <p className="text-slate-600 mb-6 font-medium">Contenido y tips diarios</p>
                <Button
                  variant="link"
                  className="text-[#173E63] hover:text-[#173E63]/80 font-semibold transition-colors group"
                  onClick={() => window.open("https://www.instagram.com/monicabogacoach", "_blank")}
                >
                  <span className="flex items-center gap-2">
                    Seguir <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#173E63] to-[#173E63]/95 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[#173E63] font-bold text-sm">MB</span>
                </div>
                <span className="font-serif text-xl font-bold">Mónica Boga</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Mentoría estratégica para líderes que buscan claridad, energía y propósito.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
              <ul className="space-y-3 text-slate-300">
                <li>
                  <button
                    onClick={() => scrollToSection("sobre-mi")}
                    className="hover:text-white transition-colors hover:underline"
                  >
                    Sobre Mí
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("testimonios")}
                    className="hover:text-white transition-colors hover:underline"
                  >
                    Testimonios
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="hover:text-white transition-colors hover:underline"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-6">Contacto</h3>
              <div className="space-y-3 text-slate-300 mb-6">
                <p className="hover:text-white transition-colors">monicabogacoach@gmail.com</p>
                <p className="hover:text-white transition-colors">+54 11 4321-8765</p>
              </div>
              <div className="flex justify-center md:justify-end gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 transition-colors p-2"
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/monicabogacoachempresarialyejecutiva", "_blank")
                  }
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white hover:bg-white/10 transition-colors p-2"
                  onClick={() => window.open("https://www.instagram.com/monicabogacoach", "_blank")}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2025 Mónica Boga. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#173E63] mb-2">
                    {showMiniTestAfterForm ? "Diagnóstico de Liderazgo" : "Comienza tu cambio"}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {showMiniTestAfterForm
                      ? "Ingresa tus datos para acceder al diagnóstico completo"
                      : "Ingresa tus datos para recibir más información y comenzar tu cambio"}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForm(false)
                    setSubmitMessage("")
                    setFormData({ nombre: "", apellido: "", email: "" })
                  }}
                  className="text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {submitMessage && (
                <div
                  className={`p-4 rounded-xl mb-6 text-center border ${
                    submitMessage.includes("error") ||
                    submitMessage.includes("completá") ||
                    submitMessage.includes("válido")
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="text-[#173E63] font-medium text-base">
                    Tu nombre
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="¡Contanos tu nombre!"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-4 px-4 text-lg transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg hover:shadow-[#00E5FF]/30 bg-gradient-to-r from-white to-[#F4FCF9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido" className="text-[#173E63] font-medium text-base">
                    Tu apellido
                  </Label>
                  <Input
                    id="apellido"
                    type="text"
                    placeholder="¡Y tu apellido también!"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-4 px-4 text-lg transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg hover:shadow-[#00E5FF]/30 bg-gradient-to-r from-white to-[#F4FCF9]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#173E63] font-medium text-base">
                    Tu email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu-email-genial@ejemplo.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-4 px-4 text-lg transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg hover:shadow-[#00E5FF]/30 bg-gradient-to-r from-white to-[#F4FCF9]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00CC6A] to-[#00E5FF] hover:from-[#00CC6A] hover:to-[#00CC6A] text-white py-4 text-lg rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,204,106,0.4)] hover:scale-105 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <ArrowRight className="w-5 h-5" />
                      {showMiniTestAfterForm ? "Acceder al diagnóstico" : "Enviar información"}
                    </div>
                  )}
                </Button>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleWhatsAppContact}
                    className="flex-1 border-3 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-2xl bg-transparent transition-all duration-300 font-bold hover:scale-105 hover:shadow-lg"
                  >
                    📱 WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePhoneCall}
                    className="flex-1 border-3 border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4] hover:text-white rounded-2xl bg-transparent transition-all duration-300 font-bold hover:scale-105 hover:shadow-lg"
                  >
                    📞 Llamar
                  </Button>
                </div>

                <p className="text-sm text-slate-600 text-center leading-relaxed pt-2 bg-gradient-to-r from-[#F4FCF9] to-[#EAFBF4] p-3 rounded-xl border border-[#00E5FF]/30">
                  🌟 Al enviar este formulario, aceptás recibir comunicaciones súper útiles de Mónica sobre mentoría y
                  liderazgo.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {showPreTestForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl font-bold text-[#173E63]">
                  {showMiniTestAfterForm ? "Antes de comenzar el test" : "Comienza tu cambio"}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreTestForm(false)}
                  className="text-slate-400 hover:text-slate-600 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <p className="text-slate-600 mb-6 text-center text-sm">
                {showMiniTestAfterForm
                  ? "Completá tus datos para comenzar el diagnóstico. La información se enviará automáticamente al email de Mónica."
                  : "Ingresa tus datos para recibir más información y comenzar tu cambio"}
              </p>

              <form onSubmit={handlePreTestSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-[#00CC6A] font-bold text-lg flex items-center gap-2">
                    <span className="text-xl">👋</span> Nombre *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={preTestData.name}
                    onChange={(e) => setPreTestData({ ...preTestData, name: e.target.value })}
                    className="mt-2 border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-3 px-4 transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg bg-gradient-to-r from-white to-[#F4FCF9]"
                    placeholder="¡Tu nombre aquí!"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-[#00CC6A] font-bold text-lg flex items-center gap-2">
                    <span className="text-xl">✨</span> Apellido *
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={preTestData.lastName}
                    onChange={(e) => setPreTestData({ ...preTestData, lastName: e.target.value })}
                    className="mt-2 border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-3 px-4 transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg bg-gradient-to-r from-white to-[#F4FCF9]"
                    placeholder="¡Y tu apellido!"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#00CC6A] font-bold text-lg flex items-center gap-2">
                    <span className="text-xl">📧</span> Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={preTestData.email}
                    onChange={(e) => setPreTestData({ ...preTestData, email: e.target.value })}
                    className="mt-2 border-3 border-[#00E5FF] focus:border-[#00CC6A] focus:ring-[#00CC6A] rounded-2xl py-3 px-4 transition-all duration-300 hover:border-[#00FF88] hover:shadow-lg bg-gradient-to-r from-white to-[#F4FCF9]"
                    placeholder="tu-email@ejemplo.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#00CC6A] to-[#00E5FF] hover:from-[#00FF88] hover:to-[#00CC6A] text-white py-4 rounded-2xl transition-all duration-300 disabled:opacity-50 font-bold text-lg hover:shadow-[0_0_25px_rgba(0,204,106,0.5)] hover:scale-105 transform hover:-translate-y-1"
                >
                  {isSubmitting
                    ? "✨ Enviando..."
                    : showMiniTestAfterForm
                      ? "🚀 ¡Comenzar Mini-Test!"
                      : "💫 ¡Enviar datos!"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Updated minitest modal to handle new flow */}
      {showMiniTest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-cyan-200">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-sans text-2xl font-bold text-cyan-600">
                  ¿Cómo está tu liderazgo? ¡Descubrilo en 2 minutos!
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMiniTest(false)}
                  className="text-cyan-400 hover:text-cyan-600 rounded-full hover:bg-cyan-100 transition-all duration-300"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {showEmailCapture ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-sans text-2xl font-bold text-cyan-600 mb-4">¡Completaste el diagnóstico!</h4>
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                      Para recibir tu resultado personalizado, dejanos tu email:
                    </p>
                  </div>

                  <form onSubmit={handleEmailCaptureSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-cyan-600 mb-2">¿Cómo te llamás?</label>
                      <input
                        type="text"
                        required
                        value={emailCaptureData.name}
                        onChange={(e) => setEmailCaptureData({ ...emailCaptureData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-cyan-50/50"
                        placeholder="Tu nombre..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-cyan-600 mb-2">
                        Tu email para recibir los resultados
                      </label>
                      <input
                        type="email"
                        required
                        value={emailCaptureData.email}
                        onChange={(e) => setEmailCaptureData({ ...emailCaptureData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-cyan-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 bg-cyan-50/50"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-lg font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Recibir mi resultado
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : testCompleted ? (
                <>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl mb-6">{getTestResult().emoji}</div>
                      <h4 className="font-sans text-2xl font-bold text-cyan-600 mb-4">
                        {emailCaptureData.name ? `¡Hola ${emailCaptureData.name}! ` : ""}
                        {getTestResult().title}
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                        {getTestResult().description}
                      </p>
                    </div>

                    <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
                      <h5 className="font-bold text-cyan-700 mb-4 text-lg">Para empezar hoy mismo:</h5>
                      <ul className="space-y-3">
                        {getTestResult().advice.map((tip, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 leading-relaxed font-medium">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl p-6 text-white text-center shadow-lg">
                      <h5 className="font-bold text-xl mb-2">¿Te reconociste en este resultado?</h5>
                      <p className="mb-4 opacity-90 font-medium">
                        Si algo de esto resonó en vos, estás en el momento perfecto para dar el siguiente paso.
                      </p>
                      <p className="font-bold text-lg">
                        Te voy a ayudar a liderar con más confianza, tranquilidad y resultados genuinos.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#00FF88] to-[#00CC6A] hover:from-[#00FF88] hover:to-[#00CC6A] text-black px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,136,0.6)] hover:scale-110 font-bold"
                        onClick={() => {
                          setShowMiniTest(false)
                          setShowForm(true)
                        }}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contactar a Mónica
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setCurrentQuestion(0)
                          setAnswers([])
                          setShowResult(false)
                          setTestCompleted(false)
                          setShowEmailCapture(false)
                          setEmailCaptureData({ name: "", email: "" })
                        }}
                        className="border-3 border-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 text-white hover:from-cyan-500 hover:to-blue-500 px-8 py-4 text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] hover:scale-110 font-bold"
                      >
                        <Target className="w-5 h-5 mr-2" />🔄 Hacer el test nuevamente
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-cyan-600">
                        🔥 Pregunta {currentQuestion + 1} de {testQuestions.length}
                      </span>
                      <span className="text-sm font-bold text-blue-600">
                        {Math.round(((currentQuestion + 1) / testQuestions.length) * 100)}% ⚡
                      </span>
                    </div>
                    <div className="w-full bg-cyan-200 rounded-full h-3 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 h-3 rounded-full transition-all duration-500 shadow-lg"
                        style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-sans text-xl font-bold text-cyan-700 leading-relaxed bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                      💭 {testQuestions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3">
                      {testQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAnswerSelect(option.value)}
                          className={`w-full text-left p-4 rounded-2xl border-3 transition-all duration-300 transform hover:scale-105 ${
                            answers[currentQuestion] === option.value
                              ? "border-cyan-400 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 shadow-lg shadow-cyan-200"
                              : "border-cyan-200 hover:border-blue-300 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:shadow-md"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-5 h-5 rounded-full border-3 mt-1 flex-shrink-0 transition-all duration-300 ${
                                answers[currentQuestion] === option.value
                                  ? "border-cyan-400 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg"
                                  : "border-cyan-300 hover:border-blue-400"
                              }`}
                            >
                              {answers[currentQuestion] === option.value && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5 animate-pulse"></div>
                              )}
                            </div>
                            <span className="text-gray-900 leading-relaxed font-medium">{option.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between pt-6 border-t-2 border-cyan-200">
                      <Button
                        variant="outline"
                        onClick={handlePrevQuestion}
                        disabled={currentQuestion === 0}
                        className="border-2 border-cyan-400 text-cyan-600 hover:bg-cyan-400 hover:text-white bg-transparent rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-110 disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        ⬅️ Anterior
                      </Button>

                      <Button
                        onClick={handleNextQuestion}
                        disabled={!answers[currentQuestion]}
                        className="bg-gradient-to-r from-cyan-400 via-blue-400 to-green-400 hover:from-cyan-500 hover:via-blue-500 hover:to-green-500 text-white rounded-full px-6 py-3 font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg disabled:opacity-50"
                      >
                        {currentQuestion === testQuestions.length - 1 ? "🎉 Finalizar Test" : "Siguiente ➡️"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
