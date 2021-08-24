import xml2js from 'xml2js';
import {GPX, GPX_METADATA} from './types';

const getFirstItemOfArray = <T>(array: Array<T> | undefined) =>
  Array.isArray(array) && (array.length) > 0 ? array[0] : null

const getFloat = (value: string | null) =>
  value ? parseFloat(value) : null

const parseMetadata = (gpx: GPX) => {
  const metadata = getFirstItemOfArray<GPX_METADATA>(gpx.metadata);
  if (metadata) {
    const {name, desc, type, ...props} = metadata;
    return {
      name: getFirstItemOfArray<string>(name),
      description: getFirstItemOfArray<string>(desc),
      type: getFirstItemOfArray<string>(type),
      ...props,
      ...gpx.$
    };
  }
  return {name: null, description: null, type: null, ...gpx.$};
};

const parseWaypoints = (gpx: GPX) => {
  if (!gpx.wpt) return null;

  return ({
    names: gpx.wpt.map(wpt => getFirstItemOfArray<string>(wpt.name)),
    descriptions: gpx.wpt.map(wpt => getFirstItemOfArray<string>(wpt.desc)),
    types: gpx.wpt.map(wpt => getFirstItemOfArray<string>(wpt.type)),
    points: gpx.wpt.map(wpt => ([
      parseFloat(wpt.$.lat),
      parseFloat(wpt.$.lon)
    ])),
    elevations: gpx.wpt.map(wpt => getFirstItemOfArray<string>(wpt.ele)).map(getFloat),
    intervals: gpx.wpt.map(wpt => getFirstItemOfArray<string>(wpt.time)),
  })
}

const parseRoutes = (gpx: GPX) => {
  if (!gpx.rte) return null;

  return gpx.rte?.map(rte => ({
    name: getFirstItemOfArray<string>(rte.name),
    description: getFirstItemOfArray<string>(rte.desc),
    type: getFirstItemOfArray<string>(rte.type),
    points: rte.rtept.map(rtept => ([
      getFloat(rtept.$.lat),
      getFloat(rtept.$.lon)
    ])),
    elevations: rte.rtept.map(rtept => getFirstItemOfArray<string>(rtept.ele)).map(getFloat),
    intervals: rte.rtept.map(rtept => getFirstItemOfArray<string>(rtept.time))
  }))
}

const parseTracks = (gpx: GPX) => {
  if (!gpx.trk) return null;

  return gpx.trk?.map(trk => ({
    name: getFirstItemOfArray<string>(trk.name),
    description: getFirstItemOfArray<string>(trk.desc),
    type: getFirstItemOfArray<string>(trk.type),
    trkseg: trk.trkseg.map(trkseg => ({
      points: trkseg.trkpt.map(trkpt => ([
        getFloat(trkpt.$.lat),
        getFloat(trkpt.$.lon)
      ])),
      elevations: trkseg.trkpt.map(trkpt => getFirstItemOfArray<string>(trkpt.ele)).map(getFloat),
      intervals: trkseg.trkpt.map(trkpt => getFirstItemOfArray<string>(trkpt.time))
    }))
  }))
}

export const gpxToPolygons = async (xml: string | Buffer) => {
  const gpx = <GPX>(await xml2js.parseStringPromise(xml)).gpx;
  if (!gpx) {
    throw new Error('Not a gpx file format');
  }

  const resultSet = {
    metadata: parseMetadata(gpx),
    trks: parseTracks(gpx),
    rtes: parseRoutes(gpx),
    wpts: parseWaypoints(gpx),
  };

  return resultSet;
};
