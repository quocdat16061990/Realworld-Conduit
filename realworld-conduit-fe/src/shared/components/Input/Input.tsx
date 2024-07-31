import React from 'react'
import { InputProps } from './Input.type'
import './Input.scss'
const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, name, hasPassword, icon }) => {
  return (
    <div className='input-container' style={{ position: 'relative' }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${className}`}
        name={name}
      />
      {hasPassword && icon && (
        <div
          className='input-icon'
          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
        >
          {icon}
        </div>
      )}
    </div>
  )
}

export default Input
