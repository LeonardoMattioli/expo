import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'

export default function Home() {
  const [todos, setTodos] = useState<any>(null);


  const handleSignout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('todos').select();
      setTodos(data);
    };

    getData();
  }, []);

  return (
    <View testID='home-screen'>
      <View>{todos ? (<Text testID='todos'>{JSON.stringify(todos, null, 2)}</Text>) : (<Text>Loading todos...</Text>)}</View>
      <Button testID='Out-button' title="Signout" onPress={handleSignout} />
    </View>
  );
}