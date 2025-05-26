type TimerProps = {
  startTime?: number;
  endTime?: number;
};
export default function Timer({ startTime, endTime }: TimerProps) {
  return (
    <div>
      <h2 className='text-2xl font-bold mb-2'>Time : 20</h2>
    </div>
  );
}
