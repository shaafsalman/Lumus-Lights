import { Loader } from 'lucide-react';
import Logo from './../assets/logoDark.png'; 

const Loading = ({ all = false }) => {
  if (!all) {
    return (
      <div className="flex mt-32 justify-center h-screen">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="Logo" className="mb-4 h-16" /> {/* Logo displayed here */}
          <Loader className="animate-spin h-12 w-12 text-primary" />
          <span className="mt-4 text-xl tracking-tighter font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-secondary flex justify-center items-center z-50 transition-opacity duration-300 ${all ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center">
        <img src={Logo} alt="Logo" className="mb-4 h-20" /> {/* Logo displayed here */}
        <Loader className="animate-spin h-16 w-16 text-primary" />
        <span className="mt-4 text-2xl tracking-tight font-semibold text-white">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
