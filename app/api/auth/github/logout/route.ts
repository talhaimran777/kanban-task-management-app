import { NextResponse } from 'next/server'
import { getSession } from 'src/lib/server/session'

export async function POST() {
    const session = await getSession()
    session.destroy()
    return NextResponse.json({ ok: true })
}
