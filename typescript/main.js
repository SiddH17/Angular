var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'any', false];
var ColourRed = 0;
var ColourGreen = 1;
var ColourBlue = 2;
var Colour;
(function (Colour) {
    Colour[Colour["Red"] = 0] = "Red";
    Colour[Colour["Green"] = 1] = "Green";
    Colour[Colour["Blue"] = 2] = "Blue";
})(Colour || (Colour = {}));
;
var bgcolour = Colour.Red;
