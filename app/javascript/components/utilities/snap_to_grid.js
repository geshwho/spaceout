const snapFactor = 32;

//futurely: could this take a space parameter and snap to walls and such?
export default function snapToGrid(relX, relY, width, depth){
  var snappedX = Math.round(relX / snapFactor) * snapFactor
	var snappedY = Math.round(relY / snapFactor) * snapFactor
  var snappedWidth = Math.round(width / snapFactor) * snapFactor
	var snappedDepth = Math.round(depth / snapFactor) * snapFactor
  if(snappedX<0){snappedX=0}
  if(snappedWidth>1000){snappedWidth=1000}
  if(snappedX+snappedWidth>1000){snappedX=1000-snappedWidth}
  if(snappedY<0){snappedY=0}
  if(snappedDepth>400){snappedDepth=400}
  if(snappedY+snappedDepth>400){snappedY=400-snappedDepth}
  return [snappedX, snappedY, snappedWidth, snappedDepth]
}
