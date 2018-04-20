import {rectangleOverlap} from './overlapping.js'

export function newAreaValid(existingAreas, newArea){
  //for(area in existingAreas) return false if rectangleOverlap(area, newArea)
  for (let area of existingAreas) {
    if (!rectangleOverlap(
      {x: area.relX, y: area.relY},
      {x: area.relX+area.width, y: area.relY+area.height},
      {x: newArea.relX, y: newArea.relY},
      {x: newArea.relX+newArea.width, y: newArea.relY+newArea.height}
    )){
      return false
    }
  }
  return true
}

export function changeAreaValid(existingAreas, changedArea){
  //existingAreas.delete((x) => x===changedArea)
  //newAreaValid(existingAreas, changedArea)
  otherAreas = existingAreas.filter((area) => area.areaKey !== changedArea.areaKey);
  return newAreaValid(otherAreas, changedArea);
}
