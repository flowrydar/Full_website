import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Convert Comment DB records to the expected Comment type
export function mapDbCommentToComment(comment: any) {
  return {
    id: comment.id,
    name: comment.name,
    message: comment.message,
    date: new Date(comment.created_at),
    likes: comment.likes || 0,
    replies: (comment.comment_replies || []).map((reply: any) => ({
      id: reply.id,
      name: reply.name,
      message: reply.message,
      date: new Date(reply.created_at),
      likes: reply.likes || 0
    }))
  };
}

// Convert Reply DB records to the expected Reply type
export function mapDbReplyToReply(reply: any) {
  return {
    id: reply.id,
    name: reply.name,
    message: reply.message,
    date: new Date(reply.created_at || reply.timestamp),
    likes: reply.likes || 0
  };
}
