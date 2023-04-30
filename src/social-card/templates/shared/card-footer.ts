
const heartIconData = `data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.73649 2.5C3.82903 2.5 1 5.052 1 8.51351C1 12.3318 3.80141 15.5735 6.38882 17.7763C7.70549 18.8973 9.01844 19.7929 10.0004 20.4077C10.4922 20.7157 10.9029 20.9544 11.1922 21.1169C11.4093 21.2388 11.5582 21.318 11.6223 21.3516C11.7407 21.4132 11.8652 21.4527 12 21.4527C12.1193 21.4527 12.2378 21.4238 12.3438 21.3693C12.5003 21.2886 12.6543 21.2031 12.8078 21.1169C13.0971 20.9544 13.5078 20.7157 13.9996 20.4077C14.9816 19.7929 16.2945 18.8973 17.6112 17.7763C20.1986 15.5735 23 12.3318 23 8.51351C23 5.052 20.171 2.5 17.2635 2.5C14.9702 2.5 13.1192 3.72621 12 5.60482C10.8808 3.72621 9.02981 2.5 6.73649 2.5ZM6.73649 4C4.65746 4 2.5 5.88043 2.5 8.51351C2.5 11.6209 4.8236 14.4738 7.36118 16.6342C8.60701 17.6948 9.85656 18.5479 10.7965 19.1364C11.2656 19.4301 11.6557 19.6567 11.9269 19.8091L12 19.85L12.0731 19.8091C12.3443 19.6567 12.7344 19.4301 13.2035 19.1364C14.1434 18.5479 15.393 17.6948 16.6388 16.6342C19.1764 14.4738 21.5 11.6209 21.5 8.51351C21.5 5.88043 19.3425 4 17.2635 4C15.1581 4 13.4627 5.38899 12.7115 7.64258C12.6094 7.94883 12.3228 8.15541 12 8.15541C11.6772 8.15541 11.3906 7.94883 11.2885 7.64258C10.5373 5.38899 8.84185 4 6.73649 4Z' fill='%2324292F'/%3e%3c/svg%3e`;

const cardFooter = (langs: string, repos: string, reactions?: number) => `
    <div tw="flex-col" style="gap: 8px;">
      <div tw="h-48px ${!reactions ? "items-center" : "justify-between"}" style="gap: 8px;">
        <div tw="h-48px items-center" style="gap: 8px;">
          ${repos}
        </div>

        ${reactions
    ? `
          <div tw="h-48px items-center" style="gap: 12px;">
            <img tw="w-32px h-32px" width="1" height="1" src="${heartIconData}"/>
            <span tw="font-medium text-32px text-black">
              ${reactions} Reactions
            </span>
          </div>
        `
    : ""}
      </div>

      <div tw="flex-col h-18px justify-center overflow-hidden">
        <div tw="h-12px" style="gap: 4px;">
          ${langs}
        </div>
      </div>
    </div>
  `;

export default cardFooter;
