import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type AutoScrollTextProps = {
  text: string;
  textStyle: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  containerProps?: any;
  textProps?: any;
};

export default function AutoScrollText({
  text,
  textStyle,
  containerStyle,
  containerProps,
  textProps,
}: AutoScrollTextProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);
  const [isSettled, setIsSettled] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const flattenedStyle = useMemo(
    () => StyleSheet.flatten(textStyle) || {},
    [textStyle],
  );
  const baseFontSize =
    typeof flattenedStyle.fontSize === "number" ? flattenedStyle.fontSize : 12;

  const shouldScroll = useMemo(
    () => textWidth > containerWidth + 4 && !isSettled,
    [textWidth, containerWidth, isSettled],
  );

  const fittedFontSize = useMemo(() => {
    if (!containerWidth || !textWidth || textWidth <= containerWidth) {
      return baseFontSize;
    }
    const scaled = baseFontSize * (containerWidth / textWidth);
    return Math.max(8, scaled);
  }, [baseFontSize, containerWidth, textWidth]);

  useEffect(() => {
    setIsSettled(false);
    translateX.setValue(0);
  }, [text, translateX]);

  useEffect(() => {
    let scrollAnim: Animated.CompositeAnimation | null = null;

    if (shouldScroll) {
      const distance = textWidth - containerWidth;
      const duration = Math.max(3000, distance * 26);

      translateX.setValue(0);
      scrollAnim = Animated.sequence([
        Animated.delay(700),
        Animated.timing(translateX, {
          toValue: -distance,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(350),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);

      scrollAnim.start(({ finished }) => {
        if (finished) {
          setIsSettled(true);
        }
      });
    } else {
      translateX.stopAnimation();
      translateX.setValue(0);
    }

    return () => {
      scrollAnim?.stop();
      translateX.stopAnimation();
    };
  }, [shouldScroll, textWidth, containerWidth, translateX]);

  return (
    <View
      style={containerStyle}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width)}
      {...containerProps}
    >
      <Animated.Text
        numberOfLines={1}
        style={[
          textStyle,
          isSettled && textWidth > containerWidth ? { fontSize: fittedFontSize } : null,
          { transform: [{ translateX }] },
        ]}
        onLayout={(event) => setTextWidth(event.nativeEvent.layout.width)}
        {...textProps}
      >
        {text}
      </Animated.Text>
    </View>
  );
}
