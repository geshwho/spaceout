export default function snapToGrid(x, y) {
	var snappedX = Math.round(x / 32) * 32
	var snappedY = Math.round(y / 32) * 32
  if(snappedX<0){snappedX=0}
  if(snappedX>400){snappedX=400}
  if(snappedY<0){snappedY=0}
  if(snappedY>1000){snappedY=1000}
	return [snappedX, snappedY]
}
