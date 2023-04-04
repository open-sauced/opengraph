/*
 * missing values
 * organizationVerifiedDomainEmails
 * pinnedItems
 * repositoriesContributedTo
 * starredRepositories
 * anything sponsors
 */

const getUser = (username: string, dateSince: string) => ({
  query: `# Missing values
# organizationVerifiedDomainEmails
# pinnedItems
# repositoriesContributedTo
# starredRepositories
# anything sponsors

query ($username: String!, $dateSince: DateTime) {
  user(login: $username) {
    id
    avatarUrl
    bio
    bioHTML
    company
    companyHTML
    createdAt
    email
    hasSponsorsListing
    isBountyHunter
    isCampusExpert
    isDeveloperProgramMember
    isEmployee
    isGitHubStar
    isHireable
    isSiteAdmin
    location
    login
    monthlyEstimatedSponsorsIncomeInCents
    name
    url
    pronouns
    resourcePath
    totalSponsorshipAmountAsSponsorInCents
    websiteUrl
    twitterUsername
    organization(login: "open-sauced") {
      id
      avatarUrl
      name
      url
      updatedAt
    }
    organizations(first: 10, orderBy: { field: CREATED_AT, direction: ASC }) {
      nodes {
        id
        avatarUrl
        name
        url
        updatedAt
      }
    }
    socialAccounts(first: 10) {
      nodes {
        displayName
        provider
        url
      }
    }
    status {
      id
      emoji
      message
      organization {
        id
      }
    }
    repositories(first: 100, orderBy: { field: PUSHED_AT, direction: DESC }) {
      nodes {
        name
        primaryLanguage {
          name
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          edges {
            node {
              id
              name
              color
            }
            size
          }
          totalSize
          totalCount
        }
        pushedAt
      }
    }
    topRepositories(
      first: 100
      orderBy: { field: PUSHED_AT, direction: DESC }
      since: $dateSince
    ) {
      nodes {
        name
        owner {
          login
          avatarUrl
        }
        isPrivate
        primaryLanguage {
          name
        }
        pushedAt
      }
    }
  }
}`,
  variables: {
    username,
    dateSince,
  },
});

export default getUser;
