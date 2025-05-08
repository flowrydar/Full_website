import { supabase } from '@/integrations/supabase/client';

export interface DbComment {
  id: string;
  name: string;
  message: string;
  created_at: string;
  likes: number;
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  date: Date;
  likes: number;
  replies?: Reply[];
}

export interface Reply {
  id: string;
  name: string;
  message: string;
  date: Date;
  likes: number;
}

function mapDbCommentToComment(comment: DbComment): Comment {
  return {
    id: comment.id,
    name: comment.name,
    message: comment.message,
    date: new Date(comment.created_at),
    likes: comment.likes || 0,
    replies: []
  };
}

export async function fetchComments(): Promise<Comment[]> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id, 
        name, 
        message, 
        created_at, 
        likes,
        comment_replies(id, name, message, likes, created_at)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }

    return data.map(mapDbCommentToComment);
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}

export async function addComment(name: string, message: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        name,
        message,
        likes: 0,
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return false;
    }

    console.log('Inserted comment:', data);
    return true;
  } catch (err) {
    console.error('Insert catch error:', err);
    return false;
  }
}

export async function deleteComment(commentId: string): Promise<boolean> {
  try {
    // Allow any user to delete any comment for now
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (deleteError) {
      console.error('Error deleting comment:', deleteError);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Delete catch error:', err);
    return false;
  }
}

export async function likeComment(commentId: string): Promise<boolean> {
  try {
    // Get current likes count
    const { data: commentData, error: fetchError } = await supabase
      .from('comments')
      .select('likes')
      .eq('id', commentId)
      .single();

    if (fetchError || !commentData) {
      console.error('Error fetching comment likes:', fetchError);
      return false;
    }

    // Update likes
    const { error: updateError } = await supabase
      .from('comments')
      .update({ likes: (commentData.likes || 0) + 1 })
      .eq('id', commentId);

    if (updateError) {
      console.error('Error updating likes:', updateError);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Like error:', err);
    return false;
  }
}

export async function addReply(commentId: string, name: string, message: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('comment_replies')
      .insert({
        comment_id: commentId,
        name,
        message,
        likes: 0,
        created_at: new Date().toISOString(),
      })
      .select();

    if (error) {
      console.error('Supabase insert reply error:', error);
      return false;
    }

    console.log('Inserted reply:', data);
    return true;
  } catch (err) {
    console.error('Insert reply catch error:', err);
    return false;
  }
}

export async function likeReply(replyId: string): Promise<boolean> {
  try {
    // Get current likes count
    const { data: replyData, error: fetchError } = await supabase
      .from('comment_replies')
      .select('likes')
      .eq('id', replyId)
      .single();

    if (fetchError || !replyData) {
      console.error('Error fetching reply likes:', fetchError);
      return false;
    }

    // Update likes
    const { error: updateError } = await supabase
      .from('comment_replies')
      .update({ likes: (replyData.likes || 0) + 1 })
      .eq('id', replyId);

    if (updateError) {
      console.error('Error updating reply likes:', updateError);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Like reply error:', err);
    return false;
  }
}

export async function deleteReply(replyId: string): Promise<boolean> {
  try {
    // Allow any user to delete any reply for now
    const { error: deleteError } = await supabase
      .from('comment_replies')
      .delete()
      .eq('id', replyId);

    if (deleteError) {
      console.error('Error deleting reply:', deleteError);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Delete reply catch error:', err);
    return false;
  }
} 