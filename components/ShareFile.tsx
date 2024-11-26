import { Models } from 'node-appwrite';
import React from 'react'

interface ShareFileProps {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

const ShareFile = ({ file, onInputChange, onRemove }: ShareFileProps) => {
  return (
    <div>ShareFile</div>
  )
}

export default ShareFile