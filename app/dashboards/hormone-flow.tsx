import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import CircularProgress from '@/components/CircularProgress';
import { colors, typography, spacing, borderRadius } from '@/constants/theme';

export default function HormoneFlowDashboard() {
  const router = useRouter();
  const score = 40;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color={colors.nude.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Hormone Flow</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.card}>
        <CircularProgress progress={score} size={180} strokeWidth={12} label={`${score}%`} subLabel="Unstable" color={colors.reproductive.uterus} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's influencing this</Text>
        <View style={styles.listItem}><Text style={styles.bullet}>🌿</Text><Text style={styles.listText}>Cortisol spikes due to stress</Text></View>
        <View style={styles.listItem}><Text style={styles.bullet}>🍫</Text><Text style={styles.listText}>Blood sugar variability</Text></View>
        <View style={styles.listItem}><Text style={styles.bullet}>😴</Text><Text style={styles.listText}>Inconsistent sleep rhythm</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today’s rituals</Text>
        <View style={styles.tip}><Text style={styles.tipText}>🫖 Magnesium + chamomile in the evening</Text></View>
        <View style={styles.tip}><Text style={styles.tipText}>🚶‍♀️ 15-min calming walk post-lunch</Text></View>
        <View style={styles.tip}><Text style={styles.tipText}>🧘‍♀️ 5-min breathing before bed</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.nude.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: spacing.lg, paddingHorizontal: spacing.lg, paddingBottom: spacing.md },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  title: { fontFamily: typography.fontFamily.semibold, fontSize: typography.size.lg, color: colors.nude.text },
  card: { backgroundColor: colors.nude.card, borderRadius: borderRadius.lg, margin: spacing.lg, padding: spacing.lg, alignItems: 'center' },
  section: { backgroundColor: colors.nude.card, borderRadius: borderRadius.lg, marginHorizontal: spacing.lg, marginBottom: spacing.lg, padding: spacing.lg },
  sectionTitle: { fontFamily: typography.fontFamily.semibold, fontSize: typography.size.base, color: colors.nude.text, marginBottom: spacing.sm },
  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  bullet: { fontSize: 16, marginRight: spacing.sm },
  listText: { fontFamily: typography.fontFamily.regular, fontSize: typography.size.sm, color: colors.nude.text },
  tip: { backgroundColor: colors.nude.background, borderRadius: borderRadius.md, padding: spacing.sm, marginTop: spacing.xs },
  tipText: { fontFamily: typography.fontFamily.medium, fontSize: typography.size.sm, color: colors.nude.text },
});


