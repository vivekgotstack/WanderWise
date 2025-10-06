export default function MobileWarning() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden">

      {/* Background Glows */}
      <div className="absolute inset-0">
        <div className="absolute w-[400px] h-[400px] bg-[rgb(89,89,200)] rounded-full blur-3xl opacity-20 top-[-120px] left-[-120px]" />
        <div className="absolute w-[300px] h-[300px] bg-[rgb(89,89,200)] rounded-full blur-2xl opacity-25 bottom-[-100px] right-[-100px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center p-6">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-[rgb(89,89,200)] bg-opacity-20 flex items-center justify-center shadow-[0_0_15px_rgb(89,89,200)]">
            <span className="text-4xl">💻</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-wide">
          No Mobile Users allowed!
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
          This site is designed only for <span className="text-[rgb(89,89,200)] font-semibold">laptop</span> and <span className="text-[rgb(89,89,200)] font-semibold">desktop</span> users by master Vivek.
          <br />
          Kindly visit using a larger screen.
        </p>

        {/* Footer Note */}
        <div className="mt-6">
          <span className="text-gray-500 text-sm">
            Try luck next time!!
          </span>
        </div>
      </div>
    </div>
  );
}
