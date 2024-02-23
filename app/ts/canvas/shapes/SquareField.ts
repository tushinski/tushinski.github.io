import {CanvasArea} from "../CanvasArea";
import {CanvasObjectProps} from "../Canvas";

type SquareFieldProps = {
    size: number,
    initialSiteColor: string,
    fieldBorderColor?: string,
    fieldBorderWidth?: number,
    siteBorderColor?: string,
    siteBorderWidth?: number,
};

export class SquareField extends CanvasArea<SquareFieldProps> {
    private innerOffset: number;

    drawEmpty() {
        this.clear();
        this.drawField();
        this.drawSites();
    }

    private drawField() {
        this.calcInnerOffset();
        this.rect({
            x: 0,
            y: 0,
            w: this.props.w,
            h: this.props.h,
            stroke: this.props.fieldBorderColor,
            strokeWidth: this.props.fieldBorderWidth,
        });
    }

    private drawSites() {
        for (let i = 0; i < this.props.size; i++) {
            for (let j = 0; j < this.props.size; j++) {
                this.fillSite(i, j);
            }
        }
    }

    private getSiteProps(row: number, col: number): CanvasObjectProps {
        return {
            x: col * this.siteWidth + this.innerOffset,
            y: row * this.siteWidth + this.innerOffset,
            w: this.siteWidth,
            h: this.siteWidth,
        }
    }

    get siteWidth() {
        return Math.floor(this.props.w / this.props.size);
    }

    private calcInnerOffset() {
        if (this.innerOffset !== undefined) {
            return;
        }
        const unnormalizedWidth = this.props.w / this.props.size * this.props.size;
        const realWidth = this.siteWidth * this.props.size;

        this.innerOffset = Math.floor((unnormalizedWidth - realWidth) / 2);
    }

    fillSite(row: number, col: number, color?: string) {
        this.rect({
            ...this.getSiteProps(row, col),
            fill: color || this.props.initialSiteColor,
            stroke: this.props.siteBorderColor,
            strokeWidth: this.props.siteBorderWidth,
        });
    }
}