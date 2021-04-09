import { useWindowDimensions } from "react-native";
import { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring, interpolate } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default (props) => {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const config = { damping: 80, overshootClamping: true, restDisplacementThreshold: 0.1, restSpeedThreshold: 0.1, stiffness: 500 };
  const start = props?.position ? window.height - props.position : insets.top * 2;
  const opacity = props?.opacity ? props.opacity : 0.5;

  const position = useSharedValue(window.height);

  const view = useAnimatedStyle(() => ({ top: interpolate(position.value, [-500, start, window.height], [0, start, window.height]) }));
  const overlay = useAnimatedStyle(() => ({
    display: position.value < window.height ? "flex" : "none",
    opacity: interpolate(position.value, [0, start, window.height], [opacity, opacity, 0]),
  }));

  const open = () => {
    "worklet";
    position.value = withSpring(start, config);
  };

  const close = () => {
    "worklet";
    position.value = withSpring(window.height, config);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => (ctx.start = position.value),
    onActive: (event, ctx) => (position.value = ctx.start + event.translationY),
    onEnd: (event, _) => (position.value > 150 ? close() : open()),
  });

  return { open, close, view, overlay, gestureHandler };
};
