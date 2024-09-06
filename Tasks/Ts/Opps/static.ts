class Rectangle {
  constructor(private width: number, private height: number) {}
  // Instance method
  getArea() {
    return this.width * this.height;
  }
  // Static method
  static compareArea(rect1, rect2) {
    return rect1.getArea() > rect2.getArea()
      ? rect1.getArea() - rect2.getArea()
      : rect2.getArea() - rect1.getArea();
  }
}
let rect1 = new Rectangle(5, 8);
let rect2 = new Rectangle(6, 7);
console.log(Rectangle.compareArea(rect1, rect2));
