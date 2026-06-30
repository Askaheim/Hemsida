'use client'

import { styles } from '@/utils/styles'
import { cn } from '@/utils/utils'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
import Button from '../Button/Button'
import Typography from '../Typography/Typography'
import { ContactFormValues, FormDataProps } from './ContactForm.types'
import { slideIn } from './ContactForm.utils'

const ContactForm = ({ formData, classNames, ...props }: FormDataProps) => {
  const [form, setForm] = useState<ContactFormValues>({
    from: '',
    email: '',
    message: '',
  })
  const formRef = useRef<HTMLFormElement | null>(null) // Typing the formRef as HTMLFormElement
  const [loading, setLoading] = useState<boolean>(false)

  // EMAILJS KEYS
  const serviceID = process.env.NEXT_EMAILJS_SERVICE_ID
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  const templateId = process.env.NEXT_EMAILJS_TEMPLATE_ID

  // ChangeEvent type for input elements
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // FormEvent type for the form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    emailjs
      .send(
        serviceID ?? '',
        templateId ?? '',
        {
          from_name: form.from,
          to_name: formData.receiverName,
          from_email: form.email,
          to_email: formData.receiverEmail,
          message: form.message,
        },
        publicKey ?? '',
      )
      .then(
        () => {
          setLoading(false)
          alert(`${formData.feedback}`)

          setForm(form) // Reset form to initial state
        },
        error => {
          console.log(error.text)
          setLoading(false)
          alert('An error occurred. Please try again later.')
        },
      )
  }

  return (
    <div
      className={cn(
        `flex w-full flex-col-reverse gap-10 xl:mt-24 xl:flex-row ${classNames} items-center justify-center`,
        { props },
      )}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='bg-primary-accent flex-[0.95] rounded-2xl p-8'
      >
        <Typography
          variant='p'
          className={`${styles.sectionSubText} font-poppins text-accent-400`}
        >
          {formData.formTitle}
        </Typography>
        <Typography
          variant='h3'
          className={`${styles.sectionHeadText} font-advisor text-white`}
        >
          {formData.subTitle}
        </Typography>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>{formData.from}</span>
            <input
              type='text'
              name='from'
              value={form.from}
              onChange={handleChange}
              placeholder='Skriv ditt namn här'
              className='bg-primaryBgLight placeholder:text-primary-300 text-text-primary-dark rounded-lg border-none px-6 py-4 font-medium outline-none'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>
              {formData.email}
            </span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='Skriv din email här'
              className='bg-primaryBgLight placeholder:text-primary-300 text-text-primary-dark rounded-lg border-none px-6 py-4 font-medium outline-none'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>
              {formData.message}
            </span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='Vad vill du säga? Skriv ditt meddelande här'
              className='bg-primaryBgLight placeholder:text-primary-300 text-text-primary-dark rounded-lg border-none px-6 py-4 font-medium outline-none'
            />
          </label>
          <Button
            variant='primary'
            size='md'
            type='submit'
            className='shadow-primary bg-primary-accent hover:text-primary-accent border-2 border-white  w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none hover:bg-white hover:shadow-lg'
          >
            {loading ? 'Skickar...' : 'Skicka Meddelande'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export default ContactForm
