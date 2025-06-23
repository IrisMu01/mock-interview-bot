import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSession } from '../store/sessionSlice';
import StartModal from "../components/StartModal";
import Chat from "../components/Chat";
import Workspace from "../components/Workspace";

export default function Home() {
  const dispatch = useDispatch();
  const hasRequestedSession = useRef(false);

  useEffect(() => {
    if (!hasRequestedSession.current) {
      dispatch(createSession());
      hasRequestedSession.current = true;
    }
  }, [dispatch]);

  const [showModal, setShowModal] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {showModal && <StartModal onClose={() => setShowModal(false)} />}
      <Chat />
      <Workspace tabIndex={tabIndex} setTabIndex={setTabIndex} />
    </div>
  );
}
