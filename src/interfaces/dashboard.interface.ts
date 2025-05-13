export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  ticketPrice: number;
  availableSeats: number;
  ticketsSold: number;
  totalRevenue: number;
  attendees: Attendee[];
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  quantity: number;
  totalPaid: number;
  status: "confirmed" | "pending" | "cancelled";
}

export interface Transaction {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  event: {
    id: string;
    name: string;
  };
  quantity: number;
  totalAmount: number;
  paymentProof: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface Statistics {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  avgAttendance: number;
  eventsByMonth: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
  revenueByEvent: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}
