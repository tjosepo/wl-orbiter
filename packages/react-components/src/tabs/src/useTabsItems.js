import { Children, useMemo } from "react";
import { Content, Header } from "../../placeholders";
import { isNil } from "lodash";
import { mergeProps, resolveChildren } from "../../shared";

export class TabsBuilder {
    _rootId;

    constructor(rootId) {
        this._rootId = rootId;
    }

    build(children) {
        if (isNil(children)) {
            throw new Error("A tabs component must have children.");
        }

        const tabs = [];
        const panels = [];

        let index = 0;

        Children.forEach(children, (element, position) => {
            const key = !isNil(element.key) ? element.key.replace(".", "").replace("$", "") : position.toString();

            const [header, content] = Children.toArray(resolveChildren(element.props.children));

            if (isNil(header) || isNil(content)) {
                throw new Error("A tabs item must have an <Header> and a <Content>.");
            }

            const tabId = this._makeId(header, "tab", key);
            const panelId = this._makeId(content, "panel", key);

            tabs.push({
                key,
                index: index++,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: header.type !== Header ? header.type : undefined,
                ref: header.ref,
                tabId,
                panelId,
                props: mergeProps(header.props, element.props)
            });

            index++;

            panels.push({
                key,
                index: index++,
                // Use a custom type if available otherwise let the Tab component choose his default type.
                elementType: content.type !== Content ? content.type : undefined,
                ref: content.ref,
                tabId,
                panelId,
                props: content.props
            });
        });

        return [tabs, panels];
    }

    _makeId({ props: { id } }, type, key) {
        return id ?? `${this._rootId}-${type}-${key}`;
    }
}

export function useTabsItems(children, rootId) {
    const builder = useMemo(() => new TabsBuilder(rootId), [rootId]);

    return useMemo(() => builder.build(children), [builder, children]);
}
