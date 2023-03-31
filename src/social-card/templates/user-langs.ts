import colors from "github-colors/colors.json";

const userLangs = (langs: string[], joinLiteral = "") => langs.map(lang => {
  const colorKey = Object.keys(colors).find(key => key.toLowerCase() === lang.toLowerCase());
  const color = colorKey ? colors[colorKey as keyof typeof colors].color ?? "#000" : "#000";

  return `
      <div style="
        width: ${Math.round(100 / langs.length)}%;
        height: 10%;
        background: ${color};
      "/>
    `;
}).join(joinLiteral);

export default userLangs;
