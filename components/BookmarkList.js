"use client";
import React from "react";

export default function BookmarkList({ bookmarks, onRemoveBookmark }) {
  return (
    <div>
      <h2>Bookmarked Modals</h2>
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id}>
          <p>{bookmark.title}</p>
          <button onClick={() => onRemoveBookmark(bookmark.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
