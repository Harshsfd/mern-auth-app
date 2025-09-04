import React from 'react';

export default function InputField({ label, name, type = 'text', value, onChange, placeholder, required = false }) {
  return (
    <div className="form-row">
      {label && <label style={{ display: 'block', marginBottom: 6 }}>{label}</label>}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
