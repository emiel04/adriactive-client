import {Extent} from "ol/extent";
import {TCoordinateRange, TWorldSector} from "../../components/common/TWorldSector.tsx";
import {fromLonLat} from "ol/proj";
import {Coordinate} from "ol/coordinate";
import * as ol from "ol";
import {Tile} from "ol/layer";
import {OSM} from "ol/source";


export function getAdriaMiddle(): Coordinate {
    return fromLonLat([12.060, 45.0528]);
}

export function getAdriaExtent(): Extent {
    return [1337926.8372697686, 5628069.992844836, 1347099.28066399, 5631605.205403025];
}

function createCoordConverter(rectBoundingBox: Extent | undefined, serverWidth: number, serverHeight: number): (x: number, y: number) => [number, number] {
    if (!rectBoundingBox) {
        throw new Error("Rectangle bounding box is not defined");
    }
    const diffX = rectBoundingBox[2] - rectBoundingBox[0];
    const diffY = rectBoundingBox[3] - rectBoundingBox[1];
    const scaleX = diffX / serverWidth;
    const scaleY = diffY / serverHeight;

    return (x: number, y: number) => {
        const mapX = rectBoundingBox[0] + x * scaleX;
        const mapY = rectBoundingBox[1] + y * scaleY;
        return [mapX, mapY];
    }
}

export function getCoordConverter(rectExtent: Extent) {
    return createCoordConverter(rectExtent, 100, 100);
}

export function convertServerSectorToClientSector(sectors: TWorldSector[], coordConverter: (x: number, y: number) => [number, number]): TWorldSector[] {
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

export function convertCoordinate(coordinate: {
    x: number;
    y: number;
}, coordConverter: (x: number, y: number) => [number, number]): { x: number; y: number; } {
    const [x, y] = coordConverter(coordinate.x, coordinate.y);
    return {x, y};
}

export function createMapObject(center: Array<number>, zoom: number = 15) {
    return new ol.Map({
        layers: [
            new Tile({
                source: new OSM()
            })
        ],
        view: new ol.View({
            center: center,
            zoom: zoom,
            extent: getAdriaExtent()
        }),
        controls: []
    });
}