import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Comment, Reply } from './types';
import { v4 as uuidv4 } from 'uuid';
import ReplyForm from './ReplyForm';
import ReplyList from './ReplyList';

interface CommentItemProps {
  comment: Comment;
  index: number;
  animateIndex: number;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, reply: Reply) => void;
  onReplyLike: (replyId: string, parentId: string) => void;
}

export default function CommentItem({
  comment,
  index,
  animateIndex,
  onLike,
  onReply,
  onReplyLike
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!replyName.trim() || !replyMessage.trim()) return;

    setIsSubmitting(true);
    try {
      const newReply: Reply = {
        id: uuidv4(),
        name: replyName.trim(),
        message: replyMessage.trim(),
        date: new Date(),
        likes: 0
      };

      onReply(comment.id, newReply);
      setReplyName('');
      setReplyMessage('');
      setShowReplyForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isVisible = index <= animateIndex;

  return (
    <div 
      className={`
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
    >
      <div className="bg-black/30 backdrop-blur-sm border border-wedding-gold/20 rounded-lg p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-wedding-gold font-script text-2xl md:text-3xl mb-1">{comment.name}</h4>
            <p className="text-wedding-lilac-light text-sm">
              {formatDistanceToNow(comment.date, { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <p className="text-white mb-4 whitespace-pre-wrap">{comment.message}</p>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-wedding-lilac hover:text-wedding-gold hover:bg-wedding-gold/10"
            onClick={() => onLike(comment.id)}
          >
            <Heart className="h-4 w-4 mr-2" />
            {comment.likes}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-wedding-lilac hover:text-wedding-gold hover:bg-wedding-gold/10"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>

        {showReplyForm && (
          <div className="mt-4 pl-4 border-l border-wedding-gold/20">
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-3 py-2 bg-black/50 border border-wedding-gold/30 rounded-md text-white focus:outline-none focus:border-wedding-gold"
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="space-y-2">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 bg-black/50 border border-wedding-gold/30 rounded-md text-white focus:outline-none focus:border-wedding-gold resize-none"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-wedding-lilac hover:text-wedding-gold"
                  onClick={() => setShowReplyForm(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-wedding-gold text-black hover:bg-wedding-lilac"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Reply'}
                </Button>
              </div>
            </form>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className="mt-4 pl-4 border-l border-wedding-gold/20">
            <ReplyList
              replies={comment.replies}
              onLike={(replyId) => onReplyLike(replyId, comment.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
