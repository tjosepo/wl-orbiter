import styles from "./multi-variant.module.css";

import { LearnUsageLink } from "./learn-usage-link";
import { MULTI_VARIANT_SHAPE } from "../shapes";
import { Source } from "@storybook/components";
import { cloneElement } from "react";

function Import({ componentType }) {
    return (
        <>
            <h4 className="marine-900">Import</h4>
            <Source language="javascript" dark format={false} code={`import { ${componentType} } from "@orbit-ui/icons";`} />
        </>
    );
}

function Usage({ componentType }) {
    return (
        <>
            <h4 className="marine-900">Usage</h4>
            <Source language="jsx" dark format={false} code={`<${componentType} />`} />
            <LearnUsageLink />
        </>
    );
}

function Preview({ icon }) {
    return (
        <div className={styles.preview}>
            {cloneElement(icon, { size: "tiny" })}
            {cloneElement(icon, { size: "small" })}
            {icon}
            {cloneElement(icon, { size: "large" })}
            {cloneElement(icon, { size: "big" })}
            {cloneElement(icon, { size: "huge" })}
            {cloneElement(icon, { size: "massive" })}
        </div>
    );
}

export function MultiVariant({ icon }) {
    const componentType = icon.props.mdxType;

    return (
        <>
            <Preview icon={icon} />
            <Import componentType={componentType} />
            <Usage componentType={componentType} />
        </>
    );
}

MultiVariant.propTypes = MULTI_VARIANT_SHAPE;
