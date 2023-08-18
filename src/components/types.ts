import { type ComputedRef } from "vue";

export type InLineMsgConfig = {
    show: boolean,
    content: string
};

export type DynamicFormField<TVal = object> = {
    fieldName: string,
    fieldType: "text" | "number" | "password" | "select" | "checkbox" | "radio" | "textarea",
    label?: string,
    placeholder?: string,
    value: TVal,
};

export type DynamicFormConfig = {
    fields: DynamicFormField[],
};

export type CustomSelectConfig = {
    name: string,
    options: string[],
    isOn?: boolean,
};

export type CustomSelectGroupConfig = {
    selectConfigs: CustomSelectConfig[],
    flexDirection?: "row" | "column"
}

export type NavigationItemConfig = {
    url: string,
    imgSource: string,
    text: string,
};

export type NavigationConfig = {
    items: NavigationItemConfig[],
};

export interface TableItemConfig  {
    type: "text" | "button"
    value: string,
    eventKey?: string,
    onClick?: () => void,
}

export type TableConfig = {
    title?: string,
    headers?: string[],
    rows: TableItemConfig[][],
}

export interface ButtonConfig {
    text: string | ComputedRef<string>,
    onClick: () => void,
    disabled?: boolean,
}