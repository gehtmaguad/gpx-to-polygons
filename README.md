# gpx-to-polygons

Transform gpx to a set of polygons

## Installation

To install the module, use:

```bash
npm install gpx-to-polygons # or yarn add gpx-to-polygons
```

## Example

GPX Input:

```
<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="Wikipedia"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
  <metadata>
    <name>example</name>
    <desc>description</desc>
    <author>
      <name>name of authhor</name>
    </author>
  </metadata>
  <wpt lat="52.518611" lon="13.376111">
    <ele>35.0</ele>
    <time>2011-12-31T23:59:59Z</time>
    <name>Reichstag (Berlin)</name>
    <sym>City</sym>
  </wpt>
  <wpt lat="48.208031" lon="16.358128">
    <ele>179</ele>
    <time>2011-12-31T23:59:59Z</time>
    <name>Parlament (Wien)</name>
    <sym>City</sym>
  </wpt>
  <wpt lat="46.9466" lon="7.44412">
    <time>2011-12-31T23:59:59Z</time>
    <name>Bundeshaus (Bern)</name>
    <sym>City</sym>
  </wpt>
  <rte>
    <name>route1</name>
    <desc>route description 1</desc>
    <rtept lat="52.0" lon="13.5">
      <ele>33.0</ele>
      <time>2011-12-13T23:59:59Z</time>
      <name>rtept 1</name>
    </rtept>
    <rtept lat="49" lon="12">
      <name>rtept 2</name>
    </rtept>
    <rtept lat="47.0" lon="7.5">
    </rtept>
  </rte>
  <trk>
    <name>track1</name>
    <desc>track description 1</desc>
    <trkseg>
      <trkpt lat="52.520000" lon="13.380000">
        <ele>36.0</ele>
        <time>2011-01-13T01:01:01Z</time>
      </trkpt>
      <trkpt lat="48.200000" lon="16.260000">
        <ele>180</ele>
        <time>2011-01-14T01:59:01Z</time>
      </trkpt>
      <trkpt lat="46.95" lon="7.4">
        <ele>987.654</ele>
        <time>2011-01-15T23:59:01Z</time>
      </trkpt>
    </trkseg>
  </trk>
  <trk>
    <name>track2</name>
    <trkseg>
      <trkpt lat="47.2" lon="7.41">
        <time>2011-01-16T23:59:01Z</time>
      </trkpt>
      <trkpt lat="52.53" lon="13.0">
      </trkpt>
    </trkseg>
  </trk>
</gpx>
```

Transformed Output:

```
{
      "metadata": {
        "name": "example",
        "description": "description",
        "type": null,
        "author": [{
          "name": ["name of authhor"]
        }],
        "xmlns": "http://www.topografix.com/GPX/1/1",
        "version": "1.1",
        "creator": "Wikipedia",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xsi:schemaLocation": "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"
      },
      "trks": [
        {
          "name": "track1",
          "description": "track description 1",
          "type": null,
          "trkseg": [{
            "points": [[52.52, 13.38], [48.2, 16.26], [46.95, 7.4]],
            "elevations": [36, 180, 987.654],
            "intervals": ["2011-01-13T01:01:01Z", "2011-01-14T01:59:01Z", "2011-01-15T23:59:01Z"]
          }]
        },
        {
          "name": "track2",
          "description": null,
          "type": null,
          "trkseg": [{
            "points": [[47.2, 7.41],[52.53, 13]],
            "elevations": [null, null],
            "intervals": ["2011-01-16T23:59:01Z", null]
          }
        ]}
      ],
      "rtes": [
        {
          "name": "route1",
          "description": "route description 1",
          "type": null,
          "points": [[52, 13.5], [49, 12], [47, 7.5]],
          "elevations": [33, null, null],
          "intervals": ["2011-12-13T23:59:59Z", null, null]
        }
      ],
      "wpts": {
        "names": ["Reichstag (Berlin)", "Parlament (Wien)", "Bundeshaus (Bern)"],
        "descriptions": [null, null, null],
        "types": [null, null, null],
        "points": [[52.518611, 13.376111], [48.208031, 16.358128], [46.9466, 7.44412]],
        "elevations": [35, 179, null],
        "intervals": ["2011-12-31T23:59:59Z", "2011-12-31T23:59:59Z", "2011-12-31T23:59:59Z"]
      }
    }
```