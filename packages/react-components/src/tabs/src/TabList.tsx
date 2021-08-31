import "./Tabs.css";

import { Box } from "../../box";
import { ComponentProps, ForwardedRef, forwardRef } from "react";
import { Keys, OmitInternalProps, isNumber, mergeProps, useAutoFocusChild, useEventCallback, useFocusManager, useFocusScope, useKeyboardNavigation, useKeyedRovingFocus, useMergedRefs } from "../../shared";
import { Tab, TabKeyProp } from "./Tab";
import { TabType } from "./useTabsItems";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowRight],
        previous: [Keys.arrowLeft]
    },
    vertical: {
        first: [Keys.home],
        last: [Keys.end],
        next: [Keys.arrowDown],
        previous: [Keys.arrowUp]
    }
};

export interface InnerTabListProps {
    autoFocus?: boolean | number;
    forwardedRef: ForwardedRef<any>;
    tabs?: TabType[];
}

export function InnerTabList({
    tabs,
    autoFocus,
    forwardedRef,
    ...rest
}: InnerTabListProps) {
    const { selectedKey, orientation, onSelect, isManual } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();
    const tabRef = useMergedRefs(setFocusRef, forwardedRef);

    const focusManager = useFocusManager(focusScope, { keyProp: TabKeyProp });

    useKeyedRovingFocus(focusScope, selectedKey, { keyProp: TabKeyProp });

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus,
        target: selectedKey
    });

    const handleKeyboardSelect = useEventCallback((event, element) => {
        onSelect(event, element?.getAttribute(TabKeyProp));
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation], {
        onSelect: !isManual ? handleKeyboardSelect : undefined
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-orientation": orientation,
                    className: "o-ui-tab-list",
                    ref: tabRef,
                    role: "tablist"
                },
                navigationProps
            )}
        >
            {tabs.map(({
                key,
                elementType: ElementType = Tab,
                ref,
                tabId,
                panelId,
                props
            }) =>
                <ElementType
                    {...props}
                    tab={{
                        key,
                        panelId,
                        tabId
                    }}
                    key={key}
                    ref={ref}
                />
            )}
        </Box>
    );
}

export const TabList = forwardRef<any, OmitInternalProps<InnerTabListProps>>((props, ref) => (
    <InnerTabList {...props} forwardedRef={ref} />
));

export type TabListProps = ComponentProps<typeof TabList>;



