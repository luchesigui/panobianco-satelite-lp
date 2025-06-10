import { NextResponse } from "next/server"

interface RequestBody {
  name: string
  whatsapp: string
  email: string
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json()
    const { name, whatsapp, email } = body

    if (!name || !whatsapp || !email) {
      return NextResponse.json({ message: "Campos obrigatórios faltando" }, { status: 400 })
    }

    // Using Resent to send email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESENT_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Panobianco Landing Page <onboarding@resend.dev>",
        to: "gui.olhenrique@gmail.com",
        subject: "Nova venda pela LP",
        html: `
          <h2>Nova venda pela Landing Page</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>WhatsApp:</strong> ${whatsapp}</p>
          <p><strong>Email:</strong> ${email}</p>
        `,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.error("Resent API error:", errorData)
      return NextResponse.json({ message: "Erro ao enviar email" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
