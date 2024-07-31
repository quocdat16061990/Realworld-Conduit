export interface InputProps {
  type: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string
  hasPassword?: boolean
  icon?: React.ReactNode // Optional prop to pass an icon component
}
