import {CanvasArea} from "../CanvasArea";
import {Canvas, CanvasObjectProps} from "../Canvas";

type SortDiagramProps = {
    pointerColor: string,
    columnColor: string,
    sortedColumnColor: string,
};

export class SortDiagram extends CanvasArea<SortDiagramProps> {
    private readonly columnGapPercent = 5;
    private readonly pointerHeight = 20;
    private columnWidth: number;
    private columnGap: number;


    drawCols(values: number[], sortedIndexes?: Set<number>) {
        this.clearRect({
            x: 0,
            y: 0,
            h: this.props.h - this.pointerHeight,
            w: this.props.w,
        });

        const columnWidthWithoutGaps = this.props.w / values.length;
        this.columnGap = columnWidthWithoutGaps / 100 * this.columnGapPercent;
        this.columnWidth = columnWidthWithoutGaps - this.columnGap;

        values.forEach((value, i) => {
            const height = (this.props.h - this.pointerHeight) / values.length * value;

            this.rect({
                x: i * (this.columnWidth + this.columnGap),
                y: this.props.h - height - this.pointerHeight,
                w: this.columnWidth,
                h: height,
                fill: sortedIndexes?.has(i) ? this.props.sortedColumnColor : this.props.columnColor
            });
        });
    }

    drawPointer(pointerIndex: number) {
        this.clearPointer();
        this.rect({
            x: pointerIndex * (this.columnWidth + this.columnGap),
            y: this.props.h - this.pointerHeight,
            h: this.pointerHeight,
            w: this.columnWidth,
            fill: this.props.pointerColor
        });
    }

    clearPointer() {
        this.clearRect({
            x: 0,
            y: this.props.h - this.pointerHeight,
            h: this.pointerHeight,
            w: this.props.w,
        });
    }
}