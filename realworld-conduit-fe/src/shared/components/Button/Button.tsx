import { ButtonType } from './Button.type'
import './Button.scss'

const Button: React.FC<ButtonType> = ({ className, type, children, ...rest }) => {
  return (
    <button className={`btn ${className}`} type={type} {...rest}>
      {children}
    </button>
  )
}

export default Button
