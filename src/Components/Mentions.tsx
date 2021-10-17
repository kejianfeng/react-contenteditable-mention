import React, {useEffect, useMemo, useRef}from 'react';
import Tribute from "tributejs";
import {TributeSearchOpts, TributeCollection, TributeOptions} from 'tributejs'
import ContentEditable from 'react-contenteditable'
// import ImageUploader from 'react-images-upload';
import './style.css'

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements["div"], { onChange: ((event: ContentEditableEvent) => void) }>;


export type TributeItem<T extends {}> = {
  index: number;
  original: T;
  score: number;
  string: string;
};

export interface ITribute  {
  // 触发mentions的符号
  trigger?: string;
  // element to target for @mentions
  // iframe?: any;

  // 选择到的class
  selectClass?: string;
  containerClass?: string;
  //菜单选项的类名
  itemClass?: string;

  // 选择选项后调用的函数，它返回要插入的内容
  selectTemplate?: (item: TributeItem<any>) => string;

  // 在选择项中显示项目的模板
  menuItemTemplate?: (item: TributeItem<any>) => string;

  // template for when no match is found (optional),
  // If no template is provided, menu is hidden.
  noMatchTemplate?: () => string;

  // specify an alternative parent container for the menu
  menuContainer?: Element;

  // column to search against in the object (accepts function or string)
  lookup?: string | ((item: any, mentionText: string) => string);

  // column that contains the content to insert by default
  fillAttr?: string;

  //数据源
  values: Array<{[key:string]:any}> | ((text: string, cb: (result: Array<{[key:string]:any}>) => void) => void);

  // specify whether a space is required before the trigger character
  requireLeadingSpace?: boolean;

  // specify whether a space is allowed in the middle of mentions
  allowSpaces?: boolean;

  // (defaults to empty space if undefined)
  replaceTextSuffix?: string;

  //specify whether the menu should be positioned
  positionMenu?: boolean;

  //specify whether to put Tribute in autocomplete mode
  autocompleteMode?: boolean;

  // Customize the elements used to wrap matched strings within the results list
  searchOpts?: TributeSearchOpts;

  // require X number of characters to be entered before menu shows
  menuShowMinLength?: number;
}


export interface IAppProps  extends DivProps{
  // value?: InnerHTML;
  id: string;
  html: string;
  disabled?: boolean;
  tagName?: string;
  className?: string;
  style?: Object;
  placeholder?:string;
  innerRef?: React.RefObject<HTMLElement> | Function;
  onSelect?: (node?:any) => any;
  onFocus:  (node?:any) => any;
  // uploadImage?: {
  //   visible?: boolean;
  // },
  TributeOptions: ITribute
}
const CMention:React.FC<IAppProps> = ({
  id,
  onSelect,
  onChange,
  onBlur,
  onFocus,
  // value,
  disabled,
  tagName,
  className,
  html,
  style,
  placeholder,
  innerRef,
  TributeOptions,
  // ...restProps
}) =>  {
  const {
    values,
    selectTemplate,
    menuItemTemplate,
    trigger,
    selectClass,
    containerClass,
    itemClass,
    noMatchTemplate,
    menuContainer,
    lookup,
    fillAttr,
    requireLeadingSpace,
    allowSpaces,
    replaceTextSuffix,
    positionMenu,
    autocompleteMode,
    searchOpts,
    menuShowMinLength
  } = TributeOptions
  const idName = useMemo(() => `${id}-mentionList`, [id])
  useEffect(() => {
    var tribute = new Tribute({
      values: values || [],
      selectTemplate,
      menuItemTemplate,
      trigger: trigger || '@',
      selectClass,
      containerClass,
      itemClass,
      noMatchTemplate,
      menuContainer,
      lookup,
      fillAttr,
      requireLeadingSpace,
      allowSpaces,
      replaceTextSuffix,
      positionMenu,
      autocompleteMode,
      searchOpts,
      menuShowMinLength
    });
    let ele:any= document.getElementById(idName)
    tribute.attach(ele);
  }, [])

  useEffect(() => {
    document.querySelector(`#${idName}`)?.addEventListener("tribute-replaced", (e:any) =>  {
      // console.log('选择到值', e?.detail?.item?.original, e?.detail?.item )
      onSelect && e?.detail?.item?.original && onSelect(e.detail.item)
  });
  }, [])
  return (
      <ContentEditable
        id={idName}
        className={`${idName} mention-basic ${className}`}
        innerRef={  innerRef}
        html={html} // innerHTML of the editable div
        disabled={disabled}       // use true to disable editing
        onChange={(e) => onChange(e)} // handle innerHTML change
        onBlur={onBlur}
        onFocus={onFocus}
        style={style}
        tagName={tagName || 'div'}
        placeholder={placeholder || ''}
        // {...restProps}

      >
      </ContentEditable>
  );
}

export default CMention;
