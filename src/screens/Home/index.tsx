import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Image,
} from "react-native";
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
        <View
          style={styles.content}
          {...webDomProps("home-content", "home-content")}
        >
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
                source={require("../../../assets/app-logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
                {...webDomProps("home-logo", "home-logo")}
              />
            </View>

            <Text
              style={styles.title}
              {...webDomProps("home-title", "home-title")}
            >
              GPS Camera
            </Text>
            <Text style={styles.eyebrow}>Web-only field capture</Text>
            <Text
              style={styles.subtitle}
              {...webDomProps("home-subtitle", "home-subtitle")}
            >
              Clean browser-based photo capture with GPS, OpenStreetMap,
              timestamp overlays, and export-ready evidence shots.
            </Text>

            <View
              style={styles.featurePanel}
              {...webDomProps("home-feature-list", "home-feature-list")}
            >
              <FeatureItem
                icon="map"
                text="OpenStreetMap-first location stamping"
                selectorKey="map"
              />
              <FeatureItem
                icon="navigate"
                text="Manual or live coordinate modes"
                selectorKey="time"
              />
              <FeatureItem
                icon="share-social"
                text="Browser download and Web Share support"
                selectorKey="secure"
              />
            </View>

            <TouchableOpacity
              style={styles.primaryAction}
              activeOpacity={0.88}
              onPress={goToOverview}
              {...webDomProps("home-next-button", "home-next-button")}
            >
              <LinearGradient
                colors={appTheme.gradients.primary}
                style={styles.primaryActionGradient}
                {...webDomProps("home-next-gradient", "home-next-gradient")}
              >
                <Text style={styles.primaryActionText}>Open Workspace</Text>
                <Ionicons
                  name="arrow-forward"
                  size={20}
                  color={appTheme.colors.textOnDark}
                />
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.metaNote}>
              Requires browser camera and location permission. Designed for web
              export and GitHub Pages hosting.
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
