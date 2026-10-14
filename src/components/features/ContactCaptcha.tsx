'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'

type CaptchaApi = {
  ready: (callback: () => void) => void
  render: (element: HTMLElement, options: {
    sitekey: string
    theme: string
    size: string
    callback: (token: string) => void
    'expired-callback': () => void
    'error-callback': () => void
  }) => number
  reset: (id: number) => void
}

declare global {
  interface Window { grecaptcha?: CaptchaApi }
}

export default function ContactCaptcha({ siteKey, resetCount, onToken, onError }: {
  siteKey: string
  resetCount: number
  onToken: (token: string) => void
  onError: (message: string) => void
}) {
  const container = useRef<HTMLDivElement>(null)
  const widget = useRef<number | null>(null)
  const callbacks = useRef({ onToken, onError })
  callbacks.current = { onToken, onError }

  useEffect(() => {
    if (widget.current !== null) window.grecaptcha?.reset(widget.current)
  }, [resetCount])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (widget.current === null) callbacks.current.onError('Verification could not load. Please reload this page or email raymond@rggstudio.com.')
    }, 15000)
    return () => clearTimeout(timer)
  }, [])

  const render = () => {
    if (!container.current || !window.grecaptcha || widget.current !== null) return
    try {
      widget.current = window.grecaptcha.render(container.current, {
        sitekey: siteKey,
        theme: 'dark',
        size: 'compact',
        callback: (token) => callbacks.current.onToken(token),
        'expired-callback': () => {
          callbacks.current.onToken('')
          callbacks.current.onError('Verification expired. Please complete it again before sending.')
        },
        'error-callback': () => {
          callbacks.current.onToken('')
          callbacks.current.onError('Verification failed to connect. Please try again or email raymond@rggstudio.com.')
        },
      })
    } catch {
      callbacks.current.onError('Verification could not load. Please reload this page or email raymond@rggstudio.com.')
    }
  }

  return <>
    <Script
      src="https://www.google.com/recaptcha/api.js?render=explicit"
      strategy="afterInteractive"
      onReady={() => window.grecaptcha?.ready(render)}
      onError={() => callbacks.current.onError('Verification could not load. Please reload this page or email raymond@rggstudio.com.')}
    />
    <div ref={container} aria-label="Spam verification" />
  </>
}
