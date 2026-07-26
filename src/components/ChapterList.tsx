import { useState, useEffect } from 'react';
import { SUBJECTS } from '../data/subjects';
import { loadQuestionBank } from '../services/dataService';
import './ChapterList.css';

type Subject = typeof SUBJECTS[number];

export interface ChapterData {
  chapter_id: number | string;
  chapter_name: string;
}

interface ChapterListProps {
  subject: Subject;
  onBack: () => void;
  onSelectChapter: (chapter: ChapterData) => void;
}

export const ChapterList: React.FC<ChapterListProps> = ({ subject, onBack, onSelectChapter }) => {
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadChapters = async () => {
      setIsLoading(true);
      setHasError(false);
      setSelectedChapterId(null);

      try {
        const data = await loadQuestionBank(subject.folder, subject.file);
        if (isMounted) {
          setChapters(data.chapters || []);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    loadChapters();

    return () => {
      isMounted = false;
    };
  }, [subject]);

  const handleSelectChapter = (chapter: ChapterData) => {
    setSelectedChapterId(chapter.chapter_id);
    onSelectChapter(chapter);
  };

  return (
    <div className="chapter-list-container">
      <div className="chapter-list-header">
        <button className="back-button" onClick={onBack}>
          ← Quay lại
        </button>
        <h2>{subject.name}</h2>
        <p className="chapter-count">
          {isLoading ? 'Đang tải...' : `${chapters.length} chương`}
        </p>
      </div>

      {isLoading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải danh sách chương...</p>
        </div>
      ) : hasError ? (
        <div className="error-notice">
          <p>⚠ Không thể tải danh sách chương. Vui lòng thử lại.</p>
        </div>
      ) : (
        <div className="chapter-grid">
          {chapters.map((chapter) => (
            <button
              key={chapter.chapter_id}
              className={`chapter-card ${
                selectedChapterId === chapter.chapter_id ? 'active' : ''
              }`}
              onClick={() => handleSelectChapter(chapter)}
            >
              <h3 className="chapter-name">{chapter.chapter_name}</h3>

              {selectedChapterId === chapter.chapter_id && (
                <div className="selection-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
