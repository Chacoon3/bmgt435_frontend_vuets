export type MessagePopConfig = {
    show: boolean,
    header: string,
    content: string,
    onClick: () => void
}

export type InLineMsgConfig = {
    show: boolean,
    content: string
}

export type CustomTitleType = | 'success' | 'error' | 'warning' | 'info' | 'question'

export type CustomTitleConfig = {
    titleType?:CustomTitleType,
    title:string,
}