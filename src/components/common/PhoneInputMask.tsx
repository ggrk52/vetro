import React from 'react';
import { Phone } from 'lucide-react';

export interface PhoneInputMaskProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  error?: string;
  label?: string;
  showIcon?: boolean;
  theme?: 'dark' | 'light';
}

/**
 * Extracts raw 10-digit mobile number from any formatted Russian phone string.
 * Strips leading +7 or 8 if present.
 */
export function extractRawPhoneDigits(input: string): string {
  if (!input) return '';
  // Keep only digits
  const digits = input.replace(/\D/g, '');
  if (!digits) return '';

  // If starts with 7 or 8 and has more than 1 digit, strip country prefix
  if ((digits.startsWith('7') || digits.startsWith('8')) && digits.length > 1) {
    return digits.slice(1, 11);
  }
  // If user pasted 8XXXXXXXXXX or 7XXXXXXXXXX, or just typed starting with 9
  if (digits.startsWith('7') || digits.startsWith('8')) {
    return digits.slice(1, 11);
  }
  return digits.slice(0, 10);
}

/**
 * Formats 10 raw digits into standard Russian phone mask: +7 (XXX) XXX-XX-XX
 */
export function formatRussianPhone(rawDigits: string): string {
  const digits = extractRawPhoneDigits(rawDigits);
  if (!digits) return '';

  let formatted = '+7 (';
  formatted += digits.slice(0, 3);

  if (digits.length >= 3) {
    formatted += ') ';
  }
  if (digits.length > 3) {
    formatted += digits.slice(3, 6);
  }
  if (digits.length >= 6) {
    formatted += '-';
  }
  if (digits.length > 6) {
    formatted += digits.slice(6, 8);
  }
  if (digits.length >= 8) {
    formatted += '-';
  }
  if (digits.length > 8) {
    formatted += digits.slice(8, 10);
  }

  return formatted;
}

/**
 * Checks whether the phone string has all 10 local digits.
 */
export function isPhoneComplete(phone: string): boolean {
  const digits = extractRawPhoneDigits(phone);
  return digits.length === 10;
}

export const PhoneInputMask: React.FC<PhoneInputMaskProps> = ({
  value,
  onChange,
  id = 'phone-input',
  name = 'phone',
  placeholder = '+7 (___) ___-__-__',
  required = false,
  className = '',
  autoFocus = false,
  disabled = false,
  error,
  label,
  showIcon = true,
  theme = 'light',
}) => {
  const isDark = theme === 'dark';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const digits = extractRawPhoneDigits(rawInput);
    const formatted = formatRussianPhone(digits);
    const valid = digits.length === 10;
    onChange(formatted, valid);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const digits = extractRawPhoneDigits(value);
      if (digits.length <= 1) {
        onChange('', false);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const digits = extractRawPhoneDigits(pasted);
    const formatted = formatRussianPhone(digits);
    onChange(formatted, digits.length === 10);
  };

  return (
    <div className="w-full flex flex-col gap-1 text-left">
      {label && (
        <label 
          htmlFor={id} 
          className={`text-xs font-medium flex items-center justify-between ${
            isDark ? 'text-[#FBFAF7]/90' : 'text-[#252725]'
          }`}
        >
          <span>{label}</span>
          {required && <span className="text-[#A68C70] font-mono text-[10px] uppercase">Обязательно</span>}
        </label>
      )}

      <div className="relative rounded">
        {showIcon && (
          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none ${
            isDark ? 'text-white/40' : 'text-[#777A74]'
          }`}>
            <Phone className="size-4" />
          </div>
        )}
        <input
          type="tel"
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          autoComplete="tel"
          inputMode="tel"
          className={`w-full rounded border py-2.5 sm:py-3 text-sm transition-colors outline-none tabular-nums ${
            showIcon ? 'pl-10 pr-4' : 'px-4'
          } ${
            isDark 
              ? 'bg-[#1E201E] text-[#FBFAF7] placeholder-white/30 border-white/15 focus:border-[#FBFAF7]' 
              : 'bg-[#FBFAF7] text-[#252725] placeholder-[#777A74] border-[#DFDDD6] focus:border-[#252725]'
          } ${
            error ? 'border-red-500 focus:border-red-500' : ''
          } ${className}`}
        />
      </div>

      {error && (
        <p className="text-[11px] text-red-500 mt-0.5 flex items-center gap-1" role="alert">
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
