import { formatDistanceToNow } from 'date-fns';

export const InsightCard = ({ insight, onClick }) => {
  const typeStyles = {
    MOOD_PATTERN: 'bg-blue-100 text-blue-800',
    STRESS_INDICATOR: 'bg-red-100 text-red-800',
    COPING_STRATEGY: 'bg-green-100 text-green-800',
    PROGRESS_UPDATE: 'bg-purple-100 text-purple-800',
    WELLNESS_TIP: 'bg-yellow-100 text-yellow-800',
    CONVERSATION_SUMMARY: 'bg-gray-100 text-gray-800',
  };

  return (
    <button
      onClick={onClick}
      className="card w-full text-left p-0! overflow-hidden shadow-lg! hover:shadow-2xl! animate-slide-up"
    >
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              typeStyles[insight.type] || typeStyles.WELLNESS_TIP
            }`}
          >
            {insight.type.replace('_', ' ')}
          </span>
          {!insight.isRead && (
            <span className="w-2.5 h-2.5 bg-primary-500 rounded--full" />
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {insight.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {insight.content}
        </p>
      </div>
      <div className="bg-white/50 px-5 py-3 border-t border-white/30">
        <p className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(insight.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </button>
  );
};