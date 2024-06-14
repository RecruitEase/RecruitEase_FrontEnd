import React, { useState } from 'react';
import './DragAndDropZone.css'; 

const DragAndDropZone = () => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = [...e.dataTransfer.files];
    // Process dropped files here, e.g., upload or handle as needed
    console.log('Dropped files:', files);
  };

  return (
    <div
      className={`drag-drop-zone ${dragging ? 'active' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <p>Drag files here</p>
    </div>
  );
};

export default DragAndDropZone;
