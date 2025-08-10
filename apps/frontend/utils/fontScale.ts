import { PixelRatio, Text, TextInput } from 'react-native';

// Call this function early in your app's lifecycle
const disableFontScaling = () => {
  // Prevent scaling for all <Text> components
  if ((Text as any).defaultProps == null) {
    (Text as any).defaultProps = {};
  }
  (Text as any).defaultProps.allowFontScaling = false;

  // Prevent scaling for all <TextInput> components
  if ((TextInput as any).defaultProps == null) {
    (TextInput as any).defaultProps = {};
  }
  (TextInput as any).defaultProps.allowFontScaling = false;
};

const clampFontScaling = (minScale = 0.85, maxScale = 1.0) => {
  const fontScale = PixelRatio.getFontScale();
  const clampedScale = Math.min(Math.max(fontScale, minScale), maxScale);

  const scaleFontSize = (size: number) => size * clampedScale;

  // Override default render for Text and TextInput
  if ((Text as any).defaultProps == null) (Text as any).defaultProps = {};
  if ((TextInput as any).defaultProps == null) (TextInput as any).defaultProps = {};

  (Text as any).defaultProps.style = [
    (Text as any).defaultProps.style || {},
    { fontSize: scaleFontSize(((Text as any).defaultProps.style as any)?.fontSize || 14) },
  ];

  (TextInput as any).defaultProps.style = [
    (TextInput as any).defaultProps.style || {},
    { fontSize: scaleFontSize(((TextInput as any).defaultProps.style as any)?.fontSize || 14) },
  ];
};

export { clampFontScaling, disableFontScaling };
