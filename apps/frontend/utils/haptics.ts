import * as Haptics from 'expo-haptics';

const lightHapticFeedback = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {}
};

const mediumHapticFeedback = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {}
};

const heavyHapticFeedback = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch (error) {}
};

const softHapticFeedback = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  } catch (error) {}
};

const rigidHapticFeedback = () => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  } catch (error) {}
};

const successHapticFeedback = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {}
};

const warningHapticFeedback = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch (error) {}
};

const errorHapticFeedback = () => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {}
};

export {
  errorHapticFeedback,
  heavyHapticFeedback,
  lightHapticFeedback,
  mediumHapticFeedback,
  rigidHapticFeedback,
  softHapticFeedback,
  successHapticFeedback,
  warningHapticFeedback,
};
