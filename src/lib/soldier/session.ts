import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const SESSION_COOKIE = 'soldier.session'
const ADMIN_COOKIE = 'soldier.admin'
const SESSION_TTL = 60 * 60 * 24 * 7 // 7 days

const getSessionSecret = () => {
  const secret = process.env.SOLDIER_SESSION_SECRET
  if (!secret) {
    throw new Error('SOLDIER_SESSION_SECRET is not set')
  }
  return new TextEncoder().encode(secret)
}

export const setTeamSession = async (teamId: string) => {
  const maxAge = SESSION_TTL
  const token = await new SignJWT({ teamId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSessionSecret())

  const cookieStore = cookies()

  // Clear legacy cookie scoped to /soldier
  cookieStore.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/soldier',
    maxAge: 0,
  })

  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  })
}

export const getTeamSession = async () => {
  const cookieStore = cookies()
  const raw = cookieStore.get(SESSION_COOKIE)

  if (!raw?.value) {
    return null
  }

  try {
    const payload = await jwtVerify(raw.value, getSessionSecret())
    const teamId = payload.payload.teamId

    if (typeof teamId !== 'string') {
      return null
    }

    return { teamId }
  } catch {
    return null
  }
}

export const clearTeamSession = () => {
  const cookieStore = cookies()
  cookieStore.set({
    name: SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}

export const setAdminSession = async (email: string) => {
  const maxAge = SESSION_TTL
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(getSessionSecret())

  const cookieStore = cookies()

  // Clear legacy cookie scoped to /soldier
  cookieStore.set({
    name: ADMIN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/soldier',
    maxAge: 0,
  })

  cookieStore.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  })
}

export const getAdminSession = async () => {
  const cookieStore = cookies()
  const raw = cookieStore.get(ADMIN_COOKIE)
  if (!raw?.value) return null
  try {
    const payload = await jwtVerify(raw.value, getSessionSecret())
    const email = payload.payload.email
    if (typeof email !== 'string') return null
    return { email }
  } catch {
    return null
  }
}

export const clearAdminSession = () => {
  const cookieStore = cookies()
  cookieStore.set({
    name: ADMIN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
}
