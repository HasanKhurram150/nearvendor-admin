import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

interface SearchableDropdownProps {
  options: Option[];
  onSelect: (option: Option | null) => void;
  placeholder?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onSelect, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setSearchTerm('');
    setIsOpen(false);
    onSelect(null);
  };

  return (
    <div className='px-3 py-2 border border-gray-300 rounded-xl relative w-full' >
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          style={{ width: '100%', padding: '8px 30px 8px 8px' }}
        />
        {selectedOption && (
          <button
            onClick={clearSelection}
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '2rem',
              lineHeight: '1',
              padding: 0,
            }}
            aria-label="Clear selection"
          >
            ×
          </button>
        )}
      </div>

      {isOpen && (
        <ul
          style={{
            listStyle: 'none',
            margin: 0,
            padding: '4px',
            border: '1px solid #ccc',
            position: 'absolute',
            width: '100%',
            backgroundColor: '#fff',
            maxHeight: '150px',
            overflowY: 'auto',
            zIndex: 1000,
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  backgroundColor: option.value === selectedOption?.value ? '#eee' : '#fff',
                }}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li style={{ padding: '8px' }}>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
