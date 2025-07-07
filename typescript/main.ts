import { Point } from './point';

//Creates an object/instance of class Point, just like in another another OOP language
let point = new Point(1,2);

//Calls the getter over here since no parameters are taken here
let x = point.X;

//sets the value over here since we're taking a value as a parameter
point.X = -1;