/**
 * @jest-environment node
 */
import { Badge, BadgeProps } from "@components/badge/index.js";
import { Div } from "@components/html/index.js";
import { Text } from "@components/typography/index.js";
import { forwardRef } from "react";
import { renderToString } from "react-dom/server";
import { throwOnConsoleLogs } from "@test-utils";

const SquareBadge = forwardRef<HTMLElement, BadgeProps>(({ children, ...rest }, ref) => {
    return (
        <Badge
            {...rest}
            ref={ref}
        >
            {children}
            <Div width="45px" height="45px" />
        </Badge>
    );
});

test("can render on the server", () => {
    throwOnConsoleLogs();

    const renderOnServer = () =>
        renderToString(
            <SquareBadge>
                <Text>100</Text>
            </SquareBadge>
        );

    expect(renderOnServer).not.toThrow();
});

