import { Message } from "@components/message";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";

export function ExperimentalMessage({ noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport }) {
    const hasDetails = [noDoc, noTests, noVisualTesting, noFinalDesign, noMobileSupport].some(validation => validation);

    return (
        <Message variant="negative">
            <Content>
                <Heading>Experimental</Heading>
                This component and its documentation is in development. There could be breaking changes made to it in a non-major release. Please use with caution
                {hasDetails && <ul>
                    {noDoc && <li>Documentation is missing</li>}
                    {noTests && <li>Tests are missing</li>}
                    {noVisualTesting && <li>Visual testing is missing</li>}
                    {noFinalDesign && <li>The Design is not final</li>}
                    {noMobileSupport && <li>Mobile support is missing</li>}
                </ul>}
            </Content>
        </Message>
    );
}
