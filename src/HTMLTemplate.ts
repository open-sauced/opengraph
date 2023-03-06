
export default function HTMLTemplate(name: string) {
    return `
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;

        }
    </style>

    <div style="font-family: Roboto; display: flex; padding: 20px;  color: #000000;">
        <div style="display: flex; justify-content: space-between; width: 100%">
            <div style="display: flex;">
                <img src="http://localhost:3006/avatar.png" width="100px" height="100px"/>
            </div>
            <div style="display: flex; flex-direction: column;">
                <h1 style="font-size: 24px">${name}</h1>
                <p>This is a test</p>
            </div>
            <div style="display: flex">
                <img src="https://hot.opensauced.pizza/static/openSauced.9ade9e5f.svg" width="20px" />
            </div>
        </div>
    </div>
    `;
}