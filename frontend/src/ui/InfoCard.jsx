import { ArrowLeft } from 'lucide-react';

const InfoCard = ({ title, text }) => {
  return (
    <div className="p-6 rounded-lg  shadow-md w-screen ">
      <div className="flex items-center mb-4">
        <ArrowLeft className="w-6 h-6 mr-2" />
        <button className="text-sm text-gray-400 hover:text-gray-200">Back to home</button>
      </div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-400">{text}</p>
    </div>
  );
};

export default InfoCard;
