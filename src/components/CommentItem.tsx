import { useState } from 'react';
import { Heart, Reply as ReplyIcon, Trash } from "lucide-react";
import { Comment, Reply } from '@/components/comments/types';
import { useIsMobile } from "@/hooks/use-mobile";
import { useComments } from '@/hooks/use-comments';

interface CommentItemProps {
  comment: Comment;
  index: number;
  animateIndex: number;
  onLike: (commentId: string) => void;
  onDelete: (commentId: string) => void;
  onReply: (commentId: string, reply: Reply) => void;
  onReplyLike: (replyId: string, parentId: string) => void;
  onReplyDelete: (replyId: string, parentId: string) => void;
}

const CommentItem = ({ 
  comment, 
  index, 
  animateIndex, 
  onLike, 
  onDelete, 
  onReply,
  onReplyLike,
  onReplyDelete
}: CommentItemProps) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { userId } = useComments();

  const handleReply = () => {
    if (activeReplyId === comment.id) {
      setActiveReplyId(null);
    } else {
      setActiveReplyId(comment.id);
    }
  };

  const handleSubmitReply = (commentId: string, reply: Reply) => {
    onReply(commentId, reply);
    setActiveReplyId(null);
  };

  const commentCardBaseClasses = "comment-card p-4 border border-wedding-gold/20 rounded-md bg-gradient-to-b from-wedding-gold/5 to-transparent transition-all duration-500";
  const commentCardAnimationClasses = index <= animateIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';
  const commentCardHoverClasses = "hover:shadow-[0_0_15px_rgba(155,135,245,0.2)] hover:border-wedding-gold/50";

  return (
    <div 
      className={`${commentCardBaseClasses} ${commentCardAnimationClasses} ${commentCardHoverClasses}`}
      style={{
        animationDelay: `${index * 150}ms`,
        transition: "all 0.3s ease-in-out"
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-serif text-wedding-gold truncate max-w-[180px] sm:max-w-full">{comment.name}</h4>
        <span className="text-xs text-wedding-lilac/70 ml-2 whitespace-nowrap">
          {comment.date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: isMobile ? undefined : 'numeric' 
          })}
        </span>
      </div>
      <p className="text-white text-sm italic mb-3 break-words">{comment.message}</p>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 border-t border-wedding-gold/10 pt-2">
        <div className="flex space-x-3 mb-2 sm:mb-0">
          <button 
            onClick={() => onLike(comment.id)}
            className="flex items-center text-wedding-lilac/70 hover:text-wedding-lilac transition-colors text-xs"
            aria-label="Like comment"
          >
            <Heart className="h-3 w-3 mr-1" /> 
            <span>{comment.likes}</span>
          </button>
          <button 
            onClick={handleReply}
            className="flex items-center text-wedding-lilac/70 hover:text-wedding-lilac transition-colors text-xs"
            aria-label="Reply to comment"
          >
            <ReplyIcon className="h-3 w-3 mr-1" /> 
            <span>Reply</span>
          </button>
          {comment.user_id === userId && (
            <button 
              onClick={() => onDelete(comment.id)}
              className="flex items-center text-wedding-lilac/70 hover:text-red-400 transition-colors text-xs"
              aria-label="Delete comment"
            >
              <Trash className="h-3 w-3 mr-1" /> 
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem; 