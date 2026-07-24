import { useState, useEffect } from 'react';
import { SUBJECTS } from '../data/subjects';
import { loadQuestionBank } from '../services/dataService';
import './SubjectList.css';

interface SubjectData {
  id: string;
  name: string;
  total_questions: number;
  loading: boolean;
  error: boolean;
}

export const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [selectedId, setSelectedId] = useState<string>('01');
  const [isLoading, setIsLoading] = useState(true);

  // Load all subjects on component mount
  useEffect(() => {
    const loadAllSubjects = async () => {
      setIsLoading(true);

      try {
        // Create loading state for all subjects
        const subjectsWithState: SubjectData[] = SUBJECTS.map(subject => ({
          id: subject.id,
          name: subject.name,
          total_questions: 0,
          loading: true,
          error: false
        }));

        setSubjects(subjectsWithState);

        // Load all subjects in parallel
        const loadPromises = SUBJECTS.map(async (subject) => {
          try {
            const data = await loadQuestionBank(subject.folder, subject.file);
            return {
              id: subject.id,
              name: subject.name,
              total_questions: data.metadata?.total_questions || 0,
              loading: false,
              error: false
            };
          } catch {
            return {
              id: subject.id,
              name: subject.name,
              total_questions: 0,
              loading: false,
              error: true
            };
          }
        });

        const loadedSubjects = await Promise.all(loadPromises);
        setSubjects(loadedSubjects);
        setIsLoading(false);

        // Auto-select first subject
        if (loadedSubjects.length > 0) {
          const firstSubject = loadedSubjects[0];
          setSelectedId(firstSubject.id);
        }
      } catch (error) {
        console.error('Failed to load subjects:', error);
        setIsLoading(false);
      }
    };

    loadAllSubjects();
  }, []);

  // Handle subject selection
  const handleSelectSubject = (subject: SubjectData) => {
    setSelectedId(subject.id);
  };

  return (
    <div className="subject-list-container">
      <div className="subject-list-header">
        <h2>Chọn môn học</h2>
        <p className="subject-count">
          {subjects.length > 0 ? `${subjects.length} môn học` : 'Đang tải...'}
        </p>
      </div>

      {isLoading && subjects.length === 0 ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Đang tải danh sách môn học...</p>
        </div>
      ) : (
        <div className="subject-grid">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={`subject-card ${selectedId === subject.id ? 'active' : ''} ${
                subject.error ? 'error' : ''
              }`}
              onClick={() => handleSelectSubject(subject)}
              disabled={subject.loading || subject.error}
              aria-label={`${subject.name}, ${subject.total_questions} câu hỏi`}
            >
              <div className="subject-card-header">
                <span className="subject-id">{subject.id}</span>
                <span className="subject-status">
                  {subject.loading && <span className="dot-spinner"></span>}
                  {subject.error && <span className="error-icon">⚠</span>}
                </span>
              </div>

              <h3 className="subject-name">{subject.name}</h3>

              <div className="subject-footer">
                {subject.loading ? (
                  <span className="question-count loading">Đang tải...</span>
                ) : subject.error ? (
                  <span className="question-count error">Lỗi tải dữ liệu</span>
                ) : (
                  <span className="question-count">
                    {subject.total_questions} câu hỏi
                  </span>
                )}
              </div>

              {selectedId === subject.id && !subject.loading && !subject.error && (
                <div className="selection-indicator">✓</div>
              )}
            </button>
          ))}
        </div>
      )}

      {subjects.some(s => s.error) && (
        <div className="error-notice">
          <p>⚠ Một số môn học không thể tải. Vui lòng kiểm tra lại dữ liệu.</p>
        </div>
      )}
    </div>
  );
};
