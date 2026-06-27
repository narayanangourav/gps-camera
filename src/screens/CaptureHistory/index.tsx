import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { webDomProps } from "../../logics/webDom.logic";
import { useCaptureHistoryLogic } from "../../logics/captureHistory.logic";
import { useStyles } from "./styles";

export default function CaptureHistoryScreen() {
  const styles = useStyles();
  const logic = useCaptureHistoryLogic();

  return (
    <SafeAreaView
      style={styles.container}
      {...webDomProps("capture-history-screen", "capture-history-screen")}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.backButtonWrap} onPress={logic.goBack}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Capture History</Text>
            <Text style={styles.subtitle}>
              Session-only capture history stored in this browser tab.
            </Text>
          </View>
          {logic.captureHistory.length > 0 ? (
            <TouchableOpacity
              style={styles.clearButtonWrap}
              onPress={logic.clearCaptureHistory}
            >
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {logic.captureHistory.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No captures in this session yet.</Text>
          </View>
        ) : (
          logic.captureHistory.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
              <Text style={styles.cardTitle}>{item.projectName}</Text>
              <Text style={styles.cardMeta}>
                {new Date(item.createdAt).toLocaleString()}
              </Text>
              {item.locationLabel ? (
                <Text style={styles.cardMeta}>{item.locationLabel}</Text>
              ) : null}
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => logic.openCapture(item.uri)}
                >
                  <Text style={styles.actionText}>Open</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    logic.downloadCapture(item.uri, item.projectName, item.createdAt)
                  }
                >
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
                {logic.shareSupported ? (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() =>
                      void logic.shareHistoryCapture(
                        item.uri,
                        item.projectName,
                        item.createdAt,
                      )
                    }
                  >
                    <Text style={styles.actionText}>Share</Text>
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => logic.removeCaptureHistoryItem(item.id)}
                >
                  <Text style={styles.actionText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
