import { useState } from 'react';
import { Modal } from '../common/Modal';
import { MarkdownRenderer } from '../common/MarkdownRenderer';
import { format } from 'date-fns';

export const InsightDetailModal = ({ insight, onClose, onFeedback }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(
    insight.helpful === null
  );
  const [feedbackText, setFeedbackText] = useState(insight.feedback || '');
  const [isHelpful, setIsHelpful] = useState(insight.helpful);

  const handleSubmitFeedback = (wasHelpful) => {
    setIsHelpful(wasHelpful);
    onFeedback(insight.id, wasHelpful, feedbackText);
    setShowFeedbackForm(false);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={insight.title}>
      <div className="prose prose-sm max-w-none">
        <MarkdownRenderer>{insight.content}</MarkdownRenderer>
      </div>

      <p className="text-xs text-gray-400 mt-6">
        Generated: {insight.created_at
          ? format(new Date(insight.created_at), "MMMM d, yyyy 'at' p")
          : 'Date not available'}
      </p>

      <div className="border-t border-gray-200 mt-6 pt-6">
        {isHelpful !== null ? (
          <FeedbackSubmitted helpful={isHelpful} />
        ) : (
          <FeedbackForm
            onSubmit={handleSubmitFeedback}
            feedbackText={feedbackText}
            setFeedbackText={setFeedbackText}
          />
        )}
      </div>
    </Modal>
  );
};

const FeedbackForm = ({ onSubmit, feedbackText, setFeedbackText }) => (
  <>
    <h4 className="text-md font-semibold text-gray-700 mb-3">
      Was this insight helpful?
    </h4>
    <textarea
      className="input-field mb-3"
      rows="3"
      placeholder="Share your thoughts (optional)..."
      value={feedbackText}
      onChange={(e) => setFeedbackText(e.target.value)}
    ></textarea>
    <div className="flex gap-3">
      <button
        onClick={() => onSubmit(true)}
        className="btn-primary flex-1 text-sm"
      >
        <CheckIcon /> Yes, it was
      </button>
      <button
        onClick={() => onSubmit(false)}
        className="btn-secondary flex-1 text-sm"
      >
        <CloseIcon /> Not really
      </button>
    </div>
  </>
);

const FeedbackSubmitted = ({ helpful }) => (
  <div
    className={`p-4 rounded-lg ${
      helpful ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
    } border`}
  >
    <div className="flex items-center gap-3">
      {helpful ? (
        <CheckIcon className="text-green-600" />
      ) : (
        <CloseIcon className="text-red-600" />
      )}
      <p
        className={`text-sm font-medium ${
          helpful ? 'text-green-800' : 'text-red-800'
        }`}
      >
        Thank you for your feedback! You found this
        {helpful ? ' helpful.' : ' not helpful.'}
      </p>
    </div>
  </div>
);

const CheckIcon = ({className = ''}) => (
  <svg
    className={`w-5 h-5 inline-block -mt-1 mr-1 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const CloseIcon = ({className = ''}) => (
  <svg
    className={`w-5 h-5 inline-block -mt-1 mr-1 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);