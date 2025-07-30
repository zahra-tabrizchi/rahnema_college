interface Show {
  show(): string;
}

abstract class Shape {
  abstract getArea(): number;
}

class Rect extends Shape implements Show {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }

  show() {
    return `Rect(Width: ${this.width}, height: ${this.height})`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(private edge: number) {
    super();
  }

  getArea(): number {
    return this.edge ** 2;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

class User {
  constructor(public firstName: string, public lastName: string) {}
}
