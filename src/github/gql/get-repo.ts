const getRepo = (owner: string, repo: string) => ({
  query: `
query ($owner: String!, $repo: String!) {
  repository(
    owner: $owner
    name: $repo
  ) {
    id
    name
    databaseId
    nameWithOwner
    owner {
      id
      login
      avatarUrl
    }
    languages (first: 100, orderBy: { field: SIZE, direction: DESC }) {
      edges {
        node {
          id
          color
          name
        }
        size
      }
      totalSize
      totalCount
    }
  }
}`,
  variables: {
    owner,
    repo,
  },
});

export default getRepo;
