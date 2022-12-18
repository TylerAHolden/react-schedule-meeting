/// <reference types="react" />
type ButtonProps = {
    selected?: boolean;
    primaryColor: string;
    borderRadius: number;
    primaryColorFaded: string;
};
export declare const ThemedButton: import("goober").StyledVNode<Omit<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & import("goober").DefaultTheme & ButtonProps, never>>;
export declare const StartTimeGridItemButton: import("goober").StyledVNode<Omit<import("react").ClassAttributes<HTMLButtonElement> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & import("goober").DefaultTheme & ButtonProps, never>>;
export {};
