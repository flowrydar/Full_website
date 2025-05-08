import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Comment, Reply } from '@/components/comments/types';
import { getUserToken } from '@/lib/tokenUtils';

interface CommentsContextType {
  comments: Comment[];
  addComment: (comment: Pick<Comment, 'name' | 'message' | 'date' | 'likes'>) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  likeComment: (id: string) => Promise<void>;
  addReply: (commentId: string, reply: Reply) => Promise<void>;
  deleteReply: (replyId: string, commentId: string) => Promise<void>;
  likeReply: (replyId: string, commentId: string) => Promise<void>;
  userId: string | null;
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export function CommentsProvider({ children }: { children: ReactNode }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = getUserToken();
    setUserId(token);
    loadComments();
  }, []);

  async function loadComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id, 
          name, 
          message, 
          created_at, 
          likes, 
          user_id,
          comment_replies(id, name, message, likes, created_at, user_id)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedComments: Comment[] = data.map(comment => ({
        id: comment.id,
        name: comment.name,
        message: comment.message,
        date: new Date(comment.created_at),
        likes: comment.likes || 0,
        user_id: comment.user_id,
        replies: (comment.comment_replies || []).map((reply: any) => ({
          id: reply.id,
          name: reply.name,
          message: reply.message,
          date: new Date(reply.created_at),
          likes: reply.likes || 0,
          user_id: reply.user_id
        }))
      }));

      setComments(formattedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }

  async function addComment(comment: Pick<Comment, 'name' | 'message' | 'date' | 'likes'>) {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            name: comment.name,
            message: comment.message,
            created_at: comment.date.toISOString(),
            likes: 0,
            user_id: userId
          }
        ])
        .select();

      if (error) throw error;

      await loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  async function deleteComment(id: string) {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      await loadComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }

  async function likeComment(id: string) {
    try {
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('likes')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('comments')
        .update({ likes: (data?.likes || 0) + 1 })
        .eq('id', id);

      if (updateError) throw updateError;

      await loadComments();
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  }

  async function addReply(commentId: string, reply: Reply) {
    try {
      const { data, error } = await supabase
        .from('comment_replies')
        .insert([
          {
            comment_id: commentId,
            name: reply.name,
            message: reply.message,
            created_at: reply.date.toISOString(),
            likes: 0,
            user_id: userId
          }
        ])
        .select();

      if (error) throw error;

      await loadComments();
    } catch (error) {
      console.error('Error adding reply:', error);
      throw error;
    }
  }

  async function deleteReply(replyId: string, commentId: string) {
    try {
      const { error } = await supabase
        .from('comment_replies')
        .delete()
        .eq('id', replyId)
        .eq('user_id', userId);

      if (error) throw error;

      await loadComments();
    } catch (error) {
      console.error('Error deleting reply:', error);
      throw error;
    }
  }

  async function likeReply(replyId: string, commentId: string) {
    try {
      const { data, error: fetchError } = await supabase
        .from('comment_replies')
        .select('likes')
        .eq('id', replyId)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('comment_replies')
        .update({ likes: (data?.likes || 0) + 1 })
        .eq('id', replyId);

      if (updateError) throw updateError;

      await loadComments();
    } catch (error) {
      console.error('Error liking reply:', error);
      throw error;
    }
  }

  return (
    <CommentsContext.Provider value={{
      comments,
      addComment,
      deleteComment,
      likeComment,
      addReply,
      deleteReply,
      likeReply,
      userId
    }}>
      {children}
    </CommentsContext.Provider>
  );
}

export function useComments() {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider');
  }
  return context;
}
