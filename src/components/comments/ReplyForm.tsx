import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useComments } from "@/hooks/use-comments";
import { Reply } from "./types";

interface ReplyFormProps {
  commentId: string;
  onSubmit: () => void;
}

export function ReplyForm({ commentId, onSubmit }: ReplyFormProps) {
  const { addReply } = useComments();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    await addReply(commentId, {
      id: `${commentId}-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      date: new Date(),
      likes: 0
    });

    setName("");
    setMessage("");
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white"
      />
      <Input
        placeholder="Your reply"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="bg-black/50 border border-wedding-gold/30 focus:border-wedding-gold text-white"
      />
      <div className="flex justify-end">
        <Button 
          type="submit" 
          variant="secondary"
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
        >
          Submit Reply
        </Button>
      </div>
    </form>
  );
} 