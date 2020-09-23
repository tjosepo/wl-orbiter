import { ArrowIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { Text } from "@react-components/text";
import { cloneElement } from "react";

function Link({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createLinkTestSuite(element, stories) {
    stories
        .add("default", () =>
            <Inline align="end">
                <Link size="sm" href="#" element={element}>Flight details</Link>
                <Link href="#" element={element}>Flight details</Link>
                <Link size="lg" href="#" element={element}>Flight details</Link>
            </Inline>
        )
        .add("icon", () =>
            <Inline align="end">
                <Link size="sm" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
                <Link href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
                <Link size="lg" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
            </Inline>
        )
        .add("external", () =>
            <Inline align="end">
                <Link external size="sm" href="#" element={element}>Flight details</Link>
                <Link external href="#" element={element}>Flight details</Link>
                <Link external size="lg" href="#" element={element}>Flight details</Link>
            </Inline>
        )
        .add("primary", () =>
            <Inline align="end">
                <Link color="primary" size="sm" href="#" element={element}>Flight details</Link>
                <Link color="primary" href="#" element={element}>Flight details</Link>
                <Link color="primary" size="lg" href="#" element={element}>Flight details</Link>
                <Link color="primary" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
            </Inline>
        )
        .add("secondary", () =>
            <Inline align="end">
                <Link color="secondary" size="sm" href="#" element={element}>Flight details</Link>
                <Link color="secondary" href="#" element={element}>Flight details</Link>
                <Link color="secondary" size="lg" href="#" element={element}>Flight details</Link>
                <Link color="secondary" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
            </Inline>
        )
        .add("danger", () =>
            <Inline align="end">
                <Link color="danger" size="sm" href="#" element={element}>Flight details</Link>
                <Link color="danger" href="#" element={element}>Flight details</Link>
                <Link color="danger" size="lg" href="#" element={element}>Flight details</Link>
                <Link color="danger" href="#" element={element}>
                    <Text>Flight details</Text>
                    <ArrowIcon />
                </Link>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline align="end">
                    <Link active size="sm" href="#" element={element}>Flight details</Link>
                    <Link active href="#" element={element}>Flight details</Link>
                    <Link active size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link focus size="sm" href="#" element={element}>Flight details</Link>
                    <Link focus href="#" element={element}>Flight details</Link>
                    <Link focus size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link hover size="sm" href="#" element={element}>Flight details</Link>
                    <Link hover href="#" element={element}>Flight details</Link>
                    <Link hover size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link focus hover size="sm" href="#" element={element}>Flight details</Link>
                    <Link focus hover href="#" element={element}>Flight details</Link>
                    <Link focus hover size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link visited size="sm" href="#" element={element}>Flight details</Link>
                    <Link visited href="#" element={element}>Flight details</Link>
                    <Link visited size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
                <Inline align="end">
                    <Link disabled size="sm" href="#" element={element}>Flight details</Link>
                    <Link disabled href="#" element={element}>Flight details</Link>
                    <Link disabled size="lg" href="#" element={element}>Flight details</Link>
                </Inline>
            </Stack>
        );
}
