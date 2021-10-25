react-contenteditable-mention
=====================
基于react-contenteditable及tributejs开发的React组件，支持@等mention功能, 与rc-mention的最大不同的本组件本质是富文本编辑，可支持@人高亮，模板定制，显示链接及图片等，而rc-mention本质内容就是基于textarea开发的文本组件，纯字符串不能满足我们对富文本的要求。


[![download count](https://img.shields.io/badge/-react--contenteditable--mention-brightgreen.svg)](https://www.npmjs.com/package/react-contenteditable-mention)
[![bundle size](https://img.shields.io/badge/-react--contenteditable--mention-yellow.svg)](https://www.npmjs.com/package/react-contenteditable-mention)
<!-- [![license](https://img.shields.io/github/license/lovasoa/react-contenteditable.svg)](https://github.com/lovasoa/react-contenteditable/blob/master/LICENSE) -->


## 安装

```sh
npm install react-contenteditable-mention

```

## 组件传参

|prop|描述|数据类型|
|--|----|----|
|innerRef|元素的 [`ref` attribute](https://reactjs.org/docs/refs-and-the-dom.html)|Object \| Function|
|html|**required:** 编辑元素的innerHTML|String|
|disabled|是否禁用编辑|Boolean|
|onChange|当`innerHTML`改变时触发|Function|
|onBlur|失焦时触发 [blurred](https://developer.mozilla.org/en-US/docs/Web/Events/blur)|Function|
|onFocus|获得焦点时触发 [focus](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event)|Function|
|onKeyUp|按键弹起时触发|Function|
|onKeyDown|按键被按下时触发 |Function|
|className|元素的className|String|
|TributeOptions|mention配置选项，参考[tributejs](https://www.npmjs.com/package/tributejs)选项|

### TributeOptions
```
参考 [tributejs](https://www.npmjs.com/package/tributejs)文档
export interface ITribute {
    trigger?: string; 
    selectClass?: string;
    containerClass?: string;
    itemClass?: string;
    selectTemplate?: (item: TributeItem<any>) => string;
    menuItemTemplate?: (item: TributeItem<any>) => string;
    noMatchTemplate?: () => string;
    menuContainer?: Element;
    lookup?: string | ((item: any, mentionText: string) => string);
    fillAttr?: string;
    values: Array<{
        [key: string]: any;
    }> | ((text: string, cb: (result: Array<{
        [key: string]: any;
    }>) => void) => void);
    requireLeadingSpace?: boolean;
    allowSpaces?: boolean;
    replaceTextSuffix?: string;
    positionMenu?: boolean;
    autocompleteMode?: boolean;
    searchOpts?: TributeSearchOpts;
    menuShowMinLength?: number;
}

export declare type TributeItem<T extends {}> = {
    index: number;
    original: T;
    score: number;
    string: string;
};

export type TributeSearchOpts = {
  pre: string;
  post: string;
  skip: boolean;
};
```


## 例子

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

## 特别说明

一般来说，我们做@功能有两种情况，一种是数据源不变，另一种是数据源根据实时查询的结果而改变
### 1. 静态数据
如果是`数据源不变`，直接在TributeOptions里定义values即可，@的内容作为列表搜索关键词，筛选的结果会更新到菜单选项中

### 2. 远程加载数据
若是远程加载数据，且根据@的内容实时查询数据，则values便是函数，形如：
```
values: (text, cb) => { // text为搜索关键词如 @abc, 则text为abc, cb为内置的回调，只需把最新的列表作为参数传入，菜单选项便会更新， remoteSearch为自定义的请求函数
  remoteSearch(text, users => cb(users));
}
```

注意：如果仅是想替换掉列表，searchOpts里面的skip需设置为true，意为不需对请求回来的结果进行筛选，如：

```
searchOpts： {
  skip:true
}
```
