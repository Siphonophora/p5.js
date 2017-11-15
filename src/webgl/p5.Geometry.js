//some of the functions are adjusted from Three.js(http://threejs.org)

'use strict';

var p5 = require('../core/core');
/**
 * p5 Geometry class
 * @class p5.Geometry
 * @constructor
 * @param  {function | Object} vertData callback function or Object
 *                     containing routine(s) for vertex data generation
 * @param  {Number} [detailX] number of vertices on horizontal surface
 * @param  {Number} [detailY] number of vertices on vertical surface
 * @param {function} [callback] function to call upon object instantiation.
 *
 */
p5.Geometry = function
(detailX, detailY, callback){
  //The following properties can be defined in the callback function

  //an array containing every vertex
  //@type [p5.Vector]
  this.vertices = [];

  //a 2D array containing uvs for every vertex (used for texture mapping).
  //The length of uvs must match the length of vertices
  //[[0.0,0.0],[1.0,0.0], ...]
  this.uvs = [];

  //OPTIONAL - if you wish to manually define which edges have rendered strokes
  //then provide an array of vertices to draw the edges between. You can
  //in order to render the strokes, you must call _makeTriangleEdges() after
  //creating the geometry
  //[[0,1],[1,3], ...]
  this.strokeIndices = [];

  //If you are not relying on computeFaces() to generate faces,
  //you should define them in the callback. The an array containing
  //each three vertex indices that form a face
  //[[0, 1, 2], [2, 1, 3], ...]
  this.faces = [];

  // The detailX and detailY must be defined if you going to rely on the
  // computeFaces() function to create the faces

  this.detailX = (detailX !== undefined) ? detailX: 1;
  this.detailY = (detailY !== undefined) ? detailY: 1;


  //The following properties are generally calculated by functions after
  //creating new p5.Geometry.

  //If you didn't specify faces, call computFaces();

  //Requires faces. The type of geometry determines which function to call below.
  //contains an array containing 1 normal vector per vertex
  //@type [p5.Vector]
  //[p5.Vector, p5.Vector, p5.Vector,p5.Vector, p5.Vector, p5.Vector,...]
  this.vertexNormals = [];


  //a 2D array containing edge connectivity pattern for create line vertices
  //this should be filed by _makeTriangleEdges(). See strokeIndicies above if you
  //wish direct control over edges
  this.edges = [];


  //Onces edges are computed call _edgesToVertices() to populate line vertices
  // an array containing every vertex for stroke drawing.
  this.lineVertices = [];

  //Populated at the same time as linevertices by _edgesToVertices()
  //an array 1 normal per lineVertex with
  //final position representing which direction to
  //displace for strokeWeight
  //[[0,0,-1,1], [0,1,0,-1] ...];
  this.lineNormals = [];





  if(callback instanceof Function){
    callback.call(this);
  }
  this.name = 'p5.Geometry';   // for friendly debugger system

  return this; // TODO: is this a constructor?
};

p5.Geometry.prototype.computeFaces = function(){
  var sliceCount = this.detailX + 1;
  var a, b, c, d;
  for (var i = 0; i < this.detailY; i++){
    for (var j = 0; j < this.detailX; j++){
      a = i * sliceCount + j;// + offset;
      b = i * sliceCount + j + 1;// + offset;
      c = (i + 1)* sliceCount + j + 1;// + offset;
      d = (i + 1)* sliceCount + j;// + offset;
      this.faces.push([a, b, d]);
      this.faces.push([d, b, c]);
    }
  }
  return this;
};

p5.Geometry.prototype._getFaceNormal = function(faceId,vertId){
  //This assumes that vA->vB->vC is a counter-clockwise ordering
  var face = this.faces[faceId];
  var vA = this.vertices[face[vertId%3]];
  var vB = this.vertices[face[(vertId+1)%3]];
  var vC = this.vertices[face[(vertId+2)%3]];
  var n = p5.Vector.cross(
    p5.Vector.sub(vB,vA),
    p5.Vector.sub(vC,vA));
  var sinAlpha = p5.Vector.mag(n) /
  (p5.Vector.mag(p5.Vector.sub(vB,vA))*
    p5.Vector.mag(p5.Vector.sub(vC,vA)));
  n = n.normalize();
  return n.mult(Math.asin(sinAlpha));
};
/**
 * computes smooth normals per vertex as an average of each
 * face.
 * @chainable
 */
p5.Geometry.prototype.computeNormals = function (){
  for(var v=0; v < this.vertices.length; v++){
    var normal = new p5.Vector();
    for(var i=0; i < this.faces.length; i++){
      //if our face contains a given vertex
      //calculate an average of the normals
      //of the triangles adjacent to that vertex
      if(this.faces[i][0] === v ||
        this.faces[i][1] === v ||
        this.faces[i][2] === v)
      {
        normal = normal.add(this._getFaceNormal(i, v));
      }
    }
    normal = normal.normalize();
    this.vertexNormals.push(normal);
  }
  return this;
};

/**
 * Averages the vertex normals. Used in curved
 * surfaces
 * @chainable
 */
p5.Geometry.prototype.averageNormals = function() {

  for(var i = 0; i <= this.detailY; i++){
    var offset = this.detailX + 1;
    var temp = p5.Vector
      .add(this.vertexNormals[i*offset],
        this.vertexNormals[i*offset + this.detailX]);
    temp = p5.Vector.div(temp, 2);
    this.vertexNormals[i*offset] = temp;
    this.vertexNormals[i*offset + this.detailX] = temp;
  }
  return this;
};

/**
 * Averages pole normals.  Used in spherical primitives
 * @chainable
 */
p5.Geometry.prototype.averagePoleNormals = function() {
  //average the north pole
  var sum = new p5.Vector(0, 0, 0);
  for(var i = 0; i < this.detailX; i++){
    sum.add(this.vertexNormals[i]);
  }
  sum = p5.Vector.div(sum, this.detailX);

  for(i = 0; i < this.detailX; i++){
    this.vertexNormals[i] = sum;
  }

  //average the south pole
  sum = new p5.Vector(0, 0, 0);
  for(i = this.vertices.length - 1;
    i > this.vertices.length - 1 - this.detailX; i--){
    sum.add(this.vertexNormals[i]);
  }
  sum = p5.Vector.div(sum, this.detailX);

  for(i = this.vertices.length - 1;
    i > this.vertices.length - 1 - this.detailX; i--){
    this.vertexNormals[i] = sum;
  }
  return this;
};

/**
 * Create a 2D array for establishing stroke connections
 * @return {p5.Geometry}
 */
p5.Geometry.prototype._makeTriangleEdges = function() {
  if (Array.isArray(this.strokeIndices) && this.strokeIndices.length !== 0) {
    for (var i=0, max=this.strokeIndices.length; i<max; i++) {
      this.edges.push(this.strokeIndices[i]);
    }
  }
  else {
    for (var j=0; j<this.faces.length; j++) {
      this.edges.push([this.faces[j][0], this.faces[j][1]]);
      this.edges.push([this.faces[j][1], this.faces[j][2]]);
      this.edges.push([this.faces[j][2], this.faces[j][0]]);
    }
  }
  return this;
};


/**
 * Create 4 vertices for each stroke line, two at the beginning position
 * and two at the end position. These vertices are displaced relative to
 * that line's normal on the GPU.
 * Part of the p5.RendererGL prototype, because it needs to be available
 * for geometry rendered in immediate mode.
 * @return {p5.Geometry}
 */
p5.RendererGL.prototype._edgesToVertices = function(geom) {
  geom.lineVertices = [];
  for(var i = 0; i < geom.edges.length; i++) {
    var begin = geom.vertices[geom.edges[i][0]];
    var end = geom.vertices[geom.edges[i][1]];
    var dir = end.copy().sub(begin).normalize();
    var a = begin.array(),
        b = begin.array(),
        c = end.array(),
        d = end.array();
    var dirAdd = dir.array();
    var dirSub = dir.array();
    // below is used to displace the pair of vertices at beginning and end
    // in opposite directions
    dirAdd.push(1);
    dirSub.push(-1);
    geom.lineNormals.push(dirAdd,dirSub,dirAdd,dirAdd,dirSub,dirSub);
    geom.lineVertices.push(a, b, c, c, b, d);
  }
};

/**
 * Modifies all vertices to be centered within the range -100 to 100.
 * @chainable
 */
p5.Geometry.prototype.normalize = function() {
  if(this.vertices.length > 0) {
    // Find the corners of our bounding box
    var maxPosition = this.vertices[0].copy();
    var minPosition = this.vertices[0].copy();

    for(var i = 0; i < this.vertices.length; i++) {
      maxPosition.x = Math.max(maxPosition.x, this.vertices[i].x);
      minPosition.x = Math.min(minPosition.x, this.vertices[i].x);
      maxPosition.y = Math.max(maxPosition.y, this.vertices[i].y);
      minPosition.y = Math.min(minPosition.y, this.vertices[i].y);
      maxPosition.z = Math.max(maxPosition.z, this.vertices[i].z);
      minPosition.z = Math.min(minPosition.z, this.vertices[i].z);
    }

    var center = p5.Vector.lerp(maxPosition, minPosition, 0.5);
    var dist = p5.Vector.sub(maxPosition, minPosition);
    var longestDist = Math.max(Math.max(dist.x, dist.y), dist.z);
    var scale = 200 / longestDist;

    for(i = 0; i < this.vertices.length; i++) {
      this.vertices[i].sub(center);
      this.vertices[i].mult(scale);
    }
  }
  return this;
};

/* Checks the internal consistency of vertices, uvs, strokeindicies
 * faces, detailX and detailY.
 * Should be called directly after creating new p5.Geometry
 * Inteded primarily for developers.
 */
p5.Geometry.prototype.validateInput = function(){

  if(this.vertices.length === 0){
    console.log( 'No vertices provided.');
  }
  if(this.uvs.length === 0){
    console.log( 'No uvs provided.');
  }
  if(this.vertices.length !== this.uvs.length){
    console.log( 'Vertices and uvs are different lengths:',
                 this.vertices, this.uvs);
  }
  if(this.detailX > 1 && this.detailY > 1 &&
     this.vertices.length !== this.detailY*this.detailX){

    console.log( 'Detail X and Y were specified > 1, but vertices were not X*Y '+
              'long (calls to computeFaces() will not work). ');
  }
  for (var i = 0; i < this.faces.length; i++) {
    var face = this.faces[i];
    if(face.length !== 3){
      console.log( 'Face ' +i+ ' does not have 3 vertices: ', face);
    }
    for (var j = 0; j < face.length; j++) {
      if(face[j]<0 || face[j] > this.vertices.length - 1){
        console.log( 'Face ' +i+ ' refers to a vertex index that doesnt exist: ',
                     face);
      }
    }
  }


  return this;
};


module.exports = p5.Geometry;
