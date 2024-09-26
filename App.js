import { useCallback, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import * as VideoThumbnails from "expo-video-thumbnails";

const defaultVideoUri =
  "https://github.com/user-attachments/assets/ec9a7752-6d21-43ae-a635-6205d3374db1";

export default function App() {
  const [videoUri, setVideoUri] = useState(defaultVideoUri);
  const [imageUri, setImageUri] = useState(null);
  const [error, setError] = useState(null);

  const onPress = useCallback(async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri);
      setImageUri(uri);
    } catch (e) {
      console.warn(e);
      setError(e);
    }
  }, [videoUri]);

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={styles.container}
    >
      <Text>Paste video URL:</Text>
      <TextInput
        style={styles.input}
        multiline
        value={videoUri}
        onChangeText={setVideoUri}
      />
      {error && (
        <Text selectable style={styles.error}>
          {error.message}
        </Text>
      )}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Generate Thumbnail" onPress={onPress} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  error: {
    color: "red",
    marginVertical: 8,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
});
