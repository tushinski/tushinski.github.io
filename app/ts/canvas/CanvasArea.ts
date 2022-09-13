import {Canvas, CanvasObjectProps, CanvasRectProps} from "./Canvas";

export abstract class CanvasArea<T> {
    private canvas: Canvas;
    protected readonly props: T & CanvasObjectProps;

    constructor(canvas: Canvas, props: T & CanvasObjectProps) {
        this.canvas = canvas;
        this.props = props;
    }

    protected rect(props: CanvasRectProps) {
        props = this.toRelativeProps(props);
        this.canvas.rect(props);
    }

    protected clear() {
        this.canvas.clearReact(this.props);
    }

    private toRelativeProps<T extends CanvasObjectProps>(props: T): T {
        return {
            ...props,
            x: props.x + this.props.x,
            y: props.y + this.props.y
        }
    }
}