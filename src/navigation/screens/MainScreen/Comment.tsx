import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Comment} from '../../../appTypes/comment';
import {useAppDispatch, useAppSelector} from '../../../store';
import {deleteComment} from '../../../store/features/commentsSlice';
import {ReplayInput} from './ReplayInput';

interface CommentComponentProps {
  data: Comment;
}

const LEVEL_MARGIN_LEFT_OFFSET = 20;

export function CommentComponent({data}: CommentComponentProps) {
  const dispatch = useAppDispatch();

  const userName = useAppSelector(state => state.user.info.name);

  const [isReplayInputShow, setIsReplayInputShow] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {marginLeft: LEVEL_MARGIN_LEFT_OFFSET * data?.level},
      ]}>
      <View style={styles.titleContainer}>
        <Text style={styles.name}>{data.authorId}</Text>
        <Text style={styles.name}>{data.createdAt}</Text>
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.content}>{data.content}</Text>
      </View>
      {isReplayInputShow ? (
        <ReplayInput
          parentId={data.id}
          onClosePress={() => setIsReplayInputShow(false)}
        />
      ) : (
        <View style={styles.buttonsWrapper}>
          <Pressable
            onPress={() => setIsReplayInputShow(true)}
            style={[styles.button, styles.replayButton]}>
            <Text style={styles.buttonText}>Replay</Text>
          </Pressable>
          {userName === data.authorId && (
            <Pressable
              onPress={() => dispatch(deleteComment(data.id))}
              style={[styles.button, styles.deleteButton]}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  titleContainer: {
    backgroundColor: 'grey',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: 'black',
  },
  content: {
    color: 'black',
  },
  contentWrapper: {
    borderColor: 'grey',
    borderLeftWidth: 2,
    padding: 5,
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  button: {
    width: 80,
    height: 30,
    justifyContent: 'center',
  },
  replayButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
