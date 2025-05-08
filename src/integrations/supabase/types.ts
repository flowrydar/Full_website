export type Database = {
  public: {
    Tables: {
      rsvp_responses: {
        Row: {
          id: string;
          created_at: string;
          guest_name: string;
          email?: string;
          phone?: string;
          number_of_guests: number;
          status: string;
          wants_aso_ebi: boolean;
          notes?: string;
          additional_guests?: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          guest_name: string;
          email?: string;
          phone?: string;
          number_of_guests: number;
          status: string;
          wants_aso_ebi: boolean;
          notes?: string;
          additional_guests?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          guest_name?: string;
          email?: string;
          phone?: string;
          number_of_guests?: number;
          status?: string;
          wants_aso_ebi?: boolean;
          notes?: string;
          additional_guests?: string[];
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          guest_name: string;
          likes: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          guest_name: string;
          likes?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          guest_name?: string;
          likes?: number;
        };
      };
      replies: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          guest_name: string;
          comment_id: string;
          likes: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          guest_name: string;
          comment_id: string;
          likes?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          guest_name?: string;
          comment_id?: string;
          likes?: number;
        };
      };
      page_views: {
        Row: {
          id: string;
          created_at: string;
          page: string;
          device_type: string;
          browser: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          page: string;
          device_type: string;
          browser: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          page?: string;
          device_type?: string;
          browser?: string;
        };
      };
    };
  };
};
