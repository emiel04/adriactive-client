export type TCoordinate = {
    x: number;
    y: number;
};

export type TCoordinateRange = {
    start: TCoordinate;
    end: TCoordinate;
};

export type TDangerousArea = {
    reason: string;
    coordinateRange: TCoordinateRange;
};

export type TSector = {
    name: string;
    coordinateRange: TCoordinateRange;
    dangerousAreas: TDangerousArea[];
};
