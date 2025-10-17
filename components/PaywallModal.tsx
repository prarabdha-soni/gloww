import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PLANS, PlanId, setActivePlanId } from '@/services/subscription';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function PaywallModal({ visible, onClose }: Props) {
  const handleSelect = async (plan: PlanId) => {
    await setActivePlanId(plan);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Text style={styles.title}>Unlock Gloww+</Text>
          <Text style={styles.subtitle}>Learn without limits and get your AI Glow Coach</Text>

          {(['free','gloww_plus','gloww_pro'] as PlanId[]).map((id) => {
            const plan = PLANS[id];
            return (
              <TouchableOpacity key={id} style={styles.planCard} onPress={() => handleSelect(id)}>
                <View>
                  <Text style={styles.planTitle}>{plan.title}</Text>
                  <Text style={styles.price}>{plan.priceLabel}</Text>
                </View>
                <View style={styles.benefits}>
                  {plan.benefits.map((b) => (
                    <Text key={b} style={styles.benefit}>• {b}</Text>
                  ))}
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Not now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'flex-end' },
  sheet: { backgroundColor:'#FFF', borderTopLeftRadius:20, borderTopRightRadius:20, padding:16, maxHeight:'85%' },
  title: { fontSize:20, fontWeight:'700', color:'#3C2E2B', marginBottom:4 },
  subtitle: { fontSize:14, color:'#6B5B73', marginBottom:12 },
  planCard: { backgroundColor:'#F4EEE9', borderRadius:16, padding:12, marginBottom:10 },
  planTitle: { fontSize:16, fontWeight:'700', color:'#3C2E2B' },
  price: { fontSize:14, color:'#DABBB0', marginBottom:8 },
  benefits: { gap:4 },
  benefit: { color:'#3C2E2B' },
  closeBtn: { alignSelf:'center', padding:8, marginTop:8 },
  closeText: { color:'#DABBB0', fontWeight:'600' },
});


