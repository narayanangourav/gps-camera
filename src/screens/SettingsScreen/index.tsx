import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { useSettingsLogic } from "../../logics/settings.logic";
import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStyles } from "./styles";

export default function SettingsScreen() {
  const styles = useStyles();
  const { version, expandedId, sortedItems, toggleExpand, goBack } =
    useSettingsLogic();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("settings-screen", "settings-screen")}
    >
      <LinearGradient
        colors={appTheme.gradients.screen}
        style={StyleSheet.absoluteFill}
        {...webDomProps("settings-background", "settings-background")}
      />

      <View style={styles.header} {...webDomProps("settings-header", "settings-header")}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={goBack}
          {...webDomProps("settings-back-button", "settings-back-button")}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={appTheme.colors.textPrimary}
          />
        </TouchableOpacity>
        <Text
          style={styles.headerTitle}
          {...webDomProps("settings-header-title", "settings-header-title")}
        >
          Settings
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <View
        style={styles.body}
        {...webDomProps("settings-body", "settings-body")}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          {...webDomProps("settings-scroll", "settings-scroll")}
        >
          <View style={styles.menuGroup} {...webDomProps("settings-menu-group", "settings-menu-group")}>
            {sortedItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              return (
                <View
                  key={item.id}
                  {...webDomProps(
                    `settings-item-${item.id}`,
                    "settings-item-wrapper",
                  )}
                >
                  <TouchableOpacity
                    style={[
                      styles.menuItem,
                      index !== sortedItems.length - 1 &&
                        !isExpanded &&
                        styles.menuItemBorder,
                    ]}
                    onPress={() => toggleExpand(item.id)}
                    activeOpacity={0.7}
                    {...webDomProps(
                      `settings-item-button-${item.id}`,
                      "settings-item-button",
                    )}
                  >
                    <View
                      style={[
                        styles.iconBox,
                        { backgroundColor: item.color + "20" },
                      ]}
                      {...webDomProps(
                        `settings-item-icon-box-${item.id}`,
                        "settings-item-icon-box",
                      )}
                    >
                      <Ionicons
                        name={item.icon as any}
                        size={22}
                        color={item.color}
                      />
                    </View>
                    <View
                      style={styles.textContainer}
                      {...webDomProps(
                        `settings-item-text-${item.id}`,
                        "settings-item-text-container",
                      )}
                    >
                      <Text
                        style={styles.itemTitle}
                        {...webDomProps(
                          `settings-item-title-${item.id}`,
                          "settings-item-title",
                        )}
                      >
                        {item.title}
                      </Text>
                      {item.subtitle && (
                        <Text
                          style={styles.itemSubtitle}
                          {...webDomProps(
                            `settings-item-subtitle-${item.id}`,
                            "settings-item-subtitle",
                          )}
                        >
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                    <Ionicons
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={20}
                      color={appTheme.colors.textMuted}
                    />
                  </TouchableOpacity>

                  {isExpanded && (
                    <View
                      style={[
                        styles.detailsContainer,
                        index !== sortedItems.length - 1 && styles.menuItemBorder,
                      ]}
                      {...webDomProps(
                        `settings-item-details-${item.id}`,
                        "settings-item-details",
                      )}
                    >
                      <Text
                        style={styles.detailsText}
                        {...webDomProps(
                          `settings-item-details-text-${item.id}`,
                          "settings-item-details-text",
                        )}
                      >
                        {item.details}
                      </Text>
                      <TouchableOpacity
                        style={[styles.actionButton, { borderColor: item.color }]}
                        onPress={item.action}
                        {...webDomProps(
                          `settings-item-action-${item.id}`,
                          "settings-item-action",
                        )}
                      >
                        <Text
                          style={[styles.actionButtonText, { color: item.color }]}
                          {...webDomProps(
                            `settings-item-action-text-${item.id}`,
                            "settings-item-action-text",
                          )}
                        >
                          {item.actionLabel}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <View
            style={styles.versionContainer}
            {...webDomProps("settings-version-container", "settings-version-container")}
          >
            <Text
              style={styles.versionText}
              {...webDomProps("settings-version-text", "settings-version-text")}
            >
              Version {version}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
