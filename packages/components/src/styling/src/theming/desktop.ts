import { createTheme } from "./createTheme";

export const DesktopTheme = createTheme({
    name: "desktop",
    colors: {
        white: "#FFF",
        black: "#000",
        gray: "#F9F9F9",
        primary: [
            "#FEEEE4",
            "#FCD5BC",
            "#FAB990",
            "#F79D64",
            "#F68842",
            "#F47321",
            "#EB6300",
            "#DD5306",
            "#CE4409",
            "#AC3400"
        ],
        light: {
            /* Background */
            "bg-alias-default": "$white",
            "bg-alias-side-nav": "$gray",
            "bg-alias-hard-break": "$neutral-1",
            "bg-alias-soft-break": "$neutral-3",
            "bg-alias-grey-hover": "$neutral-1",
            "bg-alias-grey-active": "$neutral-3",
            "bg-alias-accent": "$purple-6",
            "bg-alias-accent-hover": "$purple-8",
            "bg-alias-accent-active": "$purple-9",
            "bg-alias-accent-faint": "$purple-1",
            "bg-alias-accent-light": "$purple-2",
            "bg-alias-alert": "$alert-6",
            "bg-alias-alert-hover": "$alert-8",
            "bg-alias-alert-active": "$alert-9",
            "bg-alias-alert-faint": "$alert-1",
            "bg-alias-alert-light": "$alert-2",
            "bg-alias-warning": "$warning-3",
            "bg-alias-warning-hover": "$warning-8",
            "bg-alias-warning-active": "$warning-9",
            "bg-alias-warning-faint": "$warning-1",
            "bg-alias-warning-light": "$warning-2",
            "bg-alias-success": "$success-6",
            "bg-alias-success-hover": "$success-8",
            "bg-alias-success-active": "$success-9",
            "bg-alias-success-faint": "$success-1",
            "bg-alias-success-light": "$success-2",
            "bg-alias-transparent": "transparent",
            /* Border */
            "b-low-contrast": "$neutral-2",
            "b-mid-contrast": "$neutral-4",
            "b-high-contrast": "$neutral-6",
            "b-accent": "$purple-4",
            "b-accent-hover": "$purple-8",
            "b-accent-active": "$purple-9",
            "b-alert": "$alert-4",
            "b-alert-hover": "$alert-8",
            "b-alert-active": "$alert-9",
            "b-warning": "$warning-4",
            "b-warning-hover": "$warning-8",
            "b-warning-active": "$warning-9",
            "b-success": "$success-4",
            "b-success-hover": "$success-8",
            "b-success-active": "$success-9",
            /* Icon */
            "icon-primary": "$neutral-10",
            "icon-secondary": "$neutral-8",
            "icon-tertiary": "$neutral-6",
            "icon-inactive": "$neutral-4",
            "icon-accent": "$purple-6",
            "icon-alert": "$alert-6",
            "icon-warning": "$warning-5",
            "icon-success": "$success-6",
            "icon-static-white": "$white",
            "icon-static-black": "$black",
            /* Text */
            "text-primary": "$neutral-10",
            "text-secondary": "$neutral-8",
            "text-tertiary": "$neutral-6",
            "text-inactive": "$neutral-4",
            "text-accent": "$purple-6",
            "text-alert": "$alert-6",
            "text-warning": "$warning-5",
            "text-success": "$success-6",
            "text-static-white": "$white",
            "text-static-black": "$black"
        },
        dark: {
            /* Background */
            "bg-alias-default": "$neutral-9",
            "bg-alias-side-nav": "$neutral-10",
            "bg-alias-hard-break": "$neutral-6",
            "bg-alias-soft-break": "$neutral-8",
            "bg-alias-grey-hover": "$neutral-6",
            "bg-alias-grey-active": "$neutral-7",
            "bg-alias-accent": "$purple-6",
            "bg-alias-accent-hover": "$purple-8",
            "bg-alias-accent-active": "$purple-9",
            "bg-alias-accent-faint": "$purple-8",
            "bg-alias-accent-light": "$purple-9",
            "bg-alias-alert": "$alert-6",
            "bg-alias-alert-hover": "$alert-8",
            "bg-alias-alert-active": "$alert-9",
            "bg-alias-alert-faint": "$alert-9",
            "bg-alias-alert-light": "$alert-8",
            "bg-alias-warning": "$warning-3",
            "bg-alias-warning-hover": "$warning-8",
            "bg-alias-warning-active": "$warning-9",
            "bg-alias-warning-faint": "$warning-8",
            "bg-alias-warning-light": "$warning-7",
            "bg-alias-success": "$success-6",
            "bg-alias-success-hover": "$success-8",
            "bg-alias-success-active": "$success-9",
            "bg-alias-success-faint": "$success-9",
            "bg-alias-success-light": "$success-8",
            "bg-alias-transparent": "transparent",
            /* Border */
            "b-low-contrast": "$neutral-8",
            "b-mid-contrast": "$neutral-7",
            "b-high-contrast": "$neutral-5",
            "b-accent": "$purple-6",
            "b-accent-hover": "$purple-8",
            "b-accent-active": "$purple-9",
            "b-alert": "$alert-6",
            "b-alert-hover": "$alert-8",
            "b-alert-active": "$alert-9",
            "b-warning": "$warning-5",
            "b-warning-hover": "$warning-8",
            "b-warning-active": "$warning-9",
            "b-success": "$success-6",
            "b-success-hover": "$success-8",
            "b-success-active": "$success-6",
            /* Icon */
            "icon-primary": "$white",
            "icon-secondary": "$neutral-1",
            "icon-tertiary": "$neutral-2",
            "icon-inactive": "$neutral-3",
            "icon-accent": "$purple-5",
            "icon-alert": "$alert-4",
            "icon-warning": "$warning-3",
            "icon-success": "$success-5",
            "icon-static-white": "$white",
            "icon-static-black": "$black",
            /* Text */
            "text-primary": "$white",
            "text-secondary": "$neutral-1",
            "text-tertiary": "$neutral-2",
            "text-inactive": "$neutral-3",
            "text-accent": "$purple-5",
            "text-alert": "$alert-4",
            "text-warning": "$warning-3",
            "text-success": "$success-5",
            "text-static-white": "$white",
            "text-static-black": "$black"
        }
    }
});
