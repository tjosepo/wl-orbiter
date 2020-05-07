/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, LARGE, MEDIUM, SMALL, TINY, mergeClasses, useAutofocus } from "../../shared";
import { Input as SemanticInput } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef, useImperativeHandle, useRef } from "react";
import { createButtonFromShorthand } from "../../button";
import { createIconForControl } from "../../icons";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

export const INPUT_UNSUPPORTED_PROPS = ["action", "actionPosition", "inverted"];

const propTypes = {
    /**
     * Whether or not the input should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A React component displayed before or after the prompt based on "iconPosition".
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left"]),
    /**
     * An input can contain a button.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    __componentName: string
};

const defaultProps = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    __componentName: "@orbit-ui/react-components/input"
};

function throwWhenMutuallyExclusivePropsAreProvided({ button, icon, iconPosition }, componentName) {
    if (!isNil(button) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError(`${componentName} doesn't support having a button and a right positioned icon at the same time.`);
    }
}

function useSetFocus(containerRef) {
    return () => {
        if (!isNil(containerRef.current)) {
            console.log(containerRef.current);

            containerRef.current.querySelector("input").focus();
        }
    };
}

function useForwardInputApi(forwardedRef, containerRef, inputComponentRef) {
    useImperativeHandle(forwardedRef, () => {
        const apiMethods = ["blur", "focus", "select", "setRangeText", "setSelectionRange", "checkValidity", "reportValidity", "setCustomValidity"];
        const domElement = containerRef.current;

        // These functions are part of the component external API.
        apiMethods.forEach(x => {
            domElement[x] = inputComponentRef.current[x];
        });

        return domElement;
    });
}

function useIconRenderer({ icon, size, loading }) {
    return () => {
        if (!isNil(icon) && !loading) {
            return createIconForControl(icon, size);
        }
    };
}

function useButtonRenderer({ iconPosition, button, size, loading, disabled }) {
    const buttonSizes = {
        [SMALL]: TINY,
        [MEDIUM]: SMALL,
        [LARGE]: MEDIUM
    };

    return () => {
        if (!isNil(button)) {
            const canRenderButton = !disabled && (!loading || (loading && iconPosition === "left"));

            if (canRenderButton) {
                const defaults = {
                    size: buttonSizes[size],
                    circular: true,
                    ghost: true,
                    secondary: true
                };

                const getClasses = userClasses => {
                    return mergeClasses(
                        "input-clear-button",
                        userClasses
                    );
                };

                if (isElement(button)) {
                    return cloneElement(button, {
                        className: getClasses(button.props && button.props.className),
                        ...defaults
                    });
                }

                return createButtonFromShorthand({
                    ...button,
                    ...defaults,
                    className: getClasses(button.className)
                });
            }
        }
    };
}

function useInputRenderer({ fluid, iconPosition, size, loading, disabled, children, rest }, autofocusProps, inputComponentRef, icon) {
    return () => {
        return (
            <SemanticInput
                {...rest}
                {...autofocusProps}
                icon={icon}
                iconPosition={iconPosition}
                fluid={fluid}
                size={size}
                loading={loading}
                disabled={disabled}
                ref={inputComponentRef}
            >
                {children}
            </SemanticInput>
        );
    };
}

function useRenderer({ button, fluid, className }, containerRef, buttonComponent, input) {
    return () => {
        const classes = mergeClasses(
            "relative outline-0",
            fluid ? "w-100" : "dib",
            button && "with-button",
            className
        );

        return (
            <div
                ref={containerRef}
                className={classes}
                tabIndex={-1}
                data-testid="input"
            >
                {input}
                {buttonComponent}
            </div>
        );
    };
}

export function PureInput(props) {
    const { autofocus, autofocusDelay, fluid, icon, iconPosition, button, size, loading, disabled, className, __componentName, forwardedRef, children, ...rest } = props;

    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const containerRef = useRef();
    const inputComponentRef = useRef();

    useForwardInputApi(forwardedRef, containerRef, inputComponentRef);

    const setFocus = useSetFocus(containerRef);
    const autofocusProps = useAutofocus(autofocus, !isNil(autofocusDelay) ? autofocusDelay : 5, disabled, setFocus);

    const renderIcon = useIconRenderer({ icon, size, loading });
    const renderButton = useButtonRenderer({ iconPosition, button, size, loading, disabled });
    const renderInput = useInputRenderer({ fluid, iconPosition, size, loading, disabled, children, rest }, autofocusProps, inputComponentRef, renderButton(), renderIcon());
    const render = useRenderer({ className, fluid }, containerRef, renderInput() );

    return render();
}

PureInput.propTypes = propTypes;
PureInput.defaultProps = defaultProps;

export const Input = forwardRef((props, ref) => (
    <PureInput { ...props } forwardedRef={ref} />
));

if (!isNil(SemanticInput.propTypes)) {
    SemanticInput.propTypes.size = oneOf(SIZES);
}
