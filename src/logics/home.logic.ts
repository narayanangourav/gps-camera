import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useHomeLogic() {
  const navigation = useNavigation<any>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const goToOverview = () => {
    navigation.replace("Overview");
  };

  return {
    fadeAnim,
    slideAnim,
    goToOverview,
  };
}

