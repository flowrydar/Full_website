
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Reply } from './types';

interface CommentReplyProps {
  commentId: string;
  onSubmit: (commentId: string, reply: Reply) => void;
  onCancel: () => void;
}

const CommentReply = ({ commentId, onSubmit, onCancel }: CommentReplyProps) => {
  const [replyName, setReplyName] = useState('');
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!replyName.trim() || !replyText.trim()) {
      toast({
        title: "Please fill out all fields",
        description: "Both name and message are required",
        variant: "destructive",
      });
      return;
    }

    const reply: Reply = {
      id: `${commentId}-${Date.now()}`,
      name: replyName,
      message: replyText,
      date: new Date(),
      likes: 0
    };

    onSubmit(commentId, reply);
    setReplyName('');
    setReplyText('');

    toast({
      title: "Reply posted",
      description: "Your reply has been added",
    });
  };

  return (
    <div className="mt-3 pl-4 border-l-2 border-wedding-gold/10 py-2 space-y-2">
      <Input
        type="text"
        value={replyName}
        onChange={(e) => setReplyName(e.target.value)}
        placeholder="Your Name"
        className="w-full px-3 py-1 text-sm bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white rounded-md"
      />
      <Textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Your reply..."
        className="w-full min-h-[60px] text-sm bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white rounded-md resize-none"
      />
      <div className="flex justify-end space-x-2">
        <Button 
          onClick={onCancel}
          variant="ghost" 
          className="text-xs h-8 text-wedding-lilac/70"
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          className="text-xs h-8 bg-wedding-gold hover:bg-wedding-lilac text-black"
        >
          <Send className="mr-1 h-3 w-3" />
          Reply
        </Button>
      </div>
    </div>
  );
};

export default CommentReply;
