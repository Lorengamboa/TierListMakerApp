import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './styles'

/**
 * @description
 */
const Spinner = props => {
    return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" />
        </View>
    )
}

export default Spinner;
