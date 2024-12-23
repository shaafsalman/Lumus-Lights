import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPrint, faEnvelope, faFileExcel, faSearch, faSave } from '@fortawesome/free-solid-svg-icons';
import ActionButton from './ActionButton';
import Input from './Input';
export default function ReportCard({
  inputs=[],
  handleInputChange,
  handleSubmit,
  searching,
  excelReport,
  pdfReport,
  buttonClr ,
  buttonClrHover,
  onSave
}) {

  const handleDownload = (url, filename) => {
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    }
  };

  const handlePrint = (url) => {
    if (url) {
      const newWindow = window.open(url, '_blank');
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  };

  const handleEmail = (url) => {
    if (url) {
      window.open(`mailto:?subject=Report&body=Please find the report attached.%0A%0A${url}`);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2">
          <ActionButton
            onClick={() => handleDownload(pdfReport, 'BookingReport.pdf')}
            text="Download PDF"
            icon={faDownload}
            bgHover={"green-800"}
          />
          <ActionButton
            onClick={() => handleDownload(excelReport, 'BookingReport.xlsx')}
            text="Download Excel"
            icon={faFileExcel}
          />
          <ActionButton
            onClick={() => handlePrint(pdfReport)}
            text="Print PDF"
          />
          <ActionButton
            onClick={() => handleEmail(pdfReport)}
            text="Email PDF"
            icon={faEnvelope}
          />
        </div>
        <div className="flex gap-2">
          {onSave && (
            <ActionButton
              onClick={onSave}
              text="Save"
              icon={faSave}
              bg={buttonClr}
              loading={searching}
              bgHover={buttonClrHover}
            />
          )}
          <ActionButton
            onClick={handleSubmit}
            text="Search"
            loading={searching}
            icon={faSearch}
            bg={buttonClr}
            bgHover={buttonClrHover}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        {inputs.map((input, index) => (
          <div className="flex-1 space-y-2" key={index}>
            <label htmlFor={`input-${input.name}`} className="block text-sm font-medium ">
              {input.label}
              {input.required && <span className="text-red-500">*</span>}
            </label>
            {input.type === 'select' ? (
              <select
                id={`input-${input.name}`}
                name={input.name}
                value={input.value || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-primary rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700  "
              >
                <option value="">{input.label}</option>
                {input.options.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <Input
                type={input.type}
                id={`input-${input.name}`}
                name={input.name}
                placeholder={input.placeholder}
                value={input.value || ''}
                onChange={handleInputChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
