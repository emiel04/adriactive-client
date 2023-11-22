export type Coord = {
    x: number;
    y: number;
};

export type CoordinateRange = {
    start: Coord;
    end: Coord;
};

export type DangerousArea = {
    reason: string;
    coordinateRange: CoordinateRange;
};

export type Sector = {
    name: string;
    coordinateRange: CoordinateRange;
    dangerousAreas: DangerousArea[];
};
