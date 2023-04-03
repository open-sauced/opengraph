const repoIconWithName = (name: string, avatarUrl: string) => `
    <div style="
      flex-direction: row;
      align-items: center;
      padding: 8px;
      gap: 12px;
      height: 48px;
      background: #F8F9FA;
      border: 1px solid #DFE3E6;
      border-radius: 8px;
    ">
      <div style="
          flex-direction: row;
          align-items: center;
          padding: 0px;
          gap: 6px;
          height: 32px;
      ">
          <img src="${avatarUrl}" style="
              width: 32px;
              height: 32px;
              border-radius: 4px;
          "/>
          <div style="
              flex-direction: row;
              align-items: flex-start;
              padding: 0px;
              gap: 2px;
              height: 32px;
          ">
              <h2 style="
                  height: 32px;
                  font-family: 'Inter';
                  font-style: normal;
                  font-weight: 500;
                  font-size: 32px;
                  line-height: 100%;
                  color: #11181C;
              ">
                  ${name}
              </h2>
          </div>
      </div>
    </div>
  `;

export default repoIconWithName;
