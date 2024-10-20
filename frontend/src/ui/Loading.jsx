import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex mt-32 justify-center h-screen ">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin h-12 w-12 text-primary" />
        <span className="mt-4 text-xl tracking-tighter font-medium">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
