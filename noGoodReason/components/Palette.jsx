import { View, Text, Modal, Pressable, StyleSheet} from 'react-native'
import React from 'react'

export default function Palette( {color, setColor, onClose} ) {
    const colors = ['#ADD8E6', '#FBCEB1', '#C1E1C1', '#FFECB3'];
    

  return (
    <Modal
        visible={true}
        transparent
        onRequestClose={onClose}
      >
      <Pressable style={styles.modalContainer} onPress={onClose}>
        <View style={styles.colorsCont} onStartShouldSetResponder={() => true}>
          <View style={styles.row}>
             {colors.map((swatchColor) => (
                          <Pressable
                            key={swatchColor}
                            onPress={() => setColor(swatchColor)}
                            style={[
                              styles.swatch,
                              { backgroundColor: swatchColor },
                              color === swatchColor && styles.selectedSwatch
                            ]}
                          />
                        ))}
                        </View>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      alignItems: "center",
      shadowOpacity: 200,
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      justifyContent: "center",
    },

      colorsCont: {
        borderRadius: 5,
        alignItems: "center",
        width: '70%',
        backgroundColor: "white",
        shadowOpacity: 1,
        padding: 10,
      },

        swatchContainer: {
        flexDirection: "row",
      },

      swatch: {
        width: 20,
        height: 20,
        borderRadius: 5,
        marginHorizontal: 5,
      },
    
      selectedSwatch: {
        borderWidth: 2,
        borderColor: '#007AFF',
      },

      row: {
        flexDirection:"row",
        justifyContent: "space-between",
    },

}) 
