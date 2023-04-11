const repoIconWithName = (name: string, avatarUrl: string) => `
  <div tw="h-48px p-8px border border-zinc-200 rounded-lg bg-gray-50" style="gap: 12px">
    <div tw="h-32px" style="gap: 6px">
      <img tw="w-32px h-32px rounded" src="${avatarUrl}"/>
      <div tw="h-32px" style="gap: 2px">
        <h2 tw="m-0 font-medium text-32px leading-32px text-zinc-900">
          ${name}
        </h2>
      </div>
    </div>
  </div>
`;

export default repoIconWithName;
