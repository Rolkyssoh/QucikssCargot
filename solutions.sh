1 - failed to connect to localhost/127.0.0.1 react native : https://stackoverflow.com/questions/49206456/react-native-android-connect-backend-service-at-localhost 
2 - get pc ip address : ip addr show
3 - adb reverse tcp:3000 tcp:3000 : identifier le divice
4 - adb kill-server : remettre tout à zero
5- get the SHA keys: cd android && ./gradlew signingReport
6 - ./gradlew assembleDebug : create a Debug apk