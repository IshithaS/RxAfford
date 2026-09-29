import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    
    setLoading(true);
    setResult(null);

    try {
      // This calls the National Library of Medicine database
      const response = await fetch(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${query}`);
      const data = await response.json();

      // Check if we got drug data back
      const drugGroup = data.drugGroup?.conceptGroup;
      
      if (drugGroup) {
        setResult(`✅ Success! Found official medical records for "${query}".`);
      } else {
        setResult(`❌ No exact match found for "${query}". Check spelling.`);
      }
    } catch (error) {
      setResult('⚠️ Error connecting to the database.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RxAfford</Text>
      <Text style={styles.subtitle}>Identify pills and find affordable options</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a drug name (e.g., Tylenol, Lisinopril)"
          value={query}
          onChangeText={setQuery}
          placeholderTextColor="#888"
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSearch} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Searching...' : 'Search Database'}</Text>
        </TouchableOpacity>

        {/* This box only shows up if we have a result from the API */}
        {result && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
  },
  searchContainer: {
    width: '100%',
    maxWidth: 420,
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    outlineStyle: 'none', 
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#dbeafe',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  resultText: {
    fontSize: 16,
    color: '#1e3a8a',
    textAlign: 'center',
    fontWeight: '500',
  },
});