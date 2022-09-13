export type CanvasObjectProps = {
    x: number,
    y: number,
    w: number,
    h: number,
}

export type CanvasRectProps = CanvasObjectProps & {
    fill?: string,
    stroke?: string,
    strokeWidth?: number,
}

export type CanvasProps = {
    canvasEl: HTMLCanvasElement,
    square?: boolean,
}

export class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private resizeTimeout = 400;
    private resizeTimeoutId: number;

    constructor(props: CanvasProps) {
        this.canvas = props.canvasEl;

        const parentRect = this.canvas.parentElement.getBoundingClientRect();

        if (props.square) {
            this.canvas.width = this.canvas.height = Math.min(parentRect.width, parentRect.height);
        } else {
            this.canvas.width = parentRect.width;
            this.canvas.height = parentRect.height;
        }

        this.ctx = this.canvas.getContext("2d");

        const parentWindow = this.canvas.ownerDocument.defaultView;
        parentWindow.addEventListener("resize", this.onWindowResize.bind(this));
    }

    get width() {
        return this.canvas.width;
    }

    get height() {
        return this.canvas.height;
    }

    clip(props: CanvasObjectProps) {
        this.ctx.beginPath();
        this.ctx.rect(props.x, props.y, props.w, props.h);
        this.ctx.clip();
    }

    rect(props: CanvasRectProps) {
        if (props.fill) {
            this.ctx.fillStyle = props.fill;
            this.ctx.fillRect(props.x, props.y, props.w, props.h);
        }
        if (props.stroke && props.strokeWidth) {
            this.ctx.strokeStyle = props.stroke;
            this.ctx.lineWidth = props.strokeWidth;
            this.ctx.strokeRect(props.x, props.y, props.w, props.h);
        }
    }

    clearReact(props: CanvasObjectProps) {
        this.ctx.clearRect(props.x, props.y, props.w, props.h);
    }

    private fitTo(width: number, height: number,) {
        let scale = Math.min(
            width / this.width,
            height / this.height,
        );

        this.canvas.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    private onWindowResize() {
        clearTimeout(this.resizeTimeoutId);
        this.resizeTimeoutId = window.setTimeout(() => {
            const parentRect = this.canvas.parentElement.getBoundingClientRect();
            this.fitTo(parentRect.width, parentRect.height);
        }, this.resizeTimeout);
    }
}