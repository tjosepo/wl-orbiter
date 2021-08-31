import "./Tag.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef, useMemo } from "react";
import { CrossButton, embedIconButton } from "../../button";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, isNil, mergeProps, normalizeSize, useMergedRefs, useSlots } from "../../shared";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";

const DefaultElement = "div";

export interface InnerTagProps extends InternalProps, InteractionStatesProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the tag is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the tag take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Called when the remove button is clicked.
     * @param {SyntheticEvent} event - React's original event.
     * @returns {void}
     */
    onRemove?: (event: SyntheticEvent) => void;
    /**
     * A tag can vary in size.
     */
    size?: "sm" | "md";
    /**
     * The tag style to use.
     */
    variant?: "solid" | "outline";
}

export function InnerTag({
    variant = "solid",
    onRemove,
    disabled,
    fluid,
    size,
    active,
    focus,
    hover,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerTagProps) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, dot, text, "end-icon": endIcon, counter } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            color: "inherit",
            disabled,
            pushed: true,
            size
        },
        dot: {
            className: "o-ui-tag-dot",
            disabled
        },
        "end-icon": {
            className: "o-ui-tag-end-icon",
            size: embeddedIconSize(size)
        },
        icon: {
            className: "o-ui-tag-start-icon",
            size: embeddedIconSize(size)
        },
        text: {
            className: "o-ui-tag-text",
            color: "inherit",
            size
        }
    }), [size, disabled]));

    const removeMarkup = !isNil(onRemove) && embedIconButton(<CrossButton aria-label="Remove" />, {
        "aria-label": "Remove",
        className: "o-ui-tag-remove-button",
        condensed: true,
        onClick: onRemove,
        size
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-tag",
                        variant,
                        dot && "has-dot",
                        icon && "has-start-icon",
                        endIcon && "has-end-icon",
                        removeMarkup && "has-remove-button",
                        fluid && "fluid",
                        active && "active",
                        focus && "focus",
                        hover && "hover",
                        normalizeSize(size)
                    ),
                    disabled,
                    ref
                }
            )}
        >
            {icon}
            {dot}
            {text}
            {endIcon}
            {counter}
            {removeMarkup}
        </Box>
    );
}

export const Tag = forwardRef<any, OmitInternalProps<InnerTagProps>>((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

export type TagProps = ComponentProps<typeof Tag>;

