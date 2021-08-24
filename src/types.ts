type GPX_ROOT_ELEMENT_ATTRIBUTES = {
    name?: string[];
    desc?: string[];
    type?: string[];
};

type GPX_POINT_ELEMENT_ATTRIBUTES = {
    $: {
        lat: string;
        lon: string;
    }
    ele?: string[];
    time?: string[];
};

export type GPX_METADATA = (GPX_ROOT_ELEMENT_ATTRIBUTES & object);

export type GPX = {
    $: object;
    metadata?: GPX_METADATA[];
    wpt?: (
        GPX_ROOT_ELEMENT_ATTRIBUTES & GPX_POINT_ELEMENT_ATTRIBUTES
    )[];
    rte?: (GPX_ROOT_ELEMENT_ATTRIBUTES & {
        rtept: GPX_POINT_ELEMENT_ATTRIBUTES[];
    })[];
    trk?: (GPX_ROOT_ELEMENT_ATTRIBUTES & {
        trkseg: {
            trkpt: GPX_POINT_ELEMENT_ATTRIBUTES[];
        }[];
    })[];
};
