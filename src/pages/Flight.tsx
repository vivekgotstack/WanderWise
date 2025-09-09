export default function Flight() {
  return (
    <div className="flex flex-wrap bg-gradient-to-r from-white to-gray-200">
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/flightpage.svg"
          alt="Flight Booking"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Fly Smarter, Travel Better
        </h1>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Booking flights should be quick, simple, and stress-free. Our flight
          booking section makes it easy to find the best routes, compare fares,
          and secure your tickets in just a few steps. Whether you’re planning a
          business trip, a family vacation, or a last-minute getaway, our
          platform helps you book with confidence and convenience. With
          real-time updates and instant confirmation, you’ll always be ready for
          takeoff.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We understand that travel plans can change, which is why we offer
          flexible booking management options. Easily modify or cancel your
          reservations, view updated schedules, and track important details all
          in one place. Our goal is to provide a smooth, hassle-free experience
          from booking to boarding, so you can focus on your journey — not the
          logistics.
        </p>
      </div>
    </div>
  );
}
