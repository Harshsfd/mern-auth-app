import React from 'react';

export default function InputField({ label, type="text", name, value, onChange, placeholder, required }) {
  return (
    <div className="input-group">
      <label>{label}</label>
      <input 
        type={type} 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
