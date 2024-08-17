import React from 'react';

export default function Button({ name, onClick, className }) {
  return (
    <div>
      <button onClick={onClick} className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
        {name}
      </button>
    </div>
  );
}
