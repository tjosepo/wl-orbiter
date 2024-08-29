import { Alert, AlertTrigger } from "@components/alert/index.js";
import { Button } from "@components/button/index.js";
import { Content } from "@components/placeholders/index.js";
import { Heading } from "@components/typography/index.js";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

export default {
    title: "Chromatic/AlertTrigger",
    component: AlertTrigger
} as ComponentMeta<typeof AlertTrigger>;

type AlertTriggerStory = ComponentStoryObj<typeof AlertTrigger>;

export const Default: AlertTriggerStory = {
    storyName: "default",
    render: () => (
        <AlertTrigger>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you sure you want to launch the space shuttle?</Content>
            </Alert>
        </AlertTrigger>
    )
};

export const DefaultOpen: AlertTriggerStory = {
    storyName: "default open",
    render: () => (
        <AlertTrigger defaultOpen>
            <Button variant="secondary">Open</Button>
            <Alert primaryButtonLabel="Yes">
                <Heading>Launch</Heading>
                <Content>Are you sure you want to launch the space shuttle?</Content>
            </Alert>
        </AlertTrigger>
    )
};
