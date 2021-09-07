import { ColumnGapProp, GapProp, InternalProps, OmitInternalProps, RowGapProp, SlotProps, StyledComponentProps, mergeProps } from "../../shared";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { Flex } from "./Flex";
import { FlexAlignment, useFlexAlignment } from "./adapters";

const DefaultElement = "div";

export interface InnerInlineProps extends
    // So it could be used with dynamic slots.
    SlotProps,
    InternalProps,
    Omit<StyledComponentProps<typeof DefaultElement>,
    "alignContent"
    | "alignItems"
    | "columnGap"
    | "display"
    | "flex"
    | "flexDirection"
    | "flexWrap"
    | "gap"
    | "justifyContent"
    | "row-gap"
    | "wrap"> {
    /**
      * The horizontal alignment of the elements.
      */
    alignX?: FlexAlignment;
    /**
      * The vertical alignment of the elements.
      */
    alignY?: FlexAlignment;
    /**
      * React children
     */
    children: ReactNode;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap).
     */
    columnGap?: ColumnGapProp;
    /**
      * Whether the elements take up all the space of their container.
      */
    fluid?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap).
     */
    gap?: GapProp;
    /**
     * Whether or not the element generate line breaks before or after himself.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap).
     */
    rowGap?: RowGapProp;
    /**
     * Whether or not to wrap the elements on multiple lines.
     */
    wrap?: boolean;
}

export function InnerInline({
    alignX,
    alignY,
    children,
    gap = 5,
    as = DefaultElement,
    wrap,
    forwardedRef,
    ...rest
}: InnerInlineProps) {
    const alignProps = useFlexAlignment({ alignX, alignY, orientation: "horizontal" });

    return (
        <Flex
            {...mergeProps(
                rest,
                {
                    as,
                    gap,
                    ref: forwardedRef,
                    wrap: wrap ? "wrap" as const : undefined
                },
                alignProps
            )}
        >
            {children}
        </Flex>
    );
}

export const Inline = forwardRef<any, OmitInternalProps<InnerInlineProps>>((props, ref) => (
    <InnerInline {...props} forwardedRef={ref} />
));

export type InlineProps = ComponentProps<typeof Inline>;
