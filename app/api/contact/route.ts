import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()

    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID



    return NextResponse.json({ success: true })
}