import { useWindowDimensions } from "react-native";
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from "react-native-reanimated";

export default () => {
  const start = 40;
  const config = { damping: 80, overshootClamping: true, restDisplacementThreshold: 0.1, restSpeedThreshold: 0.1, stiffness: 500 };

  const window = useWindowDimensions();
  const pos = useSharedValue(start);
  const style = useAnimatedStyle(() => ({ top: pos.value }));

  const open = () => {
    "worklet";
    pos.value = withSpring(start, config);
  };
  const close = () => {
    "worklet";
    pos.value = withSpring(window.height, config);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => (ctx.start = pos.value),
    onActive: (event, ctx) => (pos.value = ctx.start + event.translationY),
    onEnd: (event, _) => (event.absoluteY > window.height / 2 - 50 ? close() : open()),
  });

  return { open, close, style, gestureHandler };
};
