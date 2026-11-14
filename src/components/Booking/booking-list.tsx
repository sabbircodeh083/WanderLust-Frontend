import type { Booking } from "@/lib/bookings";
import { BookedCard } from "@/components/Booking/booked-card";

export function BookingList({ bookings }: { bookings: Booking[] }) {
  return (
    <ul className="mt-8 flex flex-col gap-4">
      {bookings.map((booking, index) => (
        <li key={booking._id ?? `${booking.destinationName}-${index}`}>
          <BookedCard booking={booking} />
        </li>
      ))}
    </ul>
  );
}
