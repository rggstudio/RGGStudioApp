'use client'

import React, { useState, useRef } from 'react'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      })
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Email error:', error)
      setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-20 dot-pattern">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-primary mb-8 text-center">Contact Me</h2>
        <div className="max-w-2xl mx-auto">
          {status.type && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status.type === 'success'
                  ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                  : 'bg-red-500/10 text-red-500 border border-red-500/20'
              }`}
            >
              {status.message}
            </div>
          )}
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-text mb-2">
                Name (required)
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Ralph Macho"
                className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-text/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-text mb-2">
                Email (required)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="ralphmacho@gmail.com"
                className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-text/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text mb-2">
                Message (required)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Leave a message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-text/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text resize-none"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg bg-primary text-background font-semibold flex items-center justify-center space-x-2 transition-all ${
                isSubmitting
                  ? 'opacity-75 cursor-not-allowed'
                  : 'hover:bg-primary/90'
              }`}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send size={18} className={isSubmitting ? 'animate-pulse' : ''} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact 