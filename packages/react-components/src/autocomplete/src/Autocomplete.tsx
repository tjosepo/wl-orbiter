import "./Autocomplete.css";

import { Box, BoxProps } from "../../box";
import { HiddenAutocomplete } from "./HiddenAutocomplete";
import {
    InteractionStatesProps,
    InternalProps,
    Keys,
    OmitInternalProps,
    OrbitComponentProps,
    augmentElement,
    isNil,
    isNilOrEmpty,
    mergeProps,
    useControllableState,
    useEventCallback,
    useFocusWithin,
    useId,
    useMergedRefs,
    useRefState
} from "../../shared";
import { Listbox, ListboxElement, OptionKeyProp } from "../../listbox";
import { Overlay, OverlayProps as OverlayPropsForDocumentation, isDevToolsBlurEvent, isTargetParent, usePopup, useTriggerWidth } from "../../overlay";
import { SearchInput } from "../../text-input";
import { UseFieldInputPropsReturn, useFieldInputProps } from "../../field";
import { forwardRef, useCallback, useRef, useState } from "react";
import { getItemText, useCollectionSearch, useOnlyCollectionItems } from "../../collection";
import { useDebouncedCallback } from "./useDebouncedCallback";
import { useDeferredValue } from "./useDeferredValue";
import { useInputGroupTextInputProps } from "../../input-group";
import { wrappedInputPropsAdapter } from "../../input";
import type { ChangeEvent, ComponentProps, FocusEvent, KeyboardEvent, ReactElement, ReactNode, SyntheticEvent } from "react";

// Used to generate OverlayProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OverlayProps extends Partial<OverlayPropsForDocumentation> { }

const DefaultElement = "input";

export interface InnerAutocompleteProps extends InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus"> {
    /**
     * The horizontal alignment of the autocomplete menu relative to the input.
     */
    align?: "start" | "end";
    /**
     * Whether or not the autocomplete menu can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * Whether or not the autocomplete should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the query should be cleared when a result is selected.
     */
    clearOnSelect?: boolean;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: string;
    /**
     * The direction the autocomplete menu will open relative to the input.
     */
    direction?: "bottom" | "top";
    /**
     * Whether or not the autocomplete is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not the autocomplete take up the width of its container.
     */
    fluid?: boolean;
    /**
     * A trigger icon.
     */
    icon?: ReactElement;
    /**
     * Whether or not the autocomplete should display a loading state.
     */
    loading?: boolean;
    /**
     * Minimum characters to query for results.
     */
    minCharacters?: number;
    /**
    * @ignore
    */
    name?: string;
    /**
     * Message to display when there are no results matching the query.
     */
    noResultsMessage?: string;
    /**
     * Called when the autocomplete open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Called when the input query change and new search results are expected.
     * @param {SyntheticEvent} event - React's original event.
     * @param {string} query - The search query.
     * @returns {void}
     */
    onSearch?: (event: SyntheticEvent, query: string) => void;
    /**
     * Called when the autocomplete value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {Object} selection - The new selection.
     * @param {string} selection.key - The selected key.
     * @param {string} selection.value - The selected value.
     * @returns {void}
     */
    onSelectionChange?: (event: SyntheticEvent, selection: { key: string; value: string }) => void;
    /**
     * Whether or not to open the autocomplete element.
     */
    open?: boolean | null;
    /**
     * Additional props to render on the menu of options.
     */
    overlayProps?: Partial<OverlayProps>;
    /**
     * Temporary text that occupies the autocomplete trigger when no value is selected.
     */
    placeholder?: string;
    /**
     * Whether or not the autocomplete is readonly.
     */
    readOnly?: boolean;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the autocomplete should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * A controlled autocomplete value.
     */
    value?: string | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * The z-index of the overlay element.
     */
    zIndex?: number;
}

export function InnerAutocomplete(props: InnerAutocompleteProps) {
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps] = useInputGroupTextInputProps();

    const contextualProps = mergeProps(
        fieldProps,
        inputGroupProps
    );

    const {
        id,
        open: openProp,
        defaultOpen,
        value: valueProp,
        defaultValue,
        placeholder,
        onSearch,
        loading,
        clearOnSelect,
        noResultsMessage,
        minCharacters = 1,
        required,
        validationState,
        onSelectionChange,
        onOpenChange,
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        readOnly,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex = 10000,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        wrapperProps,
        overlayProps: { id: menuId, style: { width: menuWidth, ...menuStyle } = {}, ...menuProps } = {},
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    }: InnerAutocompleteProps & Omit<UseFieldInputPropsReturn, "size"> = mergeProps(
        props,
        wrappedInputPropsAdapter(contextualProps)
    );

    const [focusedItem, setFocusedItem] = useState(null);
    const [queryRef, setQuery] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
            // Keep query in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                setQuery(newValue ?? "");
            }

            return undefined;
        }, [setQuery])
    });

    const triggerWrapperRef = useRef();

    const {
        isOpen,
        setIsOpen,
        triggerProps: { ref: popupTriggerRef, ...triggerProps },
        overlayProps: { ref: overlayRef, ...overlayProps }
    } = usePopup("listbox", {
        allowFlip,
        allowPreventOverflow,
        defaultOpen,
        disabled: disabled || readOnly,
        hideOnEscape: true,
        hideOnLeave: true,
        id: menuId,

        offset: [0, 4],

        onOpenChange,

        open: openProp,

        position: `${direction}-${align}` as const,

        restoreFocus: true,
        // An autocomplete take care of his own trigger logic.
        trigger: "none"
    });

    const [triggerWidthRef, triggerWidth] = useTriggerWidth();

    const listboxRef = useRef<ListboxElement>();
    const triggerRef = useMergedRefs(forwardedRef, popupTriggerRef, triggerWidthRef);

    const [results, searchCollection] = useCollectionSearch(children, { onSearch });

    // Required to support selection when there are sections.
    const items = useOnlyCollectionItems(results);

    const open = useCallback((event: SyntheticEvent) => {
        setIsOpen(event, true);
    }, [setIsOpen]);

    const close = useCallback((event: SyntheticEvent) => {
        setIsOpen(event, false);
        setFocusedItem(null);
    }, [setIsOpen, setFocusedItem]);

    const setSelection = useCallback((event: SyntheticEvent, newKey: string) => {
        let newValue = null;

        if (!isNil(newKey)) {
            const selectedItem = items.find(x => x.key === newKey);

            if (!isNil(selectedItem)) {
                newValue = getItemText(selectedItem);
            }
        }

        if (value !== newValue) {
            setValue(newValue);

            if (!isNil(onSelectionChange)) {
                onSelectionChange(event, isNil(newKey) ? null : {
                    key: newKey,
                    value: newValue
                });
            }
        }

        setQuery(clearOnSelect ? "" : newValue ?? "", true);
    }, [items, onSelectionChange, clearOnSelect, value, setValue, setQuery]);

    const clear = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSelection(event, null);
    }, [setSelection]);

    const reset = useCallback(() => {
        // Reset the value to the last selected one.
        if (value !== queryRef.current) {
            setQuery(value ?? "", true);
        }
    }, [value, queryRef, setQuery]);

    const search = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>, query) => {
        if (query.trim().length >= minCharacters) {
            searchCollection(event, query);
            open(event);
        } else if (isNilOrEmpty(query)) {
            clear(event);
            close(event);
        } else {
            close(event);
        }
    }, 200);

    const selectItem = useCallback((event: SyntheticEvent, key: string) => {
        setSelection(event, key);
        close(event);
    }, [setSelection, close]);

    const triggerFocusWithinProps = useFocusWithin({
        onBlur: useEventCallback((event: FocusEvent) => {
            if (!isDevToolsBlurEvent(triggerRef)) {
                // Close the menu when the focus switch from the trigger to somewhere else than the menu or the trigger.
                if (!isTargetParent(event.relatedTarget, triggerWrapperRef.current) && !isTargetParent(event.relatedTarget, overlayRef)) {
                    close(event);
                    reset();
                }
            }
        })
    });

    const handleTriggerKeyDown = useEventCallback((event: KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case Keys.arrowDown:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusNext();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(OptionKeyProp)
                    });
                }
                break;
            case Keys.arrowUp:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusPrevious();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(OptionKeyProp)
                    });
                }
                break;
            case Keys.home:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusFirst();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(OptionKeyProp)
                    });
                }
                break;
            case Keys.end:
                if (isOpen) {
                    event.preventDefault();

                    const activeElement = listboxRef.current?.focusManager.focusLast();

                    setFocusedItem({
                        id: activeElement.id,
                        key: activeElement.getAttribute(OptionKeyProp)
                    });
                }
                break;
            case Keys.esc:
                if (isOpen) {
                    // Do not remove otherwise the SearchInput will clear the input on esc.
                    event.stopPropagation();
                    event.preventDefault();

                    close(event);
                }
                break;
            case Keys.enter:
                if (isOpen) {
                    event.preventDefault();

                    if (!isNil(focusedItem)) {
                        selectItem(event, focusedItem.key);
                    }
                }
                break;
        }
    });

    const handleTriggerChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, query) => {
        setQuery(query, true);
        search(event, query);
    });

    const handleListboxSelectionChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newKeys) => {
        selectItem(event, newKeys[0] ?? null);
    });

    const handleListboxFocusChange = useEventCallback((event: FocusEvent, newKey, activeElement) => {
        setFocusedItem({
            id: activeElement.id,
            key: newKey
        });
    });

    const triggerId = useId(id, "o-ui-autocomplete-trigger");

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-autocomplete-icon",
        size: "sm"
    });

    const listboxMarkup = (
        <Listbox
            nodes={results}
            // An autocomplete doesn't support any persisted selected keys.
            selectedKeys={[]}
            onSelectionChange={handleListboxSelectionChange}
            onFocusChange={handleListboxFocusChange}
            focusOnHover
            useVirtualFocus
            tabbable={false}
            fluid
            className="o-ui-autocomplete-listbox"
            aria-label={ariaLabel}
            aria-labelledby={isNil(ariaLabel) ? ariaLabelledBy ?? triggerId : undefined}
            aria-describedby={ariaDescribedBy}
            ref={listboxRef}
        />
    );

    const noResultsMarkup = (
        <Box className="o-ui-autocomplete-no-results">{noResultsMessage ?? "No results found."}</Box>
    );

    return (
        <>
            <HiddenAutocomplete
                name={name}
                value={value}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <SearchInput
                {...mergeProps(
                    rest,
                    {
                        active,
                        "aria-activedescendant": focusedItem?.id,
                        "aria-autocomplete": "list",
                        "aria-describedby": ariaDescribedBy,
                        "aria-label": ariaLabel,
                        "aria-labelledby": isNil(ariaLabel) ? ariaLabelledBy : undefined,
                        as,
                        autoFocus,
                        className: "o-ui-autocomplete-trigger",
                        disabled,
                        fluid,
                        focus,
                        hover,
                        icon: iconMarkup ?? null,
                        id: triggerId,
                        loading: useDeferredValue(loading, 100, false),
                        onKeyDown: handleTriggerKeyDown,
                        onValueChange: handleTriggerChange,
                        placeholder,
                        readOnly,
                        ref: triggerRef,
                        role: "combobox",
                        type: "text",
                        validationState,
                        value: queryRef.current,
                        wrapperProps: mergeProps(
                            wrapperProps ?? {},
                            {
                                ref: triggerWrapperRef
                            },
                            triggerFocusWithinProps
                        )
                    } as const,
                    triggerProps
                )}
            />
            <Overlay
                {...mergeProps(
                    menuProps,
                    {
                        className: `o-ui-autocomplete-menu ${results.length > 0 ? "" : "o-ui-autocomplete-menu-no-results"}`,
                        ref: overlayRef,
                        show: isOpen && (!loading || results.length > 0),
                        style: {
                            ...menuStyle,
                            width: menuWidth ?? triggerWidth ?? undefined
                        },
                        zIndex
                    },
                    overlayProps
                )}
            >
                {results.length > 0 ? listboxMarkup : noResultsMarkup}
            </Overlay>
        </>
    );
}

export const Autocomplete = forwardRef<HTMLInputElement, OmitInternalProps<InnerAutocompleteProps>>((props, ref) => (
    <InnerAutocomplete {...props} forwardedRef={ref} />
));

export type AutocompleteProps = ComponentProps<typeof Autocomplete>;

