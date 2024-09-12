import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {fetchComments} from '../../../store/features/commentsSlice';
import {useAppDispatch, useAppSelector} from '../../../store';
import {Comment} from '../../../appTypes/comment';
import {CommentComponent} from './Comment';
import {ReplayInput} from './ReplayInput';

const COMMENTS_PER_PAGE = 25;

export function MainScreen() {
  const dispatch = useAppDispatch();
  const {list, loading} = useAppSelector(state => state.comments);

  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedComments, setPaginatedComments] = useState<Comment[]>([]);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
    const endIndex = startIndex + COMMENTS_PER_PAGE;
    setPaginatedComments(list.slice(startIndex, endIndex));
  }, [currentPage, list]);

  const handleNextPage = useCallback(() => {
    if (currentPage * COMMENTS_PER_PAGE < list.length) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, list.length]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {paginatedComments.map(comment => (
            <CommentComponent key={comment.id} data={comment} />
          ))}
        </>
      )}
      <ReplayInput parentId={null} />
      <View style={styles.paginationContainer}>
        <Pressable onPress={handlePreviousPage} disabled={currentPage === 1}>
          <Text style={styles.paginationText}>Previous</Text>
        </Pressable>
        <Text style={styles.paginationText}>Page #{currentPage}</Text>
        <Pressable
          onPress={handleNextPage}
          disabled={currentPage * COMMENTS_PER_PAGE >= list.length}>
          <Text style={styles.paginationText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
    justifyContent: 'space-around',
  },
  paginationText: {
    color: 'black',
    fontSize: 18,
  },
});
