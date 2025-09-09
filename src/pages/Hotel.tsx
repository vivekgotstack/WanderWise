export default function Hotel() {
  return (
    <div className="flex flex-wrap bg-gradient-to-r from-white to-gray-200">
      <div className="min-h-screen p-10 h-auto flex flex-1 w-1/2">
        <img
          src="/svg/pagessvg/hotelpage.svg"
          alt="Hotel Booking"
          className="bg-cover"
        />
      </div>
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start p-10 pages">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Your Ideal Stay, One Click Away
        </h1>
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Finding the right place to stay shouldn’t be a hassle. Our hotel
          booking section makes it simple to search, compare, and book
          accommodations that fit your needs — whether you’re traveling for
          business, a family vacation, or a quick weekend getaway. With access
          to a wide range of hotels, from luxury suites to budget-friendly
          rooms, you can easily find the perfect stay at the right price.
          Instant confirmations and clear details ensure a smooth booking
          process every time.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          We know that plans can change, and flexibility matters. That’s why we
          provide easy options to modify or cancel your reservations whenever
          you need. With real-time availability, transparent pricing, and
          reliable support, you can book with confidence. Whether it’s a
          one-night stopover or a week-long retreat, our goal is to make your
          stay comfortable, convenient, and completely stress-free.
        </p>
      </div>
    </div>
  );
}
