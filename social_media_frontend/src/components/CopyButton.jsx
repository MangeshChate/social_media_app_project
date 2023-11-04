import { CopyAll } from '@mui/icons-material';
import React, { useState } from 'react';

function CopyButton({ text }) {
  const [copyMessage, setCopyMessage] = useState('');

  const copyToClipboard = () => {
    const textToCopy = document.createElement('textarea');
    textToCopy.value = text;
    document.body.appendChild(textToCopy);
    textToCopy.select();
    document.execCommand('copy');
    document.body.removeChild(textToCopy);
    setCopyMessage('Copied to clipboard');
  };

  return (
 
     
      <CopyAll className='text-dark ms-2' onClick={copyToClipboard}/>
      

  );
}

export default CopyButton;
