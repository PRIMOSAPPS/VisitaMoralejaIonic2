import { Color } from '../dto/color/color';

/*
Equivalencia al canal alpha
100% — FF
95% — F2
90% — E6
85% — D9
80% — CC
75% — BF
70% — B3
65% — A6
60% — 99
55% — 8C
50% — 80
45% — 73
40% — 66
35% — 59
30% — 4D
25% — 40
20% — 33
15% — 26
10% — 1A
5% — 0D
0% — 00
*/
export class UtilColor {
  /**
  Se recibe un string con el formato RRGGBBAA
  */
  public static toColor(colorStr: string): Color {
    var color = new Color();
    color.valorRGB = UtilColor.extraerRGB(colorStr);
    color.valorAlpha = UtilColor.extraerAlpha(colorStr);
    return color;
  }

  /**
  Se recibe un string con el formato RRGGBBAA
  */
  public static extraerAlpha(color: string): number {
    var strAlpha = color.substring(0, 2);
    var intAlpha = parseInt(strAlpha, 16);

    return intAlpha / 255;
  }

  /**
  Se recibe un string con el formato RRGGBBAA
  */
  public static extraerRGB(color: string): string {
    return color.substring(2, 8);
  }

}
