---
title: GeoJson serialization issues with Spring Data MongoDb
date: 2017-08-23 00:00:00 +0300
description: # Add post description (optional)
img: ./spring-mongo-geojson.png # Add image post (optional)
tags: [Java, Spring, MongoDB, JSON] # add tag
---

Since few months I'm having fun on developing a middleware application with Java 8, Spring Boot (1.5.x) and the Spring Data MongoDb module. 
Spring Data MongoDb supports spatial data type and it also support GeoJson format, which means you can send a geometry in GeoJson format (point, linestring, polygon, etc...) and Spring Data MongoDb 
will be able to parse and store it correctly in the defined collection.
Once stored Spring Data Mongodb module will be able to treat it like a spatial data and you'll be able to run spatial queries like Within, InWithin, Near, IsNear, MaxDistance, etc..

Everything seemed awesome but I had a simple and stupid issue. While retriving data using a simple RestController I wasn't able to get back Geometries in GeoJson format... All geometries were always given back in the Spring Data MongoDb format (X and Y properties) instead of the GeoJson format .

Here's the simple Controller that I did:

```java
@RequestMapping(value = "/listLineStrings", method = RequestMethod.GET) 
public ResponseEntity<List<LineStringGeometry>> listLineStrings() { 
    List lineStringGeometries = lineStringGeometryService.findAll(); 
    new ResponseEntity(lineStringGeometries, HttpStatus.OK); 
}
```

Here the result after calling /listLineStrings endpoint (Spring Data MongoDb representation of a LineString):
```json
{
   "id":"599d1d0bd3466521a8f7be7f",
   "geom":{
      "type":"LineString",
      "coordinates":[
         {
            "x":10,
            "y":56,
            "type":"Point",
            "coordinates":[
               10,
               56
            ]
         },
         {
            "x":10,
            "y":57,
            "type":"Point",
            "coordinates":[
               10,
               57
            ]
         }
      ]
   }
}
```

Here's what I expected to have (GeoJson):
```json
{
   "id":"599d1d0bd3466521a8f7be7f",
   "geom":{
      "type":"LineString",
      "coordinates":[
         [
            10,
            56
         ],
         [
            10,
            57
         ]
      ]
   }
}
```

After googling and stackoverflowing a bit, I didn't find exactly the answer I wanted so I developed this 3 custom Serializers for the 3 geometry types I'm using in the project: Points, LineStrings and Polygons.

What I did was to overload the serialization behavior of Spring Data MongoDb (serialization means from Entity to Json, deserialization is the opposite). Here below the 3 classes developed (put it on a util or serializer package for a better organization of the project)

**GeoJsonPoint**
```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import java.io.IOException; /** * Created by alessandro.rosa on 23/08/2017. */
public class GeoJsonPointSerializer extends JsonSerializer < GeoJsonPoint > {
    @Override public void serialize(GeoJsonPoint value, JsonGenerator gen, SerializerProvider serializers) throws IOException,
    JsonProcessingException {
        gen.writeStartObject();
        gen.writeStringField("type", value.getType());
        gen.writeArrayFieldStart("coordinates");
        gen.writeObject(value.getCoordinates());
        gen.writeEndArray();
        gen.writeEndObject();
    }
}
```

**GeoJsonLineString**
```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import java.io.IOException; /** * Created by alessandro.rosa on 23/08/2017. */
public class GeoJsonLineStringSerializer extends JsonSerializer < GeoJsonLineString > {
    @Override public void serialize(GeoJsonLineString value, JsonGenerator gen, SerializerProvider serializers) throws IOException,
    JsonProcessingException {
        gen.writeStartObject();
        gen.writeStringField("type", value.getType());
        gen.writeArrayFieldStart("coordinates");
        for (Point p: value.getCoordinates()) {
            gen.writeObject(new double[] {
                p.getX(), p.getY()
            });
        }
        gen.writeEndArray();
        gen.writeEndObject();
    }
}
```

**GeoJsonPolygon**
```java
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.geo.GeoJsonLineString;
import org.springframework.data.mongodb.core.geo.GeoJsonPolygon;
import java.io.IOException; /** * Created by alessandro.rosa on 23/08/2017. */
public class GeoJsonPolygonSerializer extends JsonSerializer < GeoJsonPolygon > {
    @Override public void serialize(GeoJsonPolygon value, JsonGenerator gen, SerializerProvider serializers) throws IOException,
    JsonProcessingException {
        gen.writeStartObject();
        gen.writeStringField("type", value.getType());
        gen.writeArrayFieldStart("coordinates");
        for (GeoJsonLineString ls: value.getCoordinates()) {
            gen.writeStartArray();
            for (Point p: ls.getCoordinates()) {
                gen.writeObject(new double[] {
                    p.getX(), p.getY()
                });
            }
            gen.writeEndArray();
        }
        gen.writeEndArray();
        gen.writeEndObject();
    }
}
```

After this the only thing I had to do was to use the annotation
```java
@JsonSerialize(using = GeoJsonPointSerializer.class)
```
on the entity with the property of type GeoJsonPoint

like this:
```java
@Document(collection = "pointGeometries") public class PointGeometry {
        @Id private String id;
        @JsonSerialize(using = GeoJsonPointSerializer.class) @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE) private GeoJsonPoint geom;
        public PointGeometry() {}
        public PointGeometry(GeoJsonPoint geom) {
            this.geom = geom;
        } {
            getters and setters omitted
        }
```
Similar annotation for the other GeoJsonPolygons or GeoJsonLineStrings
```java
@JsonSerialize(using = GeoJsonLineStringSerializer.class) @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE) private GeoJsonLineString geom;
@JsonSerialize(using = GeoJsonPolygonSerializer.class) @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE) private GeoJsonPolygon geom;
```
Since it tooks me a bit of time to solve this issue I hope to be usefull to other developers with this post.
Cheers!!