import { DocsContext } from "@storybook/addon-docs";
import { isNil, isString } from "@components/shared/index.js";
import { useContext, useMemo } from "react";

export function useThemedSnippet(snippets: string | Record<string, string>) {
    const { globals } = useContext(DocsContext);

    return useMemo(() => {
        if (isNil(snippets) || isString(snippets)) {
            return snippets;
        }

        return snippets[globals.theme];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(snippets), globals.theme]);
}
