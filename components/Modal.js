"use client";
import React, { useState } from "react";
import BookmarkList from "components/BookmarkList";
import Image from "next/image"

const Modal = ({ isOpen, onClose, children }) => {
  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const modalContentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    color: "white",
    borderRadius: "7px",
    background: 'url("/skyday.jpg")rgba(0, 0, 0, 0.6)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundBlendMode: "darken",
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        {children}
        <button className="modalbtn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default function Modalcomp(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [bookmarks, setBookmarks] = useState(() => {
  //   const storedBookmarks = localStorage.getItem("bookmarks");
  //   return storedBookmarks ? JSON.parse(storedBookmarks) : [];
  // });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleBookmark = (modalData) => {
    const isBookmarkExists = bookmarks.some(
      (bookmark) => bookmark.id === modalData.id
    );

    if (!isBookmarkExists) {
      setBookmarks((prevBookmarks) => [...prevBookmarks, modalData]);
    }
  };

  const handleRemoveBookmark = (bookmarkId) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== bookmarkId)
    );
  };

  const storeBookmarks = () => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  };

  // React.useEffect(() => {
  //   storeBookmarks();
  // }, [bookmarks]);

  let percentage = props.data.day.daily_chance_of_rain;
  let reversedPercentage = 100 - percentage;

  return (
    <div>
      <button className="modalbtn btn btn-primary" onClick={handleOpenModal}>
        Find out more
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Aditional details for {props.data.date}</h2>
        <h3>Average temperature: {props.data.day.avgtemp_c}</h3>
        <h3>{props.data.day.condition.text}</h3>
        <Image src={"http:"+props.data.day.condition.icon} alt="weather icon" width={64} height={64} />
        <h2>Probability of successful mici: {reversedPercentage}%</h2>
        <p>Average humitdy: {props.data.day.avghumidity}</p>
        <p>Average visibility: {props.data.day.avgvis_km} km</p>
        <p>Maximum wind speed: {props.data.day.maxwind_kph} km/h</p>
        <p>
          Will it rain?
          {
            (props.data.day.daily_will_it_rain = 1
              ? " Yes it will"
              : " No it won't")
          }
        </p>
      </Modal>
      {/* <BookmarkList
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
      /> */}
    </div>
  );
}
