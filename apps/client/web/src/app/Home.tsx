import Create from '../containers/game/Create';
import Join from '../containers/game/Join';

export default function Home() {
  return (
    <div>
      <div className="flex">
        <Join></Join>
        <Create></Create>
      </div>
    </div>
  );
}
