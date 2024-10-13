import React, { useState } from 'react';
import { CloudUpload, FilePlus, Trash2 } from 'lucide-react';

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

  const removeFile = (index, isExisting) => {
    if (isExisting) {
      const updatedExisting = [...existingImages];
      updatedExisting.splice(index, 1); // Remove image from existing images
      onFilesAdded(updatedExisting); // Update parent component
    } else {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updatedFiles); // Remove image from selected files
    }
  };

  return (
    <div className="mb-6 p-4">
      <div
        className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer transition-colors duration-200 ${
          dragOver ? 'border-primary bg-secondary' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CloudUpload className="w-16 h-16 text-primary mb-2 mx-auto" />
        <p className="text-secondary tracking-tighter text-lg mb-2">
          Drag & drop your files here
        </p>
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

      {/* Display selected and existing images */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg mb-2">Selected Images:</h4>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Display existing images */}
          {existingImages.map((image, index) => (
            <li key={`existing-${index}`} className="relative">
              <img
                src={image.url || URL.createObjectURL(image)}
                alt="Uploaded"
                className="h-24 w-24 object-cover rounded-md shadow-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                onClick={() => removeFile(index, true)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
          {/* Display selected new files */}
          {selectedFiles.map((file, index) => (
            <li key={`file-${index}`} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="h-24 w-24 object-cover rounded-md shadow-md"
              />
              <button
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                onClick={() => removeFile(index, false)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DragAndDropUpload;
