#!/bin/sh

# sh release.sh 1.0.0 plasutil

APPVERSION_DEFAULT="6.0.0"
APPNAME_DEFAULT="linksmedicus"

APPVERSION=${1:-$APPVERSION_DEFAULT}
APPNAME=${2:-$APPNAME_DEFAULT}
APKSIGNNAME="keystorelinksmedicus"

echo "Generating App: ${APPNAME} v${APPVERSION}"
echo "..."

#npm run ionic:build --prod

echo "Generating iOS IPA"
#cordova build ios --release
#ionic cordova build ios --prod --release

echo "Generating Android APK"
#cordova build android --release
ionic cordova build android --prod --release

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore cert/"$APPNAME".keystore platforms/android/build/outputs/apk/android-release-unsigned.apk "$APKSIGNNAME"
zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk release/"$APPNAME"-"$APPVERSION".apk

