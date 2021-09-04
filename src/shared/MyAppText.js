import React from 'react'
import {
    Text,
} from 'react-native'
export default function MyAppHeader(props) {
    let fontFamily = props.bold ? 'ComicNeue-Bold' : 'ComicNeue-Regular'
    let fontSize = props.isTitle ? 20 : 16
    return (
        <Text style={[
            { fontFamily: fontFamily, fontSize: fontSize },
            props.style,
        ]}>
            {props.children}
        </Text>
    )
}