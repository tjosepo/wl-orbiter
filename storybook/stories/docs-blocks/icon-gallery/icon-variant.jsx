import styles from "./icon-variant.module.css";

import { CONTEXT_SHAPE } from "./context";
import { CheckmarkIcon } from "./assets";
import { Children, cloneElement, useEffect, useRef, useState } from "react";
import { a, useTransition } from "react-spring";
import { any, number, shape, string } from "prop-types";
import { isNil } from "lodash";

function renderIcon(iconInstance, size, inferIconSize) {
    if (inferIconSize) {
        return cloneElement(iconInstance, {
            style: { width: size, height: size }
        });
    }

    return iconInstance;
}

export function IconVariant({ size, copyValue, context: { name, getCopyValue, renderingSize, inferIconSize }, children }) {
    const [copySucceeded, setCopySucceeded] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        let timeoutId = null;

        if (copySucceeded) {
            timeoutId = setTimeout(() => {
                setCopySucceeded(false);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    }, [copySucceeded]);

    const copyAnimation = useTransition(copySucceeded, null, {
        from: {
            opacity: 0,
            transform: "translate3d(0,-20px,0)"
        },
        enter: {
            opacity: 1,
            transform: "translate3d(0,0px,0)"
        },
        leave: {
            opacity: 0,
            transform: "translate3d(0,0px,0)"
        }
    });

    const copyToClipboard = () => {
        textAreaRef.current.select();
        document.execCommand("copy");

        setCopySucceeded(true);
    };

    const icon = Children.only(children);
    const iconContainerStyle = !inferIconSize ? {} : {
        width: renderingSize,
        height: renderingSize
    };

    return (
        <>
            <div className={`${styles.variant} sbdocs sbdocs-ig-variant`}>
                <div className={`${styles.header} sbdocs sbdocs-ig-variant-header`}>{size}</div>
                <div className={`${styles.content} sbdocs sbdocs-ig-variant-content sbdocs-ig-variant-content-${size}`}>
                    <div className={`${styles.iconContainer} sbdocs sbdocs-ig-icon-container sbdocs-ig-icon-container-${size}`} style={iconContainerStyle}>
                        {renderIcon(icon, size, inferIconSize)}
                        <div className={`${styles.copyContainer} sbdocs sbdocs-ig-copy-container sbdocs-ig-copy-container-${size}`} onClick={copyToClipboard}>
                            {copyAnimation.map(({ item, props, key }) => {
                                if (item) {
                                    return (
                                        <a.div style={props} className={`${styles.copySucceeded} sbdocs sbdocs-ig-copy-succeeded sbdocs-ig-copy-succeeded-${size}`} key={key}>
                                            <CheckmarkIcon className={`${styles.copyCheckmark} sbdocs sbdocs-ig-copy-checkmark sbdocs-ig-copy-checkmark-${size}`} />
                                        </a.div>
                                    );
                                }

                                return <a.div style={props} className={`${styles.copyAction} sbdocs sbdocs-ig-copy-action sbdocs-ig-copy-action-${size}`} key={key}>Copy</a.div>;
                            })}
                        </div>
                    </div>
                    <form className={styles.copyForm}>
                        <textarea
                            readOnly
                            ref={textAreaRef}
                            value={!isNil(copyValue) ? copyValue : getCopyValue({ itemName: name, variantSize: size, icon })}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

IconVariant.propTypes = {
    size: number.isRequired,
    copyValue: string,
    context: shape(CONTEXT_SHAPE),
    children: any.isRequired
};
