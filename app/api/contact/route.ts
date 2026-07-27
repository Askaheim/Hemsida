import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { from, email, message, receiverName, receiverEmail } = body

        // 1. Fetch env variables for EmailJS
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const privateKey = process.env.EMAILJS_PRIVATE_KEY

        // securely check if all required env variables are present
        if (!serviceID || !templateID || !privateKey || !publicKey) {
            console.error('Serverkonfiguration saknas!')
            return NextResponse.json({ error: 'Serverkonfigurationsfel' }, { status: 500 })
        }

        // 2. Send data to EmailJS REST API
        const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: privateKey, // When using the private key, ensure it's kept secret and not exposed in client-side code
                template_params: {
                    from_name: from,
                    to_name: receiverName,
                    from_email: email,
                    to_email: receiverEmail,
                    message: message,
                },
            }),
        })

        // 3. Check if EmailJS actually approved the request
        if (!emailJsResponse.ok) {
            const errorText = await emailJsResponse.text()
            console.error('EmailJS API error:', errorText)
            return NextResponse.json({ error: 'Kunde inte skicka mailet via EmailJS' }, { status: 400 })
        }

        // if everything went well, return a success response
        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Ett oväntat fel uppstod i API-rutten:', error)
        return NextResponse.json({ error: 'Internt serverfel' }, { status: 500 })
    }
}