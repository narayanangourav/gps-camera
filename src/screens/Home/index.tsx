import React from "react";
import { View, Text, TouchableOpacity, Animated, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import FeatureItem from "../../components/FeatureItem";
import { useHomeLogic } from "../../logics/home.logic";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

export default function Home() {
  const { fadeAnim, slideAnim, goToOverview } = useHomeLogic();
  const styles = useStyles();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("home-screen", "home-screen")}
    >
      <LinearGradient
        colors={appTheme.gradients.screen}
        style={styles.background}
        {...webDomProps("home-background", "home-background")}
      >
        <View style={styles.content} {...webDomProps("home-content", "home-content")}>
          <Animated.View
            style={[
              styles.heroContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
            {...webDomProps("home-hero", "home-hero")}
          >
            <View
              style={styles.iconContainer}
              {...webDomProps("home-logo-container", "home-logo-container")}
            >
              <Image
                source={require("../../../assets/app-icon.png")}
                style={styles.logoImage}
                resizeMode="contain"
                {...webDomProps("home-logo", "home-logo")}
              />
            </View>

            <Text style={styles.title} {...webDomProps("home-title", "home-title")}>
              GPS Camera
            </Text>
            <Text
              style={styles.subtitle}
              {...webDomProps("home-subtitle", "home-subtitle")}
            >
              Capture moments with precision.{"\n"}
              Overlay location, date, and time instantly.
            </Text>

            <View
              style={styles.featureList}
              {...webDomProps("home-feature-list", "home-feature-list")}
            >
              <FeatureItem
                icon="map"
                text="Live Location Tagging"
                selectorKey="map"
              />
              <FeatureItem
                icon="time"
                text="Timestamp Verification"
                selectorKey="time"
              />
              <FeatureItem
                icon="shield-checkmark"
                text="Secure & Ad-Free"
                selectorKey="secure"
              />
            </View>
          </Animated.View>
        </View>

        {/* Floating Next Button */}
        <Animated.View
          style={[styles.buttonContainer, { opacity: fadeAnim }]}
          {...webDomProps("home-next-container", "home-next-container")}
        >
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.8}
            onPress={goToOverview}
            {...webDomProps("home-next-button", "home-next-button")}
          >
            <LinearGradient
              colors={appTheme.gradients.primary}
              style={styles.gradientButton}
              {...webDomProps("home-next-gradient", "home-next-gradient")}
            >
              <Ionicons
                name="arrow-forward"
                size={24}
                color={appTheme.colors.textOnLight}
              />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}
