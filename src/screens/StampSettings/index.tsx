import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { appTheme } from "../../logics/theme.logic";
import { webDomProps } from "../../logics/webDom.logic";
import { useStampSettingsLogic } from "../../logics/stampSettings.logic";
import { useStyles } from "./styles";

export default function StampSettingsScreen() {
  const styles = useStyles();
  const logic = useStampSettingsLogic();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("stamp-settings-screen", "stamp-settings-screen")}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={logic.goBack} style={styles.backButtonWrap}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Stamp Settings</Text>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Capture timer</Text>
          <View style={styles.row}>
            {logic.timerOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  logic.timerSeconds === option && styles.optionButtonActive,
                ]}
                onPress={() => logic.setTimerSeconds(option)}
              >
                <Text style={styles.optionButtonText}>
                  {option === 0 ? "Off" : `${option}s`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Capture feedback</Text>
          <Text style={styles.sectionHint}>
            Browser sound feedback depends on user interaction and browser
            support.
          </Text>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={logic.toggleCameraSound}
          >
            <Text style={styles.toggleButtonText}>
              {logic.cameraSoundEnabled ? "Sound enabled" : "Sound disabled"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Project or site</Text>
          <View style={styles.row}>
            {logic.quickProjectNames.map((name) => (
              <TouchableOpacity
                key={name}
                style={[
                  styles.optionButton,
                  logic.selectedProjectName === name &&
                    styles.optionButtonActive,
                ]}
                onPress={() => logic.applyProjectName(name)}
              >
                <Text style={styles.optionButtonText}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            value={logic.customProjectName}
            onChangeText={logic.setCustomProjectName}
            style={styles.input}
            placeholder="Custom project name"
            placeholderTextColor={appTheme.colors.textMuted}
          />
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => logic.applyProjectName(logic.customProjectName)}
          >
            <Text style={styles.toggleButtonText}>Apply project name</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Stamp fields</Text>
          <Text style={styles.sectionHint}>
            Enable only the fields that should appear in the captured photo.
          </Text>
          {logic.stampFields.map((field) => (
            <TouchableOpacity
              key={field.key}
              style={styles.fieldRow}
              onPress={() => logic.toggleStampField(field.key)}
            >
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <Text style={styles.fieldState}>{field.enabled ? "On" : "Off"}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
