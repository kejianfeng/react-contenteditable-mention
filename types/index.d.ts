export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements["div"], { onChange: ((event: ContentEditableEvent) => void) }>;


export type TributeItem<T extends {}> = {
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

export type TributeCollection<T extends {}> = {
  // symbol that starts the lookup
  trigger?: string;

  // element to target for @mentions
  iframe?: any;

  // class added in the flyout menu for active item
  selectClass?: string;

  // class added in the flyout menu for active item
  containerClass?: string;

  itemClass?: string;

  // function called on select that returns the content to insert
  selectTemplate?: (item: TributeItem<T>) => string;

  // template for displaying item in menu
  menuItemTemplate?: (item: TributeItem<T>) => string;

  // template for when no match is found (optional),
  // If no template is provided, menu is hidden.
  noMatchTemplate?: () => string;

  // specify an alternative parent container for the menu
  menuContainer?: Element;

  // column to search against in the object (accepts function or string)
  lookup?: string | ((item: T, mentionText: string) => string);

  // column that contains the content to insert by default
  fillAttr?: string;

  // array of objects to match
  values?: Array<T> | ((text: string, cb: (result: Array<T>) => void) => void);

  // specify whether a space is required before the trigger character
  requireLeadingSpace?: boolean;

  // specify whether a space is allowed in the middle of mentions
  allowSpaces?: boolean;

  // optionally specify a custom suffix for the replace text
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
};

export type TributeOptions<T> =
  | TributeCollection<T>
  | {
      // pass an array of config objects
      collection: Array<TributeCollection<{ [key: string]: any }>>;
    };


export interface ITribute  {
  // ??????mentions?????????
  trigger?: string;
  // element to target for @mentions
  // iframe?: any;

  // ????????????class
  selectClass?: string;
  containerClass?: string;
  //?????????????????????
  itemClass?: string;

  // ????????????????????????????????????????????????????????????
  selectTemplate?: (item: TributeItem<any>) => string;

  // ????????????????????????????????????
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

  //?????????
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
  html: string,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  style?: Object,
  innerRef?: React.RefObject<HTMLElement> | Function,
  onSelect?: (node?:any) => any
  // uploadImage?: {
  //   visible?: boolean;
  // },
  TributeOptions: ITribute
}

declare const MentionsProps:IAppProps

export default MentionsProps

