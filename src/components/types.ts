import { type ComputedRef } from "vue";

export type InLineMsgConfig = {
  show: boolean;
  content: string;
  type?: "normal" | "error" | "warning"; // defines the state of the message, coupled with text color
  textAlign?: "left" | "center" | "right";
};

export type CustomSelectConfig = {
  name: string;
  options: string[];
};

export type CustomSelectGroupConfig = {
  selectConfigs: CustomSelectConfig[];
  flexDirection?: "row" | "column";
};

export type DropdownConfig = {
  name: string;
  options: string[];
  values?: string[];
  width?: number,
};

export type NavigationItemConfig = {
  url: string;
  imgSource: string;
  text: string;
};

export type NavigationConfig = {
  items: NavigationItemConfig[];
};

export interface TableItemConfig {
  elementType: "text" | "button" | "a" | "checkbox";
  value: string | ComputedRef<string>;
  elementClass?: string;
  onClick?: () => void;
  onChange?: (val: any) => void;
  href?: string;
}

export type TableConfig = {
  title?: string;
  headers?: TableItemConfig[];
  rows: TableItemConfig[][];
};

export type ButtonConfig = {
  text: string | ComputedRef<string>;
  onClick: () => void;
  disabled: () => boolean;
  htmlClass: string;
}

export type CustomInputConfig = {
  label: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
};