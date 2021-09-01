import "./Accordion.css";

import { AccordionBuilderHeader, AccordionBuilderPanel } from "./useAccordionItems";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionPanel } from "./AccordionPanel";
import { Disclosure, DisclosureDefaultElement } from "../../disclosure";
import { InternalProps, OrbitComponentProps, StyleProps, mergeProps, useEventCallback } from "../../shared";
import { Ref, SyntheticEvent } from "react";
import { useAccordionContext } from "./AccordionContext";

export interface AccordionItemProps extends StyleProps, InternalProps, Omit<OrbitComponentProps<typeof DisclosureDefaultElement>, "ref"> {
    item: {
        header: AccordionBuilderHeader;
        id: string;
        key: string;
        panel: AccordionBuilderPanel;
    };
    ref: Ref<any> | undefined;
}

export function AccordionItem({
    item: { header, id, key, panel },
    ...rest
}: AccordionItemProps) {
    const { expandedKeys, onToggle } = useAccordionContext();

    const handleOpenChange = useEventCallback((event: SyntheticEvent) => {
        onToggle(event, key);
    });

    const {
        elementType: HeaderType = AccordionHeader,
        ref: headerRef,
        props: headerProps
    } = header;

    const {
        elementType: PanelType = AccordionPanel,
        ref: panelRef,
        props: panelProps
    } = panel;

    return (
        <Disclosure
            {...mergeProps(
                rest,
                {
                    id,
                    onOpenChange: handleOpenChange,
                    open: expandedKeys.includes(key)
                }
            )}
        >
            <HeaderType
                {...headerProps}
                header={{
                    key
                }}
                ref={headerRef}
            />
            <PanelType
                {...panelProps}
                panel={{
                    key
                }}
                ref={panelRef}
            />
        </Disclosure>
    );
}
