export interface Reply {
  id: string;
  name: string;
  message: string;
  date: Date;
  likes: number;
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  date: Date;
  likes: number;
  replies: Reply[];
}
