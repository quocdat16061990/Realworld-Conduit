import { ButtonType } from './Button.type'
import './Button.scss'
const Button: React.FC<ButtonType> = ({ className, type, children }) => {
  return (
    <button className={`btn ${className}`} type={type}>
      {children}
    </button>
  )
}

export default Button
