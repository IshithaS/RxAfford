import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <View style={styles.overlay}>
          <View style={styles.scanBox} />
          <Text style={styles.instructionText}>Center the pill imprint in the box</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton} onPress={() => alert("Snap! Ready for OCR integration.")}>
            <Text style={styles.buttonText}>Scan Imprint</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  message: { textAlign: 'center', padding: 20, color: 'white', fontSize: 16 },
  camera: { flex: 1 },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanBox: { width: 250, height: 100, borderWidth: 3, borderColor: '#3b82f6', borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)' },
  instructionText: { color: 'white', marginTop: 16, fontSize: 16, fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.5)', padding: 8, borderRadius: 8 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 40, paddingHorizontal: 20 },
  cancelButton: { backgroundColor: '#ef4444', padding: 16, borderRadius: 12, minWidth: 120, alignItems: 'center' },
  scanButton: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, minWidth: 160, alignItems: 'center' },
  buttonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
});