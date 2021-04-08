import { useWindowDimensions } from "react-native";
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring, interpolate, Extrapolate } from "react-native-reanimated";

export default () => {
  const offset = 40;
  const config = { damping: 80, overshootClamping: true, restDisplacementThreshold: 0.1, restSpeedThreshold: 0.1, stiffness: 500 };

  const window = useWindowDimensions();
  const pos = useSharedValue(window.height);
  const opacity = useSharedValue(0);

  const view = useAnimatedStyle(() => ({ top: interpolate(pos.value, [-500, offset, window.height], [0, offset, window.height]) }));
  const overlay = useAnimatedStyle(() => ({
    display: pos.value < window.height ? "flex" : "none",
    opacity: interpolate(pos.value, [0, offset, window.height], [0.5, 0.5, 0]),
  }));

  const open = () => {
    "worklet";
    pos.value = withSpring(offset, config);
    opacity.value = withSpring(0.5, config);
  };
  const close = () => {
    "worklet";
    pos.value = withSpring(window.height, config);
    opacity.value = withSpring(0, config);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => (ctx.start = pos.value),
    onActive: (event, ctx) => (pos.value = ctx.start + event.translationY),
    onEnd: (event, _) => (pos.value > 150 ? close() : open()),
  });

  return { open, close, view, overlay, gestureHandler };
};
