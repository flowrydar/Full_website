import { Heart } from "lucide-react";
import { Reply } from './types';

interface ReplyItemProps {
  reply: Reply;
  parentId: string;
  onLike: (replyId: string, parentId: string) => void;
}

const ReplyItem = ({ reply, parentId, onLike }: ReplyItemProps) => {
  return (
    <div className="bg-black/30 p-3 rounded-md">
      <div className="flex justify-between items-start">
        <h5 className="text-sm text-wedding-gold/90">{reply.name}</h5>
        <span className="text-xs text-wedding-lilac/50">
          {reply.date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
          })}
        </span>
      </div>
      <p className="text-white/90 text-xs mt-1">{reply.message}</p>
      <div className="flex space-x-3 mt-2 text-xs">
        <button 
          onClick={() => onLike(reply.id, parentId)}
          className="flex items-center text-wedding-lilac/50 hover:text-wedding-lilac transition-colors"
        >
          <Heart className="h-2 w-2 mr-1" /> 
          <span>{reply.likes}</span>
        </button>
      </div>
    </div>
  );
};

export default ReplyItem;
