export function rectangleOverlap(l1, r1, l2, r2) {
  //THIS IS NOT A COMPLETE ALGORITHM!
  // If one rectangle is on left side of other
    if (l1.x > r2.x || l2.x > r1.x)
        return false;
    // If one rectangle is above other
    if (l1.y < r2.y || l2.y < r1.y)
        return false;
    return true;
}
