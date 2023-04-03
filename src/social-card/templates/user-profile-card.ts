const userProfileCard = (avatarUrl: string, name: string, langs: string, repos: string): string => `
  <style>
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

  }

  div {
    display: flex;
  }
</style>

<div style="
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 48px 32px 32px;
    gap: 31px;
    position: relative;
    width: 1200px;
    height: 627px;
    background: #FFFFFF;
    border-radius: 16px;"
>
    <div style="

        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 16px;
        width: 1136px;
        height: 134px;
    ">
        <div style="

            flex-direction: row;
            align-items: flex-start;
            padding: 0px;
            gap: 16px;

            width: 1136px;
            height: 134px;
        ">
            <img src="${avatarUrl}" style="
                box-sizing: border-box;
                width: 132px;
                height: 132px;
                border: 2px solid #F8F9FA;
                border-radius: 500px;
            "/>

            <h1 style="
                width: 926px;
                height: 134px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 500;
                font-size: 96px;
                line-height: 140%;
                letter-spacing: -0.02em;
                color: #11181C;
            ">
                ${name}
            </h1>
            <div style="

                flex-direction: row;
                align-items: center;
                padding: 0px;
                gap: 8px;

                width: 46px;
                height: 46px;
            ">
                <div style="

                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;
                    gap: 16px;

                    width: 46px;
                    height: 46px;
                ">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAK2SURBVEhLlVa/ixQxFE4yszsu7i7Lceihnui6/gIFuUP0FASxUMTiwGss7K9RQXvB2iuu0T9Ce1v/CbGysLO5QvHcU3Zm40vyMvNm5mVm72N5+ZLJe99L3mQ2cn/npMiUTqVOlSEzT1JprBZiLsVcCA02J2DNuIYRQ+wcIEIKJSo/MA7SGDMJqQOhFUiYWzwNz8sFXGwLSpG7ANq2bggWAsxPJS4l6EKAgKQjkdNA5PEC4AQIQpl5mTYxKMph8nFznSi1YcAW+SklIeJHx5vDcana18oh5OzG0VmdGB99tjvc+dR/9a5z877sJG7cgo9QPgepJRmSyjlQo5Xh64+yP0JXePJz7/fbF9m3r8FzQFbQjt7WSxodoEbL/e03QoWD8AJ0rZ7Hk7Xu9QfYIYhWJ9GZS9ipY9FzIGVv83l+KCqIz12hLhXUBdxulhBP1uML69ipIR5frrsguC0y34N8viNHHm3blkd0amxbfhVWIKRvndSx052LN7DPQfaHtuWjWIGaNh1INjZDu+8gk14wR1JkPoTsDbq3t7ATArymoQRaT3Jy96kaLGGnAeFNLtfAJZJ3u0n3zhPkYZgtCu9huQYutO921h4ulD4IRDHyGvItIvArSG49RtYIGUW2zvwiOAF7DtTyanz2Go60Ior4OvCfCovO1XvNb2cB+OSmM+QVkLfIxvIBoVXH3flshz74o/9OsVMBWYFdIFll+uWzrueltZ5nOkt1Cr+ZsdP9gw/vxZzbH4AU3B+Ov3jJwUp8fkNIlf34rn/t6Slk+k+kmQlnLlvCXLyAZ9ANXryaBMCCm40CuVvrAhkL1zqj4S961tYFuK9pCdzKXaHMxctzfp4BL+C9AqDBQoEL5AIkanEjPBT4vHIBEhNKjywnjLNxKA3zWbXVAL1c4+KhNY0rBKCkRCDEf33TAYphGyFWAAAAAElFTkSuQmCC" width="1px" height="1px" style="
                    width: 46px;
                    height: 46px;

                    border-radius: 4px;
                    "/>
                </div>
            </div>
        </div>
    </div>

    <div style="

        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        gap: 8px;

        width: 1136px;
        height: 73px;
    ">
        <div style="

            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
            gap: 16px;

            width: 1136px;
            height: 48px;
        ">
            <div style="

                flex-direction: row;
                align-items: center;
                padding: 0px;
                gap: 8px;

                width: 1136px;
                height: 48px;
            ">
                ${repos}
            </div>

        </div>

        <div style="

            flex-direction: column;
            align-items: center;
            padding: 0px;

            width: 1136px;
            height: 17px;
        ">
            <div style="

                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 0px;
                gap: 8px;

                width: 1136px;
                height: 17px;
            ">
                <div style="

                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0px;
                    gap: 8px;

                    width: 1136px;
                    height: 10.5px;
                ">
                    <div style="

                        flex-direction: row;
                        justify-content: center;
                        align-items: center;
                        padding: 0px;
                        gap: 4px;

                        width: 1136px;
                        height: 10.5px;

                        border-radius: 20px;
                    ">
                        ${langs}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

export default userProfileCard;