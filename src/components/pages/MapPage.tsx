import {useEffect, useRef} from "react";
import * as ol from "ol";
import {fromLonLat} from "ol/proj";
import {OSM, Vector} from "ol/source";
import {Tile} from "ol/layer";
import {Polygon} from "ol/geom";
import "../../assets/css/map.css"
import {useWebSocket} from "../context/WebSocketContext.tsx";
import VectorLayer from "ol/layer/Vector";
import {Coordinate} from "ol/coordinate";
import {TWorldSector} from "../common/TWorldSector.tsx";
import {convertServerSectorToClientSector, createCoordConverter} from "../../helpers/maphelpers/serversectorhelper.ts";
import {drawDangerZones, drawRectangle, drawSectors} from "../../helpers/maphelpers/shape-drawer.ts";
import api from "../../services/api-world.ts";
import axios from "axios";


function createMapObject(center: Array<number>) {
    return new ol.Map({
        layers: [
            new Tile({
                source: new OSM()
            })
        ],
        view: new ol.View({
            center: center,
            zoom: 15,
        }),
        controls: []
    });
}

function MapPage() {
    const mapDiv = useRef(null);
    const ws = useWebSocket();
    const dangerZoneLayers: VectorLayer<Vector<ol.Feature<Polygon>>>[] = [];
    const sectorLayers: VectorLayer<Vector<ol.Feature<Polygon>>>[] = [];
    useEffect(() => {
        const center: Coordinate = fromLonLat([12.060, 45.0528]);
        const mapObject = createMapObject(center);
        const adriaCancelSource = axios.CancelToken.source();
        if (mapDiv.current) {
            mapObject.setTarget(mapDiv.current);
        }
        const rectFeature = drawRectangle(mapObject, center, 5000, 5000, "transparent")
        const rectExtent = rectFeature.getGeometry()?.getExtent();
        const coordConverter = createCoordConverter(rectExtent, 100, 100)

        function updateSectors(sectors: TWorldSector[]) {
            //remove existing layers
            dangerZoneLayers.forEach(dangerzone => {
                mapObject.removeLayer(dangerzone);
            })
            if (sectorLayers.length === 0) {
                drawSectors(mapObject, sectors).forEach(sector => {
                    sectorLayers.push(sector);
                })
            }
            //add the layers
            drawDangerZones(mapObject, sectors).forEach(zone => {
                dangerZoneLayers.push(zone);
            })
        }

        function fetchSectorsAndDraw() {

            api.getAdria(adriaCancelSource.token).then(data => {
                if (!data) return;
                const sectors = convertServerSectorToClientSector(data.sectors, coordConverter);
                updateSectors(sectors);
            });

        }

        function handleWebSocketMessage(error: Error, message: any) {
            if (error) {
                console.error(error);
                return;
            }
            let sectors: TWorldSector[] = message.body.sectors;
            sectors = convertServerSectorToClientSector(sectors, coordConverter);
            updateSectors(sectors);

        }

        const messageHandlerId = ws.addBroadcastListener(handleWebSocketMessage)
        fetchSectorsAndDraw();

        return () => {
            mapObject.setTarget();
            ws.removeBroadcastListener(messageHandlerId);
            adriaCancelSource.cancel();
        };
    }, []);

    return (
        <div ref={mapDiv} id="map" className={"ol-map"}/>
    );

}

export default MapPage;


