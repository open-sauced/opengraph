import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { graphql } from "@octokit/graphql";
import { RateLimit, Repository, User } from "@octokit/graphql-schema";

import GithubConfig from "../config/github.config";
import getRepo from "./gql/get-repo";
import getUser from "./gql/get-user";

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private readonly graphqlWithAuth: typeof graphql;

  constructor (
    @Inject(GithubConfig.KEY)
    private readonly githubConfig: ConfigType<typeof GithubConfig>,
  ) {
    this.graphqlWithAuth = graphql.defaults({ headers: { authorization: `token ${githubConfig.userPat}` } });
  }

  async getUser (username: string): Promise<User> {
    const today = (new Date);
    const today30daysAgo = new Date((new Date).setDate(today.getDate() - 30));

    const { query, variables } = getUser(username, today30daysAgo.toISOString());

    const { user } = await this.graphqlWithAuth<{ user: User }>(query, variables);

    return user;
  }

  async getRepo (owner: string, repo: string) {
    const { query, variables } = getRepo(owner, repo);

    const { repository } = await this.graphqlWithAuth<{ repository: Repository }>(query, variables);

    return repository;
  }

  async rateLimit () {
    const { rateLimit } = await this.graphqlWithAuth<{ rateLimit: RateLimit }>(`query {
      rateLimit {
        limit,
        cost,
        remaining,
        resetAt
      }
    }`);

    this.logger.debug(`Rate limit: ${JSON.stringify(rateLimit)}`);

    return rateLimit;
  }
}
