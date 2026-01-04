interface InputProps {
  id?: string;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

export function Input({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  required = false,
  error,
  className = "",
}: InputProps) {
  const inputId = id || name;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-foreground mb-2"
        >
          {label}
          {required && <span className="text-[#ff3b30] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={inputId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          w-full px-4 py-3
          rounded-xl
          border ${error ? "border-[#ff3b30]" : "border-border"}
          bg-background
          text-foreground
          placeholder:text-muted/40
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
          hover:border-muted
        `}
      />
      {error && (
        <p className="mt-2 text-sm text-[#ff3b30] flex items-center gap-1">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
