react-contenteditable-mention
=====================

React component for a div with editable contents ,
and supports @mention everything you want!

[![download count](https://img.shields.io/badge/-react--contenteditable--mention-brightgreen.svg)](https://www.npmjs.com/package/react-contenteditable-mention)
[![bundle size](https://img.shields.io/badge/-react--contenteditable--mention-yellow.svg)](https://www.npmjs.com/package/react-contenteditable-mention)
<!-- [![license](https://img.shields.io/github/license/lovasoa/react-contenteditable.svg)](https://github.com/lovasoa/react-contenteditable/blob/master/LICENSE) -->


## Install

```sh
npm install react-contenteditable-mention
```

## Usage

```javascript
import React, { useState } from 'react';
import ContentEditableMention from 'react-contenteditable-mention'

export interface IAppProps {}
const BaseInfo: React.FC<IAppProps> = (props) => {
  const [html, setHtml] = useState('')
  const [dataList,setDataList] = useState([
    {
      name:'Jamki',
      account: 'acsadfasx',
      age: 23,
      position: 'engineer',
    },
    {
      name:'Bamki',
      account: 'acsdaasx',
      age: 23,
      position: 'engineer',
    },
    {
      name:'Camki',
      account: 'acsax',
      age: 23,
      position: 'engineer',
    },
  ])

  const remoteSearch = (text, cb) =>  {
    if (Math.random() > 0.5) {
      cb(dataList.concat({
        name:'古',
        account: '234242',
        age: 23,
        position: '前端开发工程师',
      },))
      return 
    }
    cb(dataList)
  }
  const onBlur = (e) => {
  }
  const onSelect = (e) => {
  }

  return (
    <div>
      <div>
        <ContentEditableMention 
          html={html}
          onSelect={onSelect}
          onBlur={onBlur}
          placeholder="This is a placeholder"
          TributeOptions={
            {
              // values: (text, cb) => {
              //   remoteSearch(text, users => cb(users));
              // },
              values: dataList,
              selectTemplate: (item) => { //contenteditable="false"才能完整匹配
                return (
                  `<span style="color:red;" contenteditable="false">@${item.original.name}</span>`
                );
              },
              menuItemTemplate: (item) => {
                return (
                  `<div style="display:flex;align-items:center;">
                      <img src="https://hbimg.huabanimg.com/6912c11e58433dc8d2e582f823bd27fc2923ab2614636-qr3tIZ_fw658/format/webp" alt="" width="30" height="30px" style="display:inline-block; border-radius:50%;"/>
                      <span style="font-weight:bold;margin-left: 10px;cursor: pointer;">${item.original.name}</span>
                  </div>`
                );
              },
              itemClass: "mentionMenuItem",
              containerClass: "mentionWrap",
              selectClass: "mentionSelectItem",
            }
          }
        ></ContentEditableMention>
      </div>
    </div>
  );
};
```

## Examples

You can try **react-contenteditable-mention** right from your browser to see if it fits your project's needs:

 <!-- * [Simple example](https://codesandbox.io/s/4rlw34mnk7) : just an editable `<div>` with a default value.
 * [Advanced example](https://codesandbox.io/s/l91xvkox9l) : custom tag, input sanitization, and rich text edition. -->
