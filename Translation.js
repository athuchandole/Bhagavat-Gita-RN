export default function Translation({ translation, color, selectedLang, setSelectedLang }) {
    const tabs = ['Sanskrit', 'Hindi', 'English'];

    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: color.h1 }]}>🔍 Translation</Text>

            <View style={styles.pillsContainer}>
                {tabs.map((tab, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.pill,
                            {
                                backgroundColor:
                                    selectedLang === tab ? color.primary : color.surface,
                            },
                        ]}
                        onPress={() => setSelectedLang(tab)}
                    >
                        <Text
                            style={[
                                styles.pillText,
                                {
                                    color: selectedLang === tab ? color.onPrimary : color.primary,
                                },
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.card, { backgroundColor: color.surface, shadowColor: color.text }]}>
                <Text style={[styles.content, { color: color.text }]}>
                    {translation || 'No translation available.'}
                </Text>
            </View>
        </View>
    );
}
