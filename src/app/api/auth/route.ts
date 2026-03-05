import { NextRequest, NextResponse } from 'next/server'

// Demo credentials — override via Vercel environment variables:
// DEMO_EMAIL and DEMO_PASSWORD
const VALID_USERS = [
    {
        email: process.env.DEMO_EMAIL || 'demo@aspectadvisory.eu',
        password: process.env.DEMO_PASSWORD || 'DealIQ2025',
        name: 'Stuart Thomson',
    },
    {
        email: process.env.DEMO_EMAIL_2 || 'analyst@aspectadvisory.eu',
        password: process.env.DEMO_PASSWORD_2 || 'DealIQ2025',
        name: 'Analyst User',
    },
]

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        const user = VALID_USERS.find(
            u => u.email.toLowerCase() === email?.toLowerCase() && u.password === password
        )

        if (!user) {
            return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
        }

        const response = NextResponse.json({ success: true, name: user.name })
        response.cookies.set('dealiq_session', Buffer.from(user.email).toString('base64'), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })
        return response
    } catch {
        return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true })
    response.cookies.delete('dealiq_session')
    return response
}
