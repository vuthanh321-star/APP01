import { useState } from 'react';
import { SubjectList } from './components/SubjectList';
import { ChapterList, type ChapterData } from './components/ChapterList';
import { QuizScreen } from './components/QuizScreen';
import { SUBJECTS } from './data/subjects';
import './App.css';

type Subject = typeof SUBJECTS[number];

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(null);

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };

  return (
    <div className="app">
      {selectedSubject === null ? (
        <SubjectList onSelectSubject={setSelectedSubject} />
      ) : selectedChapter === null ? (
        <ChapterList
          subject={selectedSubject}
          onBack={handleBackToSubjects}
          onSelectChapter={setSelectedChapter}
        />
      ) : (
        <QuizScreen
          subject={selectedSubject}
          chapter={selectedChapter}
          onBack={handleBackToChapters}
        />
      )}
    </div>
  );
}

export default App;
