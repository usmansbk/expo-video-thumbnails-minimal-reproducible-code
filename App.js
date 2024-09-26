import { useCallback, useState } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

const videoUri =
  "https://github.com/user-attachments/assets/ec9a7752-6d21-43ae-a635-6205d3374db1";

export default function App() {
  const [error, setError] = useState(null);
  const [uri, setUri] = useState(null);

  const onPress = useCallback(async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri);
      setUri(uri);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>{videoUri}</Text>
      {error && (
        <Text
          selectable
          style={{
            marginVertical: 8,
            color: "red",
          }}
        >
          {error.message}
        </Text>
      )}
      {uri && <Image source={{ uri }} style={styles.image} />}
      <Button title="Generate Thumbnail" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
