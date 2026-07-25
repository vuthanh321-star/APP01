import { useState } from 'react';
import { SubjectList } from './components/SubjectList';
import { ChapterList } from './components/ChapterList';
import { SUBJECTS } from './data/subjects';
import './App.css';

type Subject = typeof SUBJECTS[number];

function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  return (
    <div className="app">
      {selectedSubject === null ? (
        <SubjectList onSelectSubject={setSelectedSubject} />
      ) : (
        <ChapterList
          subject={selectedSubject}
          onBack={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
}

export default App;
