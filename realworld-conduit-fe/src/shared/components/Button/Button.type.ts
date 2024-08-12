export interface ButtonType {
  className: string
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
