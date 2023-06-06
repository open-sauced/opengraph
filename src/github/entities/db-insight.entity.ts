export interface DbInsight {
  id: number;
  user_id: number;
  name: string;
  is_public: boolean;
  is_favorite: boolean;
  short_code: string;
  created_at: string;
  updated_at: string;
  repos: DbUserInsightRepo[];
}

interface DbUserInsightRepo {
  readonly id: number;
  readonly insight_id: number;
  readonly repo_id: number;
  readonly full_name: string;
  readonly created_at?: string;
}
