import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SeedBlank() {
    return (
        <View style={styles.container}> {/* 중앙 정렬을 위한 container 추가 */}
            <View style={styles.seedBox}>
                <Image
                    source={require('../../assets/icons/seedblank.png')} // 씨드 관련 이미지
                    style={styles.seedImage}
                />
                <View style={styles.seedContent}>
                    <Text style={styles.seedText}>
                        씨드를 {'\n'}추가해보세요!
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '50%',
    },
    seedImage: {
        width: 108,
        height: 108,
        marginBottom: 10,
        alignSelf: 'center',
    },
    seedBox: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
    },
    seedContent: {
        alignItems: 'center',
    },
    seedText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
});