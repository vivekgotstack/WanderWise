import { useTheme } from "@/contexts/ThemeContext";

function Footer() {
  const currentTheme = useTheme();
  const backgroundStyle =
    currentTheme.theme === "light"
      ? {
        background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
      }
      : {
        background: "#0f172a",
        backgroundImage: `
        linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)
      `,
        backgroundSize: "40px 40px",
      };
  return (
    <div
      className={`inset-0 z-0 min-h-screen`}
      style={backgroundStyle}
    >
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40">
        <hr className="pt-5" />
        <div className="flex flex-wrap justify-evenly gap-10 pt-5 pb-5">
          <ul className={`flex-1 min-w-[200px] space-y-1 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-400"}`}>
            <h3 className={`font-bold mb-2 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>Our Products</h3>
            <li>Wander Coins</li>
            <li>Gift Cards</li>
            <li>Trip Money</li>
            <li>Advertising Solutions</li>
            <li>Travel Insurance</li>
          </ul>

          <ul className={`flex-1 min-w-[200px] space-y-1 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-400"}`}>
            <h3 className={`font-bold mb-2 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>About Us</h3>
            <li>Contact Us</li>
            <li>Terms of Services</li>
            <li>User Agreement</li>
            <li>Privacy</li>
            <li>Report Security Issues</li>
          </ul>

          <ul className={`flex-1 min-w-[200px] space-y-1 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-400"}`}>
            <h3 className={`font-bold mb-2 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>Travel Essentials</h3>
            <li>PNR Status</li>
            <li>WanderWise Offers</li>
            <li>Airline Routes</li>
            <li>Pickup Schedule</li>
            <li>Train Running Status</li>
          </ul>

          <ul className={`flex-1 min-w-[200px] space-y-1 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-400"}`}>
            <h3 className={`font-bold mb-2 ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>More Links</h3>
            <li>Cheap Flights</li>
            <li>Hotels Near Me</li>
            <li>My Bookings</li>
            <li>Cancellation</li>
            <li>My Account</li>
          </ul>
        </div>
        <hr />
        <div className="text-sm text-gray-400 flex flex-wrap flex-1 mt-8 mb-8 gap-2">
          <div className="hidden lg:block">
            <span className="font-bold ">Popular Flight Sectors</span> Kolkata
            to Delhi Flight | Hyderabad to Delhi Flight | Chennai to Hyderabad
            Flight | Delhi to Guwahati Flight | Lucknow to Delhi Flight | Nagpur
            to Mumbai Flight | Ranchi to Delhi Flight | Ahmedabad to Goa Flight
            | Mumbai to Chandigarh Flight | Pune to Kolkata Flight | Bangalore
            to Bhubaneshwar Flight | Bangalore to Guwahati Flight | Chennai to
            Goa Flight | Chennai to Kolkata Flight | Delhi to Jaipur Flight |
            Delhi to Leh Flight | Hyderabad to Goa Flight | Bangalore to Ranchi
            Flight | Delhi to Bagdogra Flight | Srinagar to Delhi Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Top Routes</span> Chandigarh to Delhi
            Flight | Delhi to Bhopal Flight | Delhi to Dehradun Flight | Delhi
            to Udaipur Flight | Hyderabad to Tirupati Flight | Kolkata to
            Chennai Flight | Kolkata to Guwahati Flight | Mumbai to Amritsar
            Flight | Mumbai to Dehradun Flight | Indore to Goa Flight | Jaipur
            to Delhi Flight | Kolkata to Bagdogra Flight | Patna to Bangalore
            Flight | Varanasi to Delhi Flight | Ahmedabad to Kolkata Flight |
            Delhi to Gorakhpur Flight | Guwahati to Kolkata Flight | Indore to
            Bangalore Flight | Jaipur to Pune Flight | Mumbai to Raipur Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Popular Domestic Routes</span> Patna to
            Kolkata Flight | Ranchi to Bangalore Flight | Patna to Delhi Flight
            | Bangalore to Goa Flight | Delhi to Ranchi Flight | Pune to Nagpur
            Flight | Chennai to Coimbatore Flight | Delhi to Srinagar Flight |
            Goa to Mumbai Flight | Hyderabad to Bangalore Flight | Indore to
            Delhi Flight | Kolkata to Mumbai Flight | Mumbai to Nagpur Flight |
            Mumbai to Varanasi Flight | Pune to Goa Flight | Bangalore to
            Chennai Flight | Bangalore to Jaipur Flight | Chennai to Bangalore
            Flight | Chennai to Madurai Flight | Delhi to Indore Flight
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Top Sectors</span> Delhi to Jammu
            Flight | Delhi to Varanasi Flight | Hyderabad to Chennai Flight |
            Hyderabad to Mumbai Flight | Jaipur to Mumbai Flight | Bangalore to
            Srinagar Flight | Bhopal to Chennai Flight | Chandigarh to Mumbai
            Flight | Coimbatore to Ahmedabad Flight | Coimbatore to Bangalore
            Flight | Coimbatore to Mumbai Flight | Delhi to Chandigarh Flight |
            Delhi to Coimbatore Flight | Delhi to Raipur Flight | Hyderabad to
            Kolkata Flight | Hyderabad to Vijaywada Flight | Lucknow to
            Ahmedabad Flight | Madurai to Chennai Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Top Airline Sectors</span> Delhi to Goa
            Indigo Flight | Delhi to Mumbai Indigo Flight | Mumbai to Delhi Air
            India Flight | Delhi to Mumbai Air India Flight | Delhi to Goa Air
            India Flight | Mumbai to Delhi Vistara Flight | Bangalore to Delhi
            Indigo Flight | Delhi to Mumbai Vistara Flight | Delhi to Bangalore
            Indigo Flight | Mumbai to Delhi Indigo Flight | Delhi to Hyderabad
            Spicejet Flight | Delhi to Bangalore Air India Flight | Kolkata to
            Delhi Indigo Flight | Delhi to Kolkata Indigo Flight | Delhi to
            Patna Indigo Flight | Pune to Delhi Indigo Flight | Kolkata to
            Bangalore Indigo Flight | Bangalore to Delhi Air India Flight |
            Bangalore to Mumbai Indigo Flight | Mumbai to Goa Indigo Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Important Routes</span> Madurai to
            Hyderabad Flight | Mumbai to Srinagar Flight | Pune to Ranchi Flight
            | Raipur to Hyderabad Flight | Raipur to Mumbai Flight | Bhopal to
            Hyderabad Flight | Bhubaneshwar to Chennai Flight | Chennai to
            Nagpur Flight | Chennai to Port Blair Flight | Cochin to Chennai
            Flight | Delhi to Mangalore Flight | Hyderabad to Nagpur Flight |
            Jammu to Delhi Flight | Kolkata to Aizawl Flight | Lucknow to
            Hyderabad Flight | Udaipur to Delhi Flight | Agartala to Delhi
            Flight | Bangalore to Imphal Flight | Imphal to Guwahati Flight |
            Imphal to Kolkata Flight | Indore to Raipur Flight | Kozhikode to
            Chennai Flight | Mumbai to Imphal Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Trending Domestic Routes</span>{" "}
            Ahmedabad to Mumbai Flight | Bagdogra to Kolkata Flight | Bangalore
            to Udaipur Flight | Bhopal to Bangalore Flight | Bhubaneshwar to
            Mumbai Flight | Chandigarh to Chennai Flight | Chennai to Jaipur
            Flight | Delhi to Vadodara Flight | Goa to Pune Flight | Hyderabad
            to Coimbatore Flight | Hyderabad to Patna Flight | Jaipur to
            Bangalore Flight | Lucknow to Kolkata Flight | Mangalore to
            Bangalore Flight | Mumbai to Coimbatore Flight | Mumbai to Indore
            Flight | Mumbai to Rajkot Flight | Mumbai to Surat Flight | Mumbai
            to Vijaywada Flight | Pune to Chennai Flight | Bhubaneshwar to
            Kolkata Flight | Delhi to Kozhikode Flight | Mumbai to Jodhpur
            Flight | Ranchi to Mumbai Flight | Vadodara to Chennai Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">New Udaan Sectors</span> Guwahati to
            Rupsi Flight | Rupsi to Kolkata Flight | Guwahati to Agartala Flight
            | Agartala to Dibrugarh Flight | Dibrugarh to Agartala Flight |
            Agartala to Guwahati Flight | Guwahati to Pasighat Flight | Pasighat
            to Shillong Flight | Shillong to Pasighat Flight | Pasighat to
            Guwahati Flight{" "}
          </div>
          <div className="hidden lg:block">
            <span className="font-bold ">Travel Insurance</span> Travel
            Insurance for Australia | Travel Insurance for Bali | Travel
            Insurance for Canada | Travel Insurance for Dubai - UAE | Travel
            Insurance for Europe | Travel Insurance for Germany | Travel
            Insurance for Indonesia | Travel Insurance for Italy | Travel
            Insurance for Japan | Travel Insurance for Malaysia | Travel
            Insurance for Maldives | Travel Insurance for New Zealand | Travel
            Insurance for Singapore | Travel Insurance for Spain | Travel
            Insurance for Sri Lanka | Travel Insurance for Switzerland | Travel
            Insurance for Thailand | Travel Insurance for Turkey | Travel
            Insurance for UK - United Kingdom | Travel Insurance for USA -
            United States | Travel Insurance for Vietnam | Travel Insurance for
            Asia | Travel Insurance for Schengen Visa | Travel Insurance for
            Bhutan | Travel Insurance for China | Travel Insurance for Hong Kong
            | Travel Insurance for Ireland | Travel Insurance for Nepal | Travel
            Insurance for Qatar | Travel Insurance for Russia | Travel Insurance
            for Philippines
          </div>
        </div>
        <hr className="hidden lg:block"></hr>
        <div className="mt-5 mb-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-3 text-sm font-bold">
            <p className={`${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>Follow Us</p>
            <div className="flex gap-2 flex-wrap">
              <a href="https://www.meta.ai/?utm_source=facebook_bookmarks&fbclid=IwY2xjawNQnp1leHRuA2FlbQIxMABicmlkETE0c084QTFJVVIyY0RXelZ6AR7mbGsbY_BdeNdyojnatrkKkQK3aMbfAbjx3P0jfqsf4Ot-XTRmZv3l-cxc9g_aem_ERuV26-LME7qoJtCTfWZxw" className="text-gray-400 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 56 56" fill="currentColor">
                  <path d="M3 7.007A4.007 4.007 0 0 1 7.007 3h41.986A4.007 4.007 0 0 1 53 7.007v41.986A4.007 4.007 0 0 1 48.993 53H7.007A4.007 4.007 0 0 1 3 48.993zM37.28 51V31.842h6.486l.971-7.466H37.28v-4.767c0-2.162.605-3.635 3.732-3.635L45 15.972V9.294C44.31 9.204 41.943 9 39.189 9c-5.75 0-9.686 3.48-9.686 9.87v5.506H23v7.466h6.503V51z" />
                </svg>
              </a>
              <a href="https://x.com/vivekgotstack" className="text-gray-400 hover:text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="32" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z" />
                </svg>
              </a>
              <a href="https://youtu.be/Q2gcTXmiJXQ?si=ySLKaJcPDGEfwABM" className="text-gray-400 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104l.022.26l.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105l-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006l-.087-.004l-.171-.007l-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103l.003-.052l.008-.104l.022-.26l.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007l.172-.006l.086-.003l.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <div className={`font-bold ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
              Book Tickets faster. Download our mobile Apps
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="https://play.google.com/store/search?q=hotel%20apps&c=apps&hl=en">
                <img src="/gplaylogo.png" alt="Download It From Google Play" className="h-12 w-36 cursor-pointer" />
              </a>
              <a href="https://www.apple.com/in/store?afid=p240%7Cgo~cmp-11116556120~adg-109516736059~ad-774710206797_kwd-12522920~dev-c~ext-~prd-~mca-~nt-search&cid=aos-in-kwgo-brand--">
                <img src="/appstorelogo.png" alt="Download It From App Store" className="h-12 w-36 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap justify-start gap-4">
          <div className={`w-full mb-2 text-center font-bold ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
            Our Payment Gateways
          </div>
          <div className="overflow-hidden -translate-x-40 z-100">
            <div className="flex scroll-strip">
              {/* first set */}
              <img src="/svg/pmodes/amex.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/eway.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/paypal.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/ebay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/stripe.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/unionpay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/apple-pay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/bitcoin.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/citi.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/moneygram.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/google-wallet.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/clickbank.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/ebay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/shopify.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/bluepay.png" className="h-16 w-auto mx-4" />

              {/* duplicate set */}
              <img src="/svg/pmodes/amex.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/eway.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/paypal.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/ebay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/stripe.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/unionpay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/apple-pay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/bitcoin.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/citi.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/moneygram.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/google-wallet.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/clickbank.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/ebay.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/shopify.png" className="h-16 w-auto mx-4" />
              <img src="/svg/pmodes/bluepay.png" className="h-16 w-auto mx-4" />
            </div>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center gap-6">
          <div className="flex flex-wrap gap-8 justify-center md:justify-start items-center">
            <div>
              {currentTheme.theme === "light" ? <a href="https://www.makemytrip.com/flights/?cmp=SEM|D|DF|G|Brand|Brand-BrandExact_DT|B_M_Makemytrip_Search_Exact|RSA&cmpdata=SEM|MMT|BRAND&gad_source=1&gad_campaignid=313149128&gclid=EAIaIQobChMImeOGpsbRjwMV7qhmAh2RtDsHEAAYASAAEgK7VPD_BwEF">
                <img
                  src="/svg/makemytrip.svg"
                  alt="MakeMyTrip"
                  className="cursor-pointer h-12 w-20 sm:h-16 sm:w-24 md:h-20 md:w-28"
                />
              </a> : <a href="https://www.makemytrip.com/flights/?cmp=SEM|D|DF|G|Brand|Brand-BrandExact_DT|B_M_Makemytrip_Search_Exact|RSA&cmpdata=SEM|MMT|BRAND&gad_source=1&gad_campaignid=313149128&gclid=EAIaIQobChMImeOGpsbRjwMV7qhmAh2RtDsHEAAYASAAEgK7VPD_BwEF">
                <img
                  src="/svg/makemytrip.svg"
                  alt="MakeMyTrip"
                  className="cursor-pointer h-12 w-20 sm:h-16 sm:w-24 md:h-20 md:w-28"
                />
              </a>}
            </div>
            <div className="movingbus">
              <a href="https://www.redbus.in">
                {currentTheme.theme === "light" ? <img
                  src="/svg/redbus-light.png"
                  alt="RedBus"
                  className="cursor-pointer h-8 w-13 sm:h-8 sm:w-13 md:h-8 md:w-13"
                /> : <img
                  src="/svg/redbus.png"
                  alt="RedBus"
                  className="cursor-pointer h-16 w-18 sm:h-16 sm:w-18 md:h-16 md:w-18"
                />}
              </a>
            </div>
          </div>
          <div className={`text-sm text-center md:text-right ${currentTheme.theme === "light" ? "text-gray-800" : "text-gray-300"}`}>
            © 2025 WanderWise (India) Private Limited. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
