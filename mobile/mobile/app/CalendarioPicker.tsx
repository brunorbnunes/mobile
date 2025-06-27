import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import axios from "axios";
import { authStyles } from "../assets/styles/auth.styles";
import { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.CALENDARIO;

interface Calendario {
  calendario_id: number;
  data: string;
}

interface CalendarioPickerProps {
  turmaId: string;
  onSelect: (id: number) => void;
  value: number | string;
}

export default function CalendarioPicker({ turmaId, onSelect, value }: CalendarioPickerProps) {
  const [datas, setDatas] = useState<Calendario[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!turmaId) return;
    setLoading(true);
    axios.get(`${API_URL}/calendario/${turmaId}`)
      .then(res => {
        setDatas(res.data);
        setErro("");
      })
      .catch(() => setErro("Erro ao buscar datas."))
      .finally(() => setLoading(false));
  }, [turmaId]);

  if (!turmaId) return <Text>Selecione uma turma primeiro.</Text>;
  if (loading) return <ActivityIndicator />;
  if (erro) return <Text>{erro}</Text>;
  if (!datas.length) return <Text>Nenhuma data cadastrada para esta turma.</Text>;

  return (
    <View style={authStyles.pickerContainer}>
      {datas.map((c) => (
        <Button
          key={c.calendario_id}
          title={c.data}
          color={value === c.calendario_id ? 'green' : undefined}
          onPress={() => onSelect(c.calendario_id)}
        />
      ))}
    </View>
  );
}
