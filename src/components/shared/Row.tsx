import { View, Text } from 'react-native'
import React from 'react'

const Row = ({children}: React.PropsWithChildren): JSX.Element => {
  return (
    <View style={{flexDirection: 'row', columnGap:15}}>
      {children}
    </View>
  )
}



export default Row