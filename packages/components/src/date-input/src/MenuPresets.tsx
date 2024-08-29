import { DisclosureArrow } from "../../disclosure/index.js";
import { IconButton } from "../../button/index.js";
import { Item } from "../../collection/index.js";
import { Menu, MenuTrigger } from "../../menu/index.js";
import { SyntheticEvent, useRef } from "react";
import { useEventCallback } from "../../shared/index.js";

export interface MenuPresetsProps {
    onSelectionChange: (event: SyntheticEvent, index: number) => void;
    selectedIndex?: number;
    values: string[];
}

export function MenuPresets({
    onSelectionChange,
    selectedIndex,
    values
}: MenuPresetsProps) {
    const presetButtonRef = useRef<HTMLButtonElement>();

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, keys: string[]) => {
        onSelectionChange(event, parseInt(keys[0]));

        presetButtonRef.current?.focus();
    });

    return (
        <MenuTrigger>
            <IconButton
                aria-label="Date presets"
                ref={presetButtonRef}
                variant="secondary"
            >
                <DisclosureArrow />
            </IconButton>
            <Menu
                onSelectionChange={handleSelectPreset}
                selectedKeys={[selectedIndex?.toString()]}
                selectionMode="single"
            >
                {values.map((x, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index.toString()}>
                        {x}
                    </Item>
                ))}
            </Menu>
        </MenuTrigger>
    );
}
