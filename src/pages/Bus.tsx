export default function Bus() {
  return (
    <div className="flex flex-wrap bg-gradient-to-r from-white to-gray-200">
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/buspage.svg"
          alt="Bus Booking"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Travel Smarter, Ride Easier
        </h1>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Booking your bus tickets has never been this simple. Our bus booking
          section makes it effortless to plan your travel, whether it’s a daily
          commute, a weekend getaway, or a long-distance journey. With a clean
          and intuitive interface, you can search routes, compare schedules, and
          reserve your seat in just a few clicks. Say goodbye to long queues and
          uncertainty — get instant confirmation and travel with confidence,
          knowing everything is ready before you even set foot on the bus.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We know flexibility matters when it comes to travel. That’s why our
          system allows you to manage, reschedule, or cancel your bookings with
          ease, giving you complete control over your journey. With real-time
          updates on seat availability and bus timings, you’ll never be left
          guessing. It’s all about making your travel smooth, reliable, and
          stress-free — so you can focus on the trip, not the hassle of booking.
        </p>
      </div>
    </div>
  );
}
