import { LampDesk } from 'lucide-react'; 

const NoProducts = ({ title = "No Products to Show", message = "Please check back later or try a different category." }) => {
  return (
    <div className="flex py-32 justify-center h-full bg-gray-100">
      <div className="text-center">
        <LampDesk className="mx-10 mb-4 h-16 w-16 text-primary" />
        <h2 className="text-2xl font-semibold text-secondary">{title}</h2>
        <p className="mt-2 px-10 text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default NoProducts;
