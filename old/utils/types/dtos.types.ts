

export interface TopicContributionEndpoint {
  readonly data: DbContribution[];
}

interface DbContribution {
  readonly id: number;
  readonly commits: string;
  readonly commit_days: string;
  readonly files_modified: string;
  readonly first_commit_time: string;
  readonly last_commit_time: string;
  readonly email: string;
  readonly name: string;
  readonly host_login: string;
  readonly langs: string;
  readonly recent_repo_list: string;
  readonly recent_pr_total: number;
  readonly recent_contribution_count: number;
  readonly recent_opened_prs: number;
  readonly recent_pr_reviews: number;
  readonly recent_pr_velocity: number;
  readonly recent_merged_prs: number;
}
