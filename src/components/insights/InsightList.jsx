import { InsightCard } from './InsightCard';

export const InsightList = ({ insights, onViewInsight }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
      {insights.map((insight) => (
        <InsightCard
          key={insight.id}
          insight={insight}
          onClick={() => onViewInsight(insight)}
        />
      ))}
    </div>
  );
};