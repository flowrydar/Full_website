export interface AdditionalGuest {
  name: string;
}

export interface RsvpResponse {
  id: string;
  guest_name: string;
  email: string;
  phone: string;
  is_attending: boolean;
  number_of_guests: number;
  additional_guests_data?: AdditionalGuest[];
  notes?: string;
  created_at: string;
  wants_aso_ebi?: boolean;
} 