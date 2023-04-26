
const cardFooter = (langs: string, repos: string) => {

  return `
    <div tw="flex-col" style="gap: 8px;">
      <div tw="h-48px items-center" style="gap: 8px;">
        ${repos}
      </div>

      <div tw="flex-col h-18px justify-center">
        <div tw="h-12px" style="gap: 4px;">
          ${langs}
        </div>
      </div>
    </div>
  `
}

export default cardFooter;
