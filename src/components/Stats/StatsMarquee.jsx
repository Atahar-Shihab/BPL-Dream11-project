import { useScrollReveal } from '../../hooks/useScrollAnimations';
import { Shield, Swords, Award, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Shield, label: 'Total Players', value: '18+', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: Swords, label: 'Match Types', value: 'T20 · ODI · Test', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: Award, label: 'Top Rating', value: '9.9 ★', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { icon: TrendingUp, label: 'Countries', value: '8+', color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

const StatsMarquee = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className={`page-container py-8 sm:py-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-neutral-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-lg sm:text-xl font-black text-neutral-900">{stat.value}</span>
              <span className="text-xs text-neutral-500 font-medium">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsMarquee;
