import { formatDistanceToNow } from 'date-fns';
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Reply } from './types';

interface ReplyListProps {
  replies: Reply[];
  onLike: (replyId: string) => void;
}

export default function ReplyList({ replies, onLike }: ReplyListProps) {
  return (
    <div className="space-y-4">
      {replies.map((reply) => (
        <div key={reply.id} className="bg-black/20 rounded-lg p-3">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h5 className="text-wedding-gold font-script text-sm">{reply.name}</h5>
              <p className="text-wedding-lilac-light text-xs">
                {formatDistanceToNow(reply.date, { addSuffix: true })}
              </p>
            </div>
          </div>
          
          <p className="text-white text-sm mb-2 whitespace-pre-wrap">{reply.message}</p>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-wedding-lilac hover:text-wedding-gold hover:bg-wedding-gold/10 h-6 text-xs"
            onClick={() => onLike(reply.id)}
          >
            <Heart className="h-3 w-3 mr-1" />
            {reply.likes}
          </Button>
        </div>
      ))}
    </div>
  );
} 