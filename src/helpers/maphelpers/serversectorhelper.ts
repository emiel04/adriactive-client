import {Extent} from "ol/extent";
import {TCoordinateRange, TSector} from "../../components/common/TSector.tsx";

export function createCoordConverter(rectBoundingBox: Extent| undefined, serverWidth: number, serverHeight: number): (x: number, y: number) => [number, number]{
    if (!rectBoundingBox){
        throw new Error("Rectangle bounding box is not defined");
    }
    const diffX = rectBoundingBox[2] - rectBoundingBox[0];
    const diffY = rectBoundingBox[3] - rectBoundingBox[1];
    const scaleX = diffX / serverWidth;
    const scaleY = diffY / serverHeight;

    return (x: number, y: number) =>  {
        const mapX = rectBoundingBox[0] + x * scaleX;
        const mapY = rectBoundingBox[1] + y * scaleY;
        return [mapX, mapY];
    }
}


export function convertServerSectorToClientSector(sectors: TSector[], coordConverter: (x: number, y: number) => [number, number]): TSector[] {
    return sectors.map(serverSector => ({
        name: serverSector.name,
        coordinateRange: convertCoordinateRange(serverSector.coordinateRange, coordConverter),
        dangerousAreas: serverSector.dangerousAreas.map(serverArea => ({
            reason: serverArea.reason,
            coordinateRange: convertCoordinateRange(serverArea.coordinateRange, coordConverter),
        })),
    }));
}

export function convertCoordinateRange(coordinateRange: TCoordinateRange, coordConverter: (x: number, y: number) => [number, number]): TCoordinateRange {
    return {
        start: convertCoordinate(coordinateRange.start, coordConverter),
        end: convertCoordinate(coordinateRange.end, coordConverter),
    };
}

export function convertCoordinate(coordinate: { x: number; y: number; }, coordConverter: (x: number, y: number) => [number, number]): { x: number; y: number; } {
    const [x, y] = coordConverter(coordinate.x, coordinate.y);
    return { x, y };
}
