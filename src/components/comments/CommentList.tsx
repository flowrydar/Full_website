import { useState, useEffect } from 'react';
import { useComments } from '@/hooks/use-comments';
import { CommentItem } from './CommentItem';

export function CommentList() {
  const { comments } = useComments();
  const [animateIndex, setAnimateIndex] = useState(-1);

  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach((_, index) => {
        setTimeout(() => {
          setAnimateIndex(index);
        }, index * 200);
      });
    }
  }, [comments]);

  if (comments.length === 0) {
    return (
      <div className="text-center text-wedding-gold/70 py-8">
        Be the first to leave a message!
      </div>
    );
  }

  return (
    <div className="border-t border-wedding-gold/20 pt-6 space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {comments.map((comment, index) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          index={index}
          animateIndex={animateIndex}
        />
      ))}
    </div>
  );
} 