import React from 'react'

type BasicInputProps = {
    label?: string
    className?: string
    value?: string | number
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: 'number' | 'text'
    maxLength?: number
}

const BasicInput:React.FC<BasicInputProps> = ({ label, className, value, onChange, type, maxLength }) => {
    
    if (!type) {
        type = 'text'
    }

    return (
        <div>
        <label className="block text-lg font-medium leading-6 text-white">
            {label}
        </label>
        <div className="mt-1">
            <input
                type={type}
                className={`rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 outline-none text-md leading-6 ${className}`}
                autoComplete='off'
                placeholder=""
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                spellCheck={false}
            />
        </div>
        </div>
  )
}

export default BasicInput