'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle form submission
    console.log('Form submitted:', formData)
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
          <form onSubmit={handleSubmit} className="space-y-6">
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
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-text mb-2">
                Message (optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Leave a message"
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-secondary/30 border border-text/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-primary text-background font-semibold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors"
            >
              <span>Send Message</span>
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact 