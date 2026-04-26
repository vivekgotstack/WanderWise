export interface SavedFlightTrip {
  id: number;
  airline: string;
  flightNumber?: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  basePrice: number;
  availableSeats: number;
  savedAt: string;
}

const KEY = "wanderwise_saved_flights";

export function getSavedFlights(): SavedFlightTrip[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function isFlightSaved(flightId: number): boolean {
  return getSavedFlights().some((f) => f.id === flightId);
}

export function toggleSavedFlight(flight: Omit<SavedFlightTrip, "savedAt">): boolean {
  const current = getSavedFlights();
  const exists = current.some((item) => item.id === flight.id);

  if (exists) {
    const next = current.filter((item) => item.id !== flight.id);
    localStorage.setItem(KEY, JSON.stringify(next));
    return false;
  }

  const next = [{ ...flight, savedAt: new Date().toISOString() }, ...current].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(next));
  return true;
}

export function removeSavedFlight(flightId: number) {
  const next = getSavedFlights().filter((item) => item.id !== flightId);
  localStorage.setItem(KEY, JSON.stringify(next));
}
