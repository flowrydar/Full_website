import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Comment } from './types';
import { v4 as uuidv4 } from 'uuid';

interface CommentFormProps {
  onSubmit: (comment: Comment) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;

    if (!name.trim() || !message.trim()) {
      toast({
        title: "Please fill out all fields",
        description: "Both name and message are required",
        variant: "destructive",
        className: "bg-black border border-wedding-gold/30 text-wedding-gold"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newComment: Comment = {
        id: uuidv4(),
        name: name.trim(),
        message: message.trim(),
        date: new Date(),
        likes: 0,
        replies: []
      };
      
      onSubmit(newComment);
      
      setName('');
      setMessage('');
      toast({
        title: "Message posted",
        description: "Your message has been added to the wall",
        className: "bg-black border border-wedding-gold/30 [&>div]:text-wedding-gold [&>div]:font-script [&>div>div:last-child]:text-wedding-lilac"
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      toast({
        title: "Error posting message",
        description: "Please try again",
        variant: "destructive",
        className: "bg-black border border-red-500/30 text-red-400"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="space-y-2">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Share your wishes for the couple..."
          className="min-h-[100px] bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white resize-none"
          disabled={isSubmitting}
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit"
          className={`
            relative z-30 
            bg-gradient-to-r from-wedding-gold-gradient-from to-wedding-gold-gradient-to 
            hover:bg-wedding-lilac hover:from-wedding-lilac hover:to-wedding-lilac 
            active:bg-wedding-lilac-dark active:from-wedding-lilac-dark active:to-wedding-lilac-dark
            text-black font-script text-lg px-6
            transition-all duration-200 
            hover:scale-105 hover:shadow-lg
            active:scale-95
            shadow-md rounded-lg 
            after:content-[''] after:absolute after:inset-0 after:rounded-lg after:opacity-0 after:hover:opacity-100
            after:transition-opacity after:duration-300 after:border-2 after:border-wedding-lilac after:pointer-events-none
          `}
          disabled={isSubmitting}
        >
          <span className="relative z-10 flex items-center justify-center">
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Posting...' : 'Post'}
          </span>
        </Button>
      </div>
    </form>
  );
} 