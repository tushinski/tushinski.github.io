export class Point {
    constructor(
        readonly x: number,
        readonly y: number,
    ) {
    }

    withOffset(offsetX: number, offsetY: number): Point {
        return new Point(this.x + offsetX, this.y + offsetY);
    }

    toString(reverseY = false) {
        return `${this.x},${reverseY ? -1 * this.y : this.y}`;
    }
}

export class Line {
    readonly m: number;
    readonly c: number;

    static horizontal(y: number): Line {
        return new Line(0, y);
    }

    static gradient(p1: Point, p2: Point): number {
        // m = (y2 - y1) / (x2 - x1)
        return (p2.y - p1.y) / (p2.x - p1.x);
    }

    static fromTwoPoints(p1: Point, p2: Point): Line {
        const m = this.gradient(p1, p2);
        const c = p1.y - m * p1.x;

        return new Line(m, c);
    }

    constructor(m: number, c =  0) {
        this.m = m;
        this.c = c;
    }

    getY(x: number) {
        // y = mx + c
        return this.m * x + this.c;
    }

    getX(y: number) {
        // x = (y - c) / m
        return (y - this.c) / this.m;
    }

    passingThrough(point: Point) {
        const c = point.y - this.m * point.x;

        return new Line(this.m, c);
    }

    isHorizontal() {
        return this.m === 0;
    }

    intersection(other: Line): Point | null {
        let x: number;

        if (this.isHorizontal() && other.isHorizontal()) {
            return null;
        }

        if (other.isHorizontal()) {
            const y = other.c;
            const x = this.getX(y);

            return new Point(x, y);
        } else if (this.isHorizontal()) {
            const y = this.c;
            const x = other.getX(y);

            return new Point(x, y);
        }

        if (other.c === this.c) {
            x = 0;
        } else {
            x = (this.m - other.m) / (other.c - this.c);
        }

        const y1 = this.getY(x);
        const y2 = other.getY(x);

        if (y1 !== y2) {
            console.warn(`y1=${y1}, y2=${y2}`);
            return null;
        }

        return new Point(x, y1);
    }
}

export class Triangle {
    constructor(
        private v1: Point,
        private v2: Point,
        private v3: Point,
    ) {
    }

    move(offsetX: number, offsetY: number): Triangle {
        return new Triangle(
            this.v1.withOffset(offsetX, offsetY),
            this.v2.withOffset(offsetX, offsetY),
            this.v3.withOffset(offsetX, offsetY),
        );
    }

    points() {
        return [this.v1, this.v2, this.v3];
    }

    toString(reverseY = false): string {
        return [this.v1, this.v2, this.v3]
            .map(point => point.toString(reverseY))
            .join(" ");
    }
}