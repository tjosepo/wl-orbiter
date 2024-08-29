import { TileLink } from "@components/tile/index.js";
import { createTileLinkTestSuite } from "./createTileLinkTestSuite.js";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TileLink")
        .segment(segment)
        .build();
}

createTileLinkTestSuite(
    <TileLink orientation="horizontal" width="600px" />,
    stories("/horizontal"),
);

createTileLinkTestSuite(
    <TileLink orientation="vertical" width="300px" />,
    stories("/vertical"),
);
