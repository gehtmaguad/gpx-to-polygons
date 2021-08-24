import fs from 'fs';

import {gpxToPolygons} from '../src';

describe('run gpx-to-polygons', () => {
  it('should return transformed payload', async () => {
    const xml = await fs.promises.readFile('./example.gpx');
    const result = await gpxToPolygons(xml);
    console.log("result: ", JSON.stringify(result, null, 2));

    // validate metadata
    expect(result.metadata.name).toBe('example');
    expect(result.metadata.description).toBe('description');
    expect(result.metadata.type).toBe(null);

    // validate waypoints
    expect(result.wpts).toHaveProperty('names');
    expect(result.wpts!.names).toHaveLength(3);
    expect(result.wpts!.names[0]).toBe('Reichstag (Berlin)');
    expect(result.wpts).toHaveProperty('descriptions');
    expect(result.wpts!.descriptions).toHaveLength(3);
    expect(result.wpts!.descriptions[0]).toBe(null);
    expect(result.wpts).toHaveProperty('types');
    expect(result.wpts!.types).toHaveLength(3);
    expect(result.wpts!.types[0]).toBe(null);
    expect(result.wpts).toHaveProperty('points');
    expect(result.wpts!.points).toHaveLength(3);
    expect(result.wpts!.points[0]).toBeInstanceOf(Array);
    expect(result.wpts!.points[0][0]).toBe(52.518611);
    expect(result.wpts!.points[0][1]).toBe(13.376111);
    expect(result.wpts!.elevations[0]).toBe(35.0);

    // validate routes
    expect(result.rtes).toHaveLength(1);
    expect(result.rtes![0]).toHaveProperty('name');
    expect(result.rtes![0].name).toBe('route1');
    expect(result.rtes![0]).toHaveProperty('description');
    expect(result.rtes![0].description).toBe('route description 1');
    expect(result.rtes![0].points).toHaveLength(3);
    expect(result.rtes![0].points[0]).toBeInstanceOf(Array);
    expect(result.rtes![0].points[0][0]).toBe(52.0);
    expect(result.rtes![0].points[0][1]).toBe(13.5);
    expect(result.rtes![0].elevations[0]).toBe(33.0);

    // validate tracks
    expect(result.trks).toHaveLength(2);
    expect(result.trks![0]).toHaveProperty('name');
    expect(result.trks![0].name).toBe('track1');
    expect(result.trks![0]).toHaveProperty('description');
    expect(result.trks![0].description).toBe('track description 1');
    expect(result.trks![0].trkseg).toHaveLength(1);
    expect(result.trks![0].trkseg![0].points).toHaveLength(3);
    expect(result.trks![0].trkseg![0].points[0]).toBeInstanceOf(Array);
    expect(result.trks![0].trkseg![0].points[0][0]).toBe(52.520000);
    expect(result.trks![0].trkseg![0].points[0][1]).toBe(13.380000);
    expect(result.trks![0].trkseg![0].elevations[0]).toBe(36.0);
  });
});
