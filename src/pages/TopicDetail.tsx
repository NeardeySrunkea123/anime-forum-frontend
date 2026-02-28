import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { forumTopics, topicComments, type Comment } from "@/data/mockData";

const TopicDetail = () => {
  const { id } = useParams();
  const topic = forumTopics.find((t) => t.id === Number(id));
  const [comments, setComments] = useState<Comment[]>(topicComments);
  const [newComment, setNewComment] = useState("");

  if (!topic) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Topic not found.</p>
        <Link to="/forum" className="text-primary underline mt-2 inline-block">Back to forum</Link>
      </div>
    );
  }

  const handlePost = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: comments.length + 1,
      author: "You",
      avatar: "😎",
      content: newComment.trim(),
      timestamp: "Just now",
      likes: 0,
    };
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Link to="/forum" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Forum
      </Link>

      <div className="glass rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{topic.avatar}</span>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">{topic.title}</h1>
            <p className="text-xs text-muted-foreground">
              Posted by <span className="text-primary">{topic.author}</span> • {topic.lastActivity}
            </p>
          </div>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {comments.length} replies</span>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-3 mb-6">
        {comments.map((c) => (
          <div key={c.id} className="bg-card rounded-xl p-4 border border-border/40">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{c.avatar}</span>
              <span className="text-sm font-semibold text-foreground">{c.author}</span>
              <span className="text-xs text-muted-foreground">{c.timestamp}</span>
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">{c.content}</p>
            <button className="flex items-center gap-1 mt-3 text-xs text-muted-foreground hover:text-secondary transition-colors">
              <Heart className="w-3.5 h-3.5" /> {c.likes}
            </button>
          </div>
        ))}
      </div>

      {/* New Comment */}
      <div className="glass rounded-xl p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground border border-border focus:border-primary focus:outline-none resize-none mb-3"
        />
        <div className="flex justify-end">
          <button
            onClick={handlePost}
            disabled={!newComment.trim()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" /> Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
