export interface InputProps {
  type: 'text' | 'password' | 'email' | 'number'
  placeholder?: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  name?: string | undefined
  hasPassword?: boolean
  icon?: React.ReactNode // Optional prop to pass an icon component
}
