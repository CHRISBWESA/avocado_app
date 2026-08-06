import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {runPrediction} from '../ml/session';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const processImage = useCallback(
    (uri: string, base64?: string) => {
      if (!base64) {
        Alert.alert('Error', 'No image data received');
        return;
      }

      setAnalyzing(true);
      setImageUri(uri);
      setResult(null);

      runPrediction(base64, 'image/jpeg')
        .then(prediction => setResult(prediction))
        .catch(e => Alert.alert('Error', e.message))
        .finally(() => setAnalyzing(false));
    },
    [],
  );

  const selectImage = async (useCamera: boolean) => {
    const options = {
      mediaType: 'photo' as const,
      quality: 1 as const,
      maxWidth: 1024,
      maxHeight: 1024,
      includeBase64: true,
    };

    try {
      const launcher = useCamera ? launchCamera : launchImageLibrary;
      const response = await launcher(options);

      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Failed to pick image');
        return;
      }

      if (response.assets && response.assets[0]?.uri && response.assets[0]?.base64) {
        processImage(response.assets[0].uri, response.assets[0].base64);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Failed to select image: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.badge}>COMPUTER VISION ENGINE</Text>
        <Text style={styles.title}>Avocado Intelligence</Text>
        <Text style={styles.subtitle}>
          Upload or capture an image of an avocado to run maturity assessment.
        </Text>
      </View>

      {imageUri ? (
        <Image source={{uri: imageUri}} style={styles.preview} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>🥑</Text>
          <Text style={styles.placeholderText}>Select an image</Text>
          <Text style={styles.placeholderHint}>Camera or Gallery</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => selectImage(true)}
          disabled={loading || analyzing}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.galleryButton]}
          onPress={() => selectImage(false)}
          disabled={loading || analyzing}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>

      {analyzing && (
        <View style={styles.statusBox}>
          <ActivityIndicator size="small" color="#27ae60" />
          <Text style={styles.statusText}>Analyzing avocado...</Text>
        </View>
      )}

      {result && (
        <View
          style={[
            styles.resultBox,
            result.code === 'iva' ? styles.resultRipe : styles.resultUnripe,
          ]}>
          <View style={styles.resultHeader}>
            <View
              style={[
                styles.badge2,
                result.code === 'iva' ? styles.badgeRipe : styles.badgeUnripe,
              ]}>
              <Text style={styles.badgeText}>{result.hali}</Text>
            </View>
            <Text style={styles.confidence}>Confidence: {result.uhakika}</Text>
          </View>
          <Text style={styles.description}>{result.maelezo}</Text>
        </View>
      )}

      <Text style={styles.footer}>
        Automated Crop Quality Estimation Dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#1e293b',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 12,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
  placeholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#fafafa',
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#cbd5e1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  placeholderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  placeholderHint: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 6,
  },
  preview: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cameraButton: {
    backgroundColor: '#27ae60',
  },
  galleryButton: {
    backgroundColor: '#1e293b',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
  },
  statusText: {
    fontSize: 14,
    color: '#64748b',
  },
  resultBox: {
    width: '100%',
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
  },
  resultRipe: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: 'rgba(39,174,96,0.2)',
  },
  resultUnripe: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.15)',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  badge2: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 30,
  },
  badgeRipe: {
    backgroundColor: '#27ae60',
  },
  badgeUnripe: {
    backgroundColor: '#ef4444',
  },
  badgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  confidence: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  description: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 22,
  },
  footer: {
    marginTop: 24,
    fontSize: 11,
    color: '#64748b',
    letterSpacing: 0.5,
  },
});