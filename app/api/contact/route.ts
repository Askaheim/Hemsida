import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { from, email, message, receiverName, receiverEmail } = body

        // 1. Hämta de säkra miljövariablerna på servern
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        const privateKey = process.env.EMAILJS_PRIVATE_KEY

        // Säkerhetskontroll på servern
        if (!serviceID || !templateID || !privateKey || !publicKey) {
            console.error('Serverkonfiguration saknas!')
            return NextResponse.json({ error: 'Serverkonfigurationsfel' }, { status: 500 })
        }

        // 2. Skicka datan till EmailJS REST API
        const emailJsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                service_id: serviceID,
                template_id: templateID,
                user_id: privateKey, // När man kör via backend är det Private Key som används här
                template_params: {
                    from_name: from,
                    to_name: receiverName,
                    from_email: email,
                    to_email: receiverEmail,
                    message: message,
                },
            }),
        })

        // 3. Kolla om EmailJS faktiskt godkände anropet
        if (!emailJsResponse.ok) {
            const errorText = await emailJsResponse.text()
            console.error('EmailJS API fel:', errorText)
            return NextResponse.json({ error: 'Kunde inte skicka mailet via EmailJS' }, { status: 400 })
        }

        // Om allt gick vägen – NU kan vi skicka tillbaka en riktig success!
        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('Ett oväntat fel uppstod i API-rutten:', error)
        return NextResponse.json({ error: 'Internt serverfel' }, { status: 500 })
    }
}