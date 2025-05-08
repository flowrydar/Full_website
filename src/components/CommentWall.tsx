import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import CommentForm from './comments/CommentForm';
import CommentItem from './comments/CommentItem';
import { Comment as ComponentComment, Reply } from './comments/types';
import { v4 as uuidv4 } from 'uuid';
import * as commentService from '@/lib/commentService';

// Sample data as fallback if database fetch fails
const sampleComments: ComponentComment[] = [
  {
    id: uuidv4(),
    name: "Sarah & James",
    message: "Congratulations on your special day! Wishing you both a lifetime of happiness and love.",
    date: new Date(),
    likes: 3,
    replies: []
  },
  {
    id: uuidv4(),
    name: "Michael & Emma",
    message: "So excited to celebrate with you both! Your love story is truly inspiring.",
    date: new Date(),
    likes: 2,
    replies: []
  }
];

// Convert from service Comment to component Comment
function convertServiceToComponentComment(comment: commentService.Comment): ComponentComment {
  return {
    id: comment.id,
    name: comment.name,
    message: comment.message,
    date: comment.date,
    likes: comment.likes,
    replies: comment.replies ? comment.replies.map(r => ({
      id: r.id,
      name: r.name, 
      message: r.message,
      date: r.date,
      likes: r.likes
    })) : []
  };
}

export default function CommentWall() {
  const [comments, setComments] = useState<ComponentComment[]>([]);
  const [animateIndex, setAnimateIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load comments from database on component mount
  useEffect(() => {
    async function loadComments() {
      setIsLoading(true);
      try {
        const fetchedComments = await commentService.fetchComments();
        if (fetchedComments.length > 0) {
          // Convert from service type to component type
          setComments(fetchedComments.map(convertServiceToComponentComment));
        } else {
          // Fallback to sample comments if no database comments found
          setComments(sampleComments);
        }
      } catch (error) {
        console.error('Failed to load comments:', error);
        toast({
          title: "Failed to load comments",
          description: "Please try refreshing the page",
          variant: "destructive"
        });
        // Fallback to sample comments if fetch fails
        setComments(sampleComments);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadComments();
  }, [toast]);

  // Animate comments when they load or change
  useEffect(() => {
    if (!isLoading) {
      comments.forEach((_, index) => {
        setTimeout(() => {
          setAnimateIndex(index);
        }, index * 200);
      });
    }
  }, [comments, isLoading]);

  const handleSubmitComment = async (comment: ComponentComment) => {
    try {
      // Save comment to database
      const success = await commentService.addComment(comment.name, comment.message);
      
      if (success) {
        // Reload comments from database to get the saved version with correct ID
        const updatedComments = await commentService.fetchComments();
        setComments(updatedComments.map(convertServiceToComponentComment));
        
        toast({
          title: "Comment saved!",
          description: "Your wishes have been added to the wall",
          className: "bg-black border border-wedding-gold/30 [&>div]:text-wedding-gold"
        });
      } else {
        throw new Error("Failed to save comment");
      }
    } catch (error) {
      console.error('Error saving comment:', error);
      toast({
        title: "Error saving comment",
        description: "Please try again later",
        variant: "destructive"
      });
      
      // Fallback to local state if save fails
      const newComments = [comment, ...comments];
      setComments(newComments);
    }
    
    // Reset animation
    setAnimateIndex(-1);
    setTimeout(() => {
      // Trigger animations for all comments, starting with the newest
      comments.forEach((_, index) => {
        setTimeout(() => {
          setAnimateIndex(index);
        }, index * 200);
      });
    }, 100);
  };

  const handleLike = async (commentId: string) => {
    try {
      // Optimistic update first for better UX
      setComments(prev => {
        return prev.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        });
      });
      
      // Then save to database
      await commentService.likeComment(commentId);
      
      toast({
        title: "Liked!",
        description: "You liked this message",
        className: "bg-black border border-wedding-gold/30 [&>div]:text-wedding-gold"
      });
    } catch (error) {
      console.error('Error liking comment:', error);
      // Revert optimistic update if save fails
      const fetchedComments = await commentService.fetchComments();
      setComments(fetchedComments.map(convertServiceToComponentComment));
    }
  };

  const handleReply = async (commentId: string, reply: Reply) => {
    try {
      // Optimistic update first for better UX
      setComments(prev => {
        return prev.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, replies: [...comment.replies, reply] };
          }
          return comment;
        });
      });
      
      // Then save to database
      await commentService.addReply(commentId, reply.name, reply.message);
      
      // Reload comments to get the updated data from server
      const fetchedComments = await commentService.fetchComments();
      setComments(fetchedComments.map(convertServiceToComponentComment));
      
      toast({
        title: "Reply posted!",
        description: "Your reply has been added",
        className: "bg-black border border-wedding-gold/30 [&>div]:text-wedding-gold"
      });
    } catch (error) {
      console.error('Error posting reply:', error);
      toast({
        title: "Error posting reply",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleReplyLike = async (replyId: string, parentId: string) => {
    try {
      // Optimistic update first for better UX
      setComments(prev => {
        return prev.map(comment => {
          if (comment.id === parentId) {
            const updatedReplies = comment.replies.map(reply => {
              if (reply.id === replyId) {
                return { ...reply, likes: reply.likes + 1 };
              }
              return reply;
            });
            return { ...comment, replies: updatedReplies };
          }
          return comment;
        });
      });
      
      // Then update in database
      await commentService.likeReply(replyId);
      
      toast({
        title: "Liked!",
        description: "You liked this reply",
        className: "bg-black border border-wedding-gold/30 [&>div]:text-wedding-gold"
      });
    } catch (error) {
      console.error('Error liking reply:', error);
      // Revert optimistic update if save fails
      const fetchedComments = await commentService.fetchComments();
      setComments(fetchedComments.map(convertServiceToComponentComment));
    }
  };

  return (
    <div className="py-4 overflow-hidden relative z-10">
      <div className="w-full text-center">
        <h3 className="text-4xl font-script bg-gradient-to-r from-wedding-gold-gradient-from to-wedding-gold-gradient-to inline-block text-transparent bg-clip-text mb-8 drop-shadow-[0_0_4px_rgba(212,175,55,0.3)]">
          Guest Wishes
        </h3>
      </div>
      
      <CommentForm onSubmit={handleSubmitComment} />
      
      <div className="border-t border-wedding-gold/20 pt-6 space-y-6">
        {isLoading ? (
          <div className="text-center text-wedding-gold/60 py-8">Loading wishes...</div>
        ) : comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              index={index}
              animateIndex={animateIndex}
              onLike={handleLike}
              onReply={handleReply}
              onReplyLike={handleReplyLike}
            />
          ))
        ) : (
          <div className="text-center text-wedding-gold/60 py-8">
            Be the first to leave your wishes for the couple!
          </div>
        )}
      </div>
    </div>
  );
}
