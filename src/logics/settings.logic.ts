import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { useMemo, useState } from "react";
import {
  Alert,
  LayoutAnimation,
  Linking,
  Platform,
  Share,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export type SettingsMenuItem = {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  details: string;
  actionLabel: string;
  action: () => void;
  color: string;
};

export function useSettingsLogic() {
  const navigation = useNavigation<any>();
  const version = Constants.expoConfig?.version || "1.0.0";
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out this amazing GPS Camera app! Capture photos and videos with location tags.",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openLink = (_url: string) => {
    Alert.alert("Coming Soon", "This page is under construction.");
  };

  const handleSupport = () => {
    Linking.openURL("mailto:support@gpscamera.app");
  };

  const menuItems: SettingsMenuItem[] = useMemo(
    () => [
      {
        id: "no-ads",
        icon: "shield-checkmark",
        title: "No Ads",
        subtitle: "Enjoy a completely ad-free experience",
        details:
          "This application is built to be a premium tool. We believe in an uninterrupted experience, which is why you will never see third-party advertisements clogging your view or tracking your usage. Focus entirely on your photography without distractions.",
        actionLabel: "Learn More",
        action: () =>
          Alert.alert("Premium Status", "You are using the Ad-Free version."),
        color: "#4caf50",
      },
      {
        id: "privacy",
        icon: "lock-closed",
        title: "Privacy Policy",
        subtitle: "Read our data usage policy",
        details:
          "Your privacy is paramount. All GPS data and photos are processed locally on your device. We do not upload your media to any cloud servers without your explicit action. Location data is collected strictly for the purpose of stamping your photos and videos with accurate coordinates.",
        actionLabel: "Read Full Policy",
        action: () => openLink("https://example.com/privacy"),
        color: "#4DACFF",
      },
      {
        id: "share",
        icon: "share-social",
        title: "Share App",
        subtitle: "Spread the word with friends",
        details:
          "Love the app? Share it with your friends and colleagues! This tool generates a direct download link or store listing so others can enjoy the same precise, ad-free GPS camera experience. Sharing helps us grow and improve.",
        actionLabel: "Share Now",
        action: handleShare,
        color: "#A0CFFF",
      },
      {
        id: "support",
        icon: "mail",
        title: "Support",
        subtitle: "Get help or send feedback",
        details:
          "We are here to help. Whether you've found a bug, want to request a feature, or just want to say hi, our support team is available. We aim to respond to all inquiries within 24 hours.",
        actionLabel: "Email Support",
        action: handleSupport,
        color: "#FF5252",
      },
      {
        id: "terms",
        icon: "document-text",
        title: "Terms of Service",
        subtitle: "Review our terms of usage",
        details:
          "By using this application, you agree to our standard terms of service. These terms ensure fair usage and protect your rights as a user. We recommend reading them to understand your responsibilities and our commitments to you.",
        actionLabel: "View Terms",
        action: () => openLink("https://example.com/terms"),
        color: "#B0B0E0",
      },
    ],
    [],
  );

  const sortedItems = useMemo(
    () => [...menuItems].sort((a, b) => a.title.localeCompare(b.title)),
    [menuItems],
  );

  const goBack = () => {
    navigation.goBack();
  };

  return {
    version,
    expandedId,
    sortedItems,
    toggleExpand,
    goBack,
  };
}

