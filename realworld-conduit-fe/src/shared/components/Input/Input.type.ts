export interface InputProps {
  type: 'text' | 'password' | 'email' | 'number' | 'textarea'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  hasPassword?: boolean
  icon?: React.ReactNode
}
