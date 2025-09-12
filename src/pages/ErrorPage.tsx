export default function ErrorPage() {
    return (
      <div className="flex flex-col min-w-screen items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0">
          <div className="absolute w-[400px] h-[400px] bg-[rgb(89,89,200)] rounded-full blur-3xl opacity-20 top-[-100px] left-[-100px]" />
          <div className="absolute w-[300px] h-[300px] bg-[rgb(89,89,200)] rounded-full blur-2xl opacity-30 bottom-[-80px] right-[-80px]" />
        </div>
  
        {/* 404 Text */}
        <h1 className="text-[8rem] md:text-[10rem] font-extrabold tracking-widest relative z-10">
          <span className="text-white">4</span>
          <span className="text-[rgb(89,89,200)]">0</span>
          <span className="text-white">4</span>
        </h1>
  
        {/* Subheading */}
        <p className="text-gray-300 text-lg md:text-xl mt-4 relative z-10">
          This page is under-construction by Master Vivek
        </p>
  
        {/* Action Button */}
        <button
          onClick={() => window.location.href = '/'}
          className="mt-8 px-8 py-3 text-lg rounded-lg transition relative z-10
                     bg-[rgb(89,89,200)] text-white shadow-lg hover:shadow-[0_0_20px_rgb(89,89,200)] hover:bg-[rgb(70,70,180)]"
        >
          Go Back Home
        </button>
  
        {/* Decorative Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-[rgb(89,89,200)] opacity-30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-24 h-24 bg-[rgb(89,89,200)] opacity-20 rounded-full blur-xl animate-pulse" />
      </div>
    );
  }
  