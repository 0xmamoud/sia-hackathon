import { Linkedin, Twitter, Mail, Phone } from "lucide-react"

export const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "How it works",
    href: "/#how-it-works",
  },
  {
    title: "Contact",
    href: "/#contact",
  },

]

export const processData = [
  {
    title: 'Upload your files',
    description: `Upload your lease, audit templates, synthese excel 
                  and other relevant documents to the platform.`,
    video: '/upload.mp4'
  },
  {
    title: 'AI analysis',
    description: `Our AI engine will analyze and automatically detect your requirements,
                  and generate a detailed report.`,
    image: '/auto_detection.jpg'
  },
  {
    title: 'Download your report',
    description: `And that's it! Download your report and start auditing your lease. Quite simple, right?`,
    video: '/download.mp4'
  },
]

export const contactData = [
  {
    title: 'Email',
    icon: Mail,
    href: 'mailto:test@test.com'
  },
  {
    title: 'Phone',
    icon: Phone,
    href: 'tel:+123456789'
  },
  {
    title: 'Linkedin',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/test'
  },
  {
    title: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/test'
  }
]
