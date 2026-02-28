export interface Anime {
  id: number;
  title: string;
  image: string;
  rating: number;
  episodes: number;
  genre: string[];
  status: "Airing" | "Completed" | "Upcoming";
  synopsis: string;
}

export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  avatar: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned?: boolean;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export const animeList: Anime[] = [
  { id: 1, title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", rating: 9.0, episodes: 87, genre: ["Action", "Drama"], status: "Completed", synopsis: "Humanity lives inside cities surrounded by enormous walls due to the Titans." },
  { id: 2, title: "Demon Slayer", image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", rating: 8.7, episodes: 44, genre: ["Action", "Fantasy"], status: "Airing", synopsis: "A young boy becomes a demon slayer after his family is slaughtered." },
  { id: 3, title: "Jujutsu Kaisen", image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", rating: 8.8, episodes: 47, genre: ["Action", "Supernatural"], status: "Airing", synopsis: "A boy swallows a cursed talisman and enrolls in a school for sorcerers." },
  { id: 4, title: "One Piece", image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", rating: 8.9, episodes: 1100, genre: ["Adventure", "Comedy"], status: "Airing", synopsis: "Monkey D. Luffy sets off on an adventure to find the legendary One Piece." },
  { id: 5, title: "Fullmetal Alchemist: Brotherhood", image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", rating: 9.2, episodes: 64, genre: ["Action", "Adventure"], status: "Completed", synopsis: "Two brothers use alchemy to search for the Philosopher's Stone." },
  { id: 6, title: "My Hero Academia", image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg", rating: 8.0, episodes: 138, genre: ["Action", "School"], status: "Airing", synopsis: "A boy born without superpowers in a superhero world dreams of becoming the greatest hero." },
  { id: 7, title: "Spy x Family", image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg", rating: 8.6, episodes: 37, genre: ["Comedy", "Action"], status: "Airing", synopsis: "A spy forms a fake family, not knowing his wife is an assassin and daughter a telepath." },
  { id: 8, title: "Chainsaw Man", image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg", rating: 8.5, episodes: 12, genre: ["Action", "Horror"], status: "Completed", synopsis: "Denji merges with his chainsaw devil pet to become Chainsaw Man." },
];

export const forumTopics: ForumTopic[] = [
  { id: 1, title: "Who is the strongest anime character of all time?", author: "NarutoFan99", avatar: "🦊", category: "General", replies: 247, views: 5420, lastActivity: "2 min ago", pinned: true },
  { id: 2, title: "Attack on Titan ending discussion (SPOILERS)", author: "TitanSlayer", avatar: "⚔️", category: "Discussion", replies: 189, views: 3210, lastActivity: "15 min ago" },
  { id: 3, title: "Best anime openings ranked - share your list!", author: "MusicWeeb", avatar: "🎵", category: "Fun", replies: 93, views: 1870, lastActivity: "1 hour ago" },
  { id: 4, title: "Jujutsu Kaisen Season 3 predictions", author: "CursedEnergy", avatar: "👁️", category: "Discussion", replies: 156, views: 4100, lastActivity: "30 min ago" },
  { id: 5, title: "Unpopular anime opinions thread", author: "HotTakes", avatar: "🔥", category: "General", replies: 342, views: 8900, lastActivity: "5 min ago" },
  { id: 6, title: "Recommend me something like Steins;Gate", author: "TimeTraveler", avatar: "⏰", category: "Recommendations", replies: 45, views: 980, lastActivity: "3 hours ago" },
  { id: 7, title: "One Piece Chapter 1120 theories", author: "PirateKing", avatar: "🏴‍☠️", category: "Manga", replies: 78, views: 2300, lastActivity: "45 min ago" },
];

export const topicComments: Comment[] = [
  { id: 1, author: "NarutoFan99", avatar: "🦊", content: "I'll start - I think Goku is the strongest anime character of all time. His power scaling is literally infinite at this point.", timestamp: "2 hours ago", likes: 42 },
  { id: 2, author: "SaitamaSimp", avatar: "👊", content: "Saitama literally one-punches everything. That's his whole point - he's unbeatable by design.", timestamp: "1 hour ago", likes: 67 },
  { id: 3, author: "AnimeScholar", avatar: "📚", content: "If we're talking pure power, it's probably Zeno from Dragon Ball Super. He can literally erase universes.", timestamp: "45 min ago", likes: 31 },
  { id: 4, author: "WeebQueen", avatar: "👑", content: "Y'all sleeping on Madara Uchiha. The man fought the entire shinobi alliance by himself.", timestamp: "30 min ago", likes: 55 },
  { id: 5, author: "GigaChad", avatar: "💪", content: "Mob from Mob Psycho 100 at ???% is actually insane. Plus he's a better written character than most of these picks.", timestamp: "15 min ago", likes: 28 },
];
