import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../../store';
import {addComment} from '../../../store/features/commentsSlice';

interface ReplayInputProps {
  parentId: number | null;
  onClosePress?: () => void;
}

export function ReplayInput({parentId, onClosePress}: ReplayInputProps) {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(state => state.user.info.name);

  const [replay, setReplay] = useState('');

  const handelReplayPress = useCallback(() => {
    dispatch(addComment({parentId, content: replay, authorId: userName}));
    setReplay('');
    onClosePress && onClosePress();
  }, [dispatch, parentId, replay, userName, onClosePress]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Replay"
        value={replay}
        onChangeText={setReplay}
      />
      <View style={styles.buttonsWrapper}>
        <Pressable
          style={[
            styles.button,
            !replay ? styles.buttonDisabled : styles.buttonReplay,
          ]}
          disabled={!replay}
          onPress={handelReplayPress}>
          <Text style={styles.buttonText}>{parentId ? 'Replay' : 'Add'}</Text>
        </Pressable>
        {onClosePress && (
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={onClosePress}>
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    padding: 5,
    borderWidth: 2,
    borderColor: 'grey',
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  button: {
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonReplay: {
    backgroundColor: 'blue',
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  buttonClose: {
    backgroundColor: 'pink',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
  },
});
