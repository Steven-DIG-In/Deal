import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/login', '/api/auth']

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p))
    const token = request.cookies.get('dealiq_session')?.value

    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    if (pathname === '/login' && token) {
        return NextResponse.redirect(new URL('/deal-input', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
