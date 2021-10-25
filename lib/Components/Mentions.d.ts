import React from "react";
import { TributeSearchOpts } from "tributejs";
import "./style.css";
export declare type ContentEditableEvent = React.SyntheticEvent<any, Event> & {
    target: {
        value: string;
    };
};
export declare type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
export declare type DivProps = Modify<JSX.IntrinsicElements["div"], {
    onChange: (event: ContentEditableEvent) => void;
}>;
export declare type TributeItem<T extends {}> = {
    index: number;
    original: T;
    score: number;
    string: string;
};
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
export interface IAppProps extends DivProps {
    id: string;
    html: string;
    disabled?: boolean;
    tagName?: string;
    className?: string;
    style?: Object;
    placeholder?: string;
    innerRef?: React.RefObject<HTMLElement> | Function;
    onSelect?: (node?: any) => any;
    onFocus?: (node?: any) => any;
    TributeOptions?: ITribute;
}
declare const CMention: React.FC<IAppProps>;
export default CMention;
