const repoIconWithName = (name: string, avatarUrl: string) => `
    <div tw="flex-row items-center p-8 h-48 border border-zinc-200 rounded-lg bg-gray-50">
      <div tw="flex-row items-center p-0 h-32">
        <img tw="w-32 h-32 rounded" src="${avatarUrl}"/>
        <div tw="flex-row items-start p-0 h-32">
          <h2 tw="h-32 not-italic font-medium text-4xl text-zinc-900">
            ${name}
          </h2>
        </div>
      </div>
    </div>
  `;

export default repoIconWithName;
