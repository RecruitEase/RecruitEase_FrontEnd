import { ReactQuillReadOnlyProps } from '@/types';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const ReactQuillReadOnly = ({ content = '' }: ReactQuillReadOnlyProps) => {



    const modules = {
        toolbar: false,
      };
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];



    return (
        <ReactQuill modules={modules} formats={formats} theme="snow" value={content} readOnly  />
        
    );
};

export default ReactQuillReadOnly;
