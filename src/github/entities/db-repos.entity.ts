export interface DbRepo {
  id: string;
  host_id: string;
  size: number;
  stars: number;
  issues: number;
  full_name: string;
  pr_active_count?: number;
  open_prs_count?: number;
  merged_prs_count?: number;
  closed_prs_count?: number;
  draft_prs_count?: number;
  spam_prs_count?: number;
  pr_velocity_count?: number;
  churnTotalCount?: number;
  language: string;
  description: string;
}
