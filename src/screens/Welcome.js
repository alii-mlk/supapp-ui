import React from 'react'
import { View } from 'react-native'

export default function Welcome() {
    return (
        <View>
            <Text>welcome</Text>
            <Image source={require('../assets/images/welcome.jpg')} />
        </View>
    )
}
