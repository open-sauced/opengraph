interface DbHighlight {
  readonly id: string;
  readonly user_id: string;
  readonly url: string;
  readonly title: string;
  readonly highlight: string;
  readonly pinned: boolean;
  readonly created_at: string;
  readonly updated_at: string;
  readonly deleted_at: string | null;
  readonly login: string;
}

interface DbReaction {
  emoji_id: string;
  reaction_count: string;
}
