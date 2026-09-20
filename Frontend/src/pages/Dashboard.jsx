import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { useRelationshipModal } from "../context/useRelationshipModal.js";
import { getMemories } from "../services/memories";
import { getJournals } from "../services/journal.js";
import { getLetters } from "../services/letters.js";
import Spinner from "../components/Spinner.jsx";
import DashboardHero from "../components/dashboard/DashboardHero.jsx";
import RelationshipOverview from "../components/dashboard/RelationshipOverview.jsx";
import ConnectPartnerPrompt from "../components/dashboard/connectPartnerPrompt.jsx";
import RelationshipEditor from "../components/dashboard/RelationshipEditor.jsx";
import LatestMemory from "../components/dashboard/LatestMemory.jsx";
import RecentActivity from "../components/dashboard/RecentActivity.jsx";

const Dashboard = () => {
  const { user, reFetchUser } = useAuth();
  const [daysTogether, setDaysTogether] = useState(null);
  const [memories, setMemories] = useState([]);
  const [letters, setLetters] = useState([]);
  const [journals, setJournals] = useState([]);
  const [isEditRelationshipOpen, setIsEditRelationshipOpen] = useState(false);
  const { setIsOpen } = useRelationshipModal();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.relationship?.relationshipStartDate) {
      setDaysTogether(
        Math.floor(
          (Date.now() - new Date(user.relationship.relationshipStartDate)) /
            (1000 * 60 * 60 * 24),
        ),
      );
    }
  }, [user?.relationship?.relationshipStartDate]);

  useEffect(() => {
    Promise.all([getMemories(), getJournals(), getLetters()])
      .then(([memoriesResponse, journalsResponse, lettersResponse]) => {
        setMemories(memoriesResponse.data.memories);
        setJournals(journalsResponse.data.journals);
        setLetters(lettersResponse.data.letters);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const byNewest = (a, b) => new Date(b.date) - new Date(a.date);

  const latestMemory = [...memories].sort(byNewest)[0];

  const recentActivity = [
    ...memories.map((memory) => ({
      id: `memory-${memory._id}`,
      type: "memory",
      title: memory.title,
      date: memory.date,
      link: `/memories/${memory._id}`,
      thumbnail: memory.photos?.[0]?.url,
    })),
    ...journals.map((journal) => ({
      id: `journal-${journal._id}`,
      type: "journal",
      title: journal.title,
      date: journal.date,
      link: `/journals/${journal._id}`,
    })),
    ...letters.map((letter) => ({
      id: `letter-${letter._id}`,
      type: "letter",
      title: letter.title,
      date: letter.date,
      link: `/letters/${letter._id}`,
    })),
  ]
    .sort(byNewest)
    .slice(0, 4);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <main>
        <DashboardHero user={user} />

        {!user?.relationship ? (
          <ConnectPartnerPrompt onConnect={() => setIsOpen(true)} />
        ) : (
          <>
            <RelationshipOverview
              memoryCount={memories.length}
              journalCount={journals.length}
              letterCount={letters.length}
              daysTogether={daysTogether}
              onEdit={() => setIsEditRelationshipOpen(true)}
            />
            <div className="mt-8 space-y-6">
              <LatestMemory memory={latestMemory} />
              <RecentActivity items={recentActivity} />
            </div>
          </>
        )}

        {isEditRelationshipOpen && (
          <RelationshipEditor
            relationship={user?.relationship}
            onClose={() => setIsEditRelationshipOpen(false)}
            onSaved={reFetchUser}
          />
        )}
      </main>
    </>
  );
};

export default Dashboard;
