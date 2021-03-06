import React, { useCallback, useState } from "react";
import {
  InfiniteLoader,
  AutoSizer,
  WindowScroller,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import Post from "../Feed/Post";
import Loader from "components/Feed/StyledLoader";
import GTM from "constants/gtm-tags";

const cellMeasurerCache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 380,
});
const Activity = ({
  postDispatch,
  filteredPosts,
  updateComments,
  user,
  handlePostDelete,
  handleEditPost,
  handleCancelPostDelete,
  postDelete,
  deleteModalVisibility,
  loadNextPage,
  isNextPageLoading,
  itemCount,
  isItemLoaded,
  hasNextPage,
  totalPostCount,
  isProfile,
  gtmIdPost,
}) => {
  const posts = Object.entries(filteredPosts);
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;
  const [hiddenPosts, setHiddenPosts] = useState(
    JSON.parse(localStorage.getItem("hiddenPosts")) || {},
  );

  const hidePost = useCallback(
    (postId) => {
      localStorage.setItem(
        "hiddenPosts",
        JSON.stringify({ ...hiddenPosts, [postId]: true }),
      ); // objects are fast, better than looking for postId in an Array
      setHiddenPosts({ ...hiddenPosts, [postId]: true });
    },
    [hiddenPosts],
  );

  const unhidePost = useCallback(
    (postId) => {
      localStorage.setItem(
        "hiddenPosts",
        JSON.stringify({ ...hiddenPosts, [postId]: null }),
      );
      setHiddenPosts({ ...hiddenPosts, [postId]: null });
    },
    [hiddenPosts],
  );

  const postItem = useCallback(
    ({ key, index, style, parent }) => {
      let content;
      if (!isItemLoaded(index) && hasNextPage) {
        content = <Loader />;
      } else if (posts[index]) {
        content = (
          <Post
            postDispatch={postDispatch}
            currentPost={posts[index][1]}
            updateComments={updateComments}
            postDelete={postDelete}
            user={user}
            deleteModalVisibility={deleteModalVisibility}
            onChange={handlePostDelete}
            handleCancelPostDelete={handleCancelPostDelete}
            onSelect={handleEditPost}
            gtmPrefix={GTM.profile.viewProfilePrefix}
            isHidden={hiddenPosts[posts[index][1]?._id]}
            onPostHide={hidePost}
            onPostUnhide={unhidePost}
            convertTextToURL={false}
            isProfile={isProfile}
            gtmIdPost={gtmIdPost}
          />
        );
      }
      return (
        <CellMeasurer
          key={key}
          cache={cellMeasurerCache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          {({ measure, registerChild }) => (
            <div key={key} ref={registerChild} onLoad={measure} style={style}>
              {content}
            </div>
          )}
        </CellMeasurer>
      );
    },
    [
      deleteModalVisibility,
      gtmIdPost,
      handleCancelPostDelete,
      handleEditPost,
      handlePostDelete,
      hasNextPage,
      hiddenPosts,
      hidePost,
      isItemLoaded,
      isProfile,
      postDelete,
      postDispatch,
      posts,
      unhidePost,
      updateComments,
      user,
    ],
  );

  return (
    <div className="activity">
      {!posts.length && isNextPageLoading ? (
        <Loader />
      ) : (
        <WindowScroller>
          {({ height, isScrolling, scrollTop, onChildScroll }) => (
            <InfiniteLoader
              isRowLoaded={isItemLoaded}
              loadMoreRows={loadMoreItems}
              rowCount={totalPostCount}
              threshold={5}
            >
              {({ onRowsRendered }) => (
                <AutoSizer disableHeight>
                  {({ width }) => (
                    <List
                      autoHeight
                      height={height}
                      width={width}
                      isScrolling={isScrolling}
                      onRowsRendered={onRowsRendered}
                      rowCount={itemCount}
                      rowHeight={cellMeasurerCache.rowHeight}
                      deferredMeasurementCache={cellMeasurerCache}
                      rowRenderer={postItem}
                      scrollTop={scrollTop}
                      onScroll={onChildScroll}
                      overscanRowCount={10}
                      scrollToAlignment={"start"}
                    />
                  )}
                </AutoSizer>
              )}
            </InfiniteLoader>
          )}
        </WindowScroller>
      )}
    </div>
  );
};

export default Activity;
