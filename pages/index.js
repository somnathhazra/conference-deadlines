import ConferenceCalendar from '../components/ConferenceCalendar';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        ML/RL Conference Deadlines
      </h1>
      <ConferenceCalendar />
    </div>
  );
}
