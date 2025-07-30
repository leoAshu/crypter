import {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FlipInXUp,
  FlipInYLeft,
  FlipInYRight,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
  SlideOutDown,
  SlideOutLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

const adCardAnimConfig: Record<string, (isBuy: boolean, index: number) => { entering: any; exiting: any }> = {
  default: (isBuy: boolean, index: number) => ({
    entering: isBuy ? SlideInLeft.duration(300).delay(index * 80) : SlideInRight.duration(300).delay(index * 80),
    exiting: isBuy ? SlideOutLeft.duration(200).delay(index * 80) : SlideOutRight.duration(200).delay(index * 80),
  }),
  fadeFloatUp: (isBuy: boolean, index: number) => ({
    entering: FadeInUp.duration(250).delay(index * 70),
    exiting: FadeOutDown.duration(200).delay(index * 70),
  }),
  elegantSlide: (isBuy: boolean, index: number) => ({
    entering: isBuy ? SlideInLeft.duration(300).delay(index * 80) : SlideInRight.duration(300).delay(index * 80),
    exiting: isBuy ? SlideOutLeft.duration(200).delay(index * 80) : SlideOutRight.duration(200).delay(index * 80),
  }),
  springySlide: (isBuy: boolean, index: number) => ({
    entering: SlideInUp.springify().delay(index * 120),
    exiting: SlideOutDown.springify().delay(index * 120),
  }),
  cascadeZoomSlide: (isBuy: boolean, index: number) => ({
    entering: ZoomIn.delay(index * 80)
      .springify()
      .mass(0.4),
    exiting: isBuy ? SlideOutLeft.delay(index * 80).duration(250) : SlideOutRight.delay(index * 80).duration(250),
  }),
  zoomSlide: (isBuy: boolean, index: number) => ({
    entering: ZoomIn.duration(200).delay(index * 70),
    exiting: isBuy ? SlideOutLeft.duration(200).delay(index * 70) : SlideOutRight.duration(200).delay(index * 70),
  }),
  modernZoom: (isBuy: boolean, index: number) => ({
    entering: ZoomIn.duration(250).delay(index * 100),
    exiting: ZoomOut.duration(200).delay(index * 100),
  }),
  flipZoom: (isBuy: boolean, index: number) => ({
    entering: FlipInXUp.springify().delay(index * 100),
    exiting: ZoomOut.delay(index * 100),
  }),
  flipXSlide: (isBuy: boolean, index: number) => ({
    entering: isBuy ? FlipInYLeft.springify().delay(index * 80) : FlipInYRight.springify().delay(index * 80),
    exiting: isBuy ? SlideOutLeft.duration(200).delay(index * 80) : SlideOutRight.duration(200).delay(index * 80),
  }),
  flipYFade: (isBuy: boolean, index: number) => ({
    entering: FlipInXUp.springify().delay(index * 60),
    exiting: FadeOut.duration(150).delay(index * 60),
  }),
  superSubtle: (isBuy: boolean, index: number) => ({
    entering: FadeIn.duration(200).delay(index * 50),
    exiting: FadeOut.duration(150).delay(index * 50),
  }),
};

export default adCardAnimConfig;
export type AnimationStyle = keyof typeof adCardAnimConfig;
