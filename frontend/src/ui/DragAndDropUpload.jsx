import React, { useState } from 'react';
import { CloudUpload, FilePlus } from 'lucide-react';

const DragAndDropUpload = ({ onFilesAdded, existingImages = [] }) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    onFilesAdded(files); // Pass files to parent component
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    onFilesAdded(files); // Pass files to parent component
  };

  const removeFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div className="mb-6 p-4 ">
      <div
        className={`border-2 border-dashed rounded-md p-2 text-center cursor-pointer transition-colors duration-200 ${
          dragOver ? 'border-primary bg-secondary' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload className="w-16 h-16 text-primary mb-2 mx-auto" />
        <p className="text-secondary  tracking-tighter text-lg  mb-2">Drag & drop your files here</p>
        <p className="text-secondary mb-4">or</p>
        <label className="flex items-center justify-center text-primary font-semibold cursor-pointer hover:underline">
          <FilePlus className="w-5 h-5 mr-1" />
          <span>Select files</span>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>

      {/* Display selected images */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg">Selected Images:</h4>
        <ul className="list-disc list-inside mt-2">
          {/* Combine existing images and selected files */}
          {[...existingImages, ...selectedFiles].map((file, index) => (
            <li key={index} className="flex items-center justify-between py-1">
              <span className="text-gray-700">{file.name}</span>
              <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
