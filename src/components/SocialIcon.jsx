import { Mail, MessageCircle, Linkedin, Calendar } from 'lucide-react'

const iconMap = {
  mail: Mail,
  message: MessageCircle,
  linkedin: Linkedin,
  calendar: Calendar,
}

export default function SocialIcon({ type, className = 'w-5 h-5', ariaHidden = true }) {
  const Icon = iconMap[type]
  if (!Icon) return null
  return <Icon className={className} aria-hidden={ariaHidden} strokeWidth={1.5} />
}
